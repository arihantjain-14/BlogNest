import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/conf";
import { Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userdata);

    const isAuthor = post && userData
        ? String(post.userId) === String(userData.$id)
        : false;

    console.log(userData?.$id)
    console.log(post?.userId)
    console.log(isAuthor)
    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate, userData]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.image);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="post-detail-page">
            <div className="app-container">
                <div className="post-detail-hero">
                    <img
                        src={service.getfilepreview(post.image).toString()}
                        alt={post.title}
                    />
                    <div style={{position:'absolute',bottom:0,left:0,right:0,height:'50%',background:'linear-gradient(to top, rgba(13,15,20,0.9) 0%, transparent 100%)'}}></div>

                    {isAuthor && (
                        <div className="post-detail-actions">
                            <Link to={`/edit-post/${post.$id}`}>
                                <button className="btn-primary btn-success" style={{padding:'10px 20px', borderRadius:'8px', border:'none', cursor:'pointer', fontWeight:'600', fontSize:'0.88rem'}}>
                                    ✏️ Edit
                                </button>
                            </Link>
                            <button
                                className="btn-primary btn-danger"
                                style={{padding:'10px 20px', borderRadius:'8px', border:'none', cursor:'pointer', fontWeight:'600', fontSize:'0.88rem'}}
                                onClick={deletePost}
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    )}
                </div>

                <h1 className="post-detail-title">{post.title}</h1>

                <div className="post-detail-content browser-css">
                    {parse(post.content)}
                </div>
            </div>
        </div>
    ) : (
        <div className="loading-screen">
            <div className="loading-spinner"></div>
        </div>
    );
}
