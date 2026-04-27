import config from "../config/config";
import authservice from "./Auth";
import {Client,ID,TablesDB,Storage, Query,Permission,Role} from  "appwrite";

export class Service{
    client = new Client();
    tablesDB;
    storage;

    constructor(){
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.projectID);
        this.tablesDB = new TablesDB(this.client);
        this.storage = new Storage(this.client);
    }
    //post related
    async createPost({title,image,content,status,userId,slug}){
        try {
            const user = await authservice.getUserAccount();

            return await this.tablesDB.createRow({
                databaseId: config.databaseID,
                tableId: config.collectionID,
                rowId: slug,
                data: {
                    title,
                    image,
                    content,
                    status,
                    userId : user.$id,
                    slug
                },
                permissions: [
                Permission.read(Role.any())
            ]
        });
        } catch (error) {
            console.log('Appwrite service :: createPost :: error',error);
        }
    }

    async updatePost(slug,{title,slug : updatedSlug, image,content,status}){
        try {
            return await this.tablesDB.updateRow({
                databaseId: config.databaseID,
                tableId: config.collectionID,
                rowId : slug,
                data: {
                 title : title,
                 slug : updatedSlug,
                 image : image,
                 content : content,
                 status : status,
                }
        })
        } catch (error) {
            console.log('Appwrite service :: updatePost :: error',error);
            
        }
    }

    async deletePost(slug){
        try {
            await this.tablesDB.deleteRow({
                databaseId: config.databaseID,
                tableId: config.collectionID,
                rowId: slug
        })
            return true;
        } catch (error) {
            console.log('Appwrite service :: updatePost :: error',error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.tablesDB.getRow({
                databaseId: config.databaseID,
                tableId: config.collectionID,
                rowId: slug
        })
        } catch (error) {
            console.log('Appwrite service :: getpost :: error',error);
            return false;
        }
    }

    async getAllPost(){
        try {
            return await this.tablesDB.listRows({
                databaseId: config.databaseID,
                tableId: config.collectionID,
                queries : [
                    Query.equal("status","active")
                ]
        })
        } catch (error) {
            console.log('Appwrite service :: getAllPost :: error',error);
            return false;
        }
    }
    //get all posts of a particular user
    async getAllUserPost(userId){
        try {
            return await this.tablesDB.listRows({
                databaseId: config.databaseID,
                tableId: config.collectionID,
                queries : [
                    Query.equal("status","active"),
                    Query.equal("userId",userId)
                ]
            })
        } catch (error) {
            console.log('Appwrite service :: getAllUserPost :: error',error);
            return false;
            
        }
    }
    //file upload services

    async uploadFile(file){
        try {
            return await this.storage.createFile({
                bucketId: config.bucketID,
                fileId: ID.unique(),
                file,
                permissions: [Permission.read(Role.any())]
        })

        } catch (error) {
            console.log('Appwrite service :: uploadFile :: error',error);
            throw error;
        }
    }

    async deleteFile(fileId){
        try {
           await this.storage.deleteFile({
            bucketId: config.bucketID,
            fileId
        })  
           return true;
        } catch (error) {
            console.log('Appwrite service :: deleteFile :: error',error);
            return false;
        }
    }

    getfilepreview(fileId){
        try {
            return this.storage.getFileView({
                bucketId : config.bucketID,
                fileId : fileId
        })
        } catch (error) {
            console.log('Appwrite service :: getfilepreview :: error',error);
            throw error;
        }
    }
}

const service = new Service();

export default service