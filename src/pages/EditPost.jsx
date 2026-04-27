import { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import service from "../appwrite/conf";
import { useNavigate, useParams } from "react-router-dom";

function EditPost(){
    const [post, setPost] = useState()
    const navigate = useNavigate()
    const { slug } = useParams()

    useEffect(()=>{
        service.getPost(slug).then((post)=>{
            if(post){
                setPost(post)
            } else {
                navigate('/')
            }
        })
    },[slug, navigate])

    return post ? (
        <div className="post-form-page">
            <div className="app-container">
                <PostForm post={post} />
            </div>
        </div>
    ) : (
        <div className="loading-screen">
            <div className="loading-spinner"></div>
        </div>
    )
}

export default EditPost;
