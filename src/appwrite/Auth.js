import config from "../config/config";
import {Client,Account,ID} from  "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.projectID);
        this.account = new Account(this.client);

    }
    async createAccount({email,password,name}){
        try {
            const user = await this.account.create({
                userId : ID.unique(),
                email : email,
                password : password,
                name : name
            })

    
            if(user){
                //call another method
                return this.login({email,password})
            }
            else{
                return user;
            }
        } catch (error){
            throw error;
        }
    }

    async login({email,password}){
        try {
            const session = await this.account.createEmailPasswordSession({
                email : email,
                password : password
            })

            return session;
        } catch (error) {
            throw error;
        }
    }

    async getUserAccount(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log('Authentication error :: getUserAccount :: error',
            error);
        }

        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log('Authentication error :: getUserAccount :: error',
            error);
        }
    }
}


const authservice = new AuthService();

export default authservice;