import { Container, Post } from "../components";
import service from "../appwrite/conf";
import { useState, useEffect } from "react";

function AllPosts(){
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        service.getAllPost([]).then((res)=>{
            if(res && res.rows){
                setPosts(res.rows)
            }
        })
    },[])

    return(
        <div className="app-container">
            <div className="posts-section">
                <div className="section-header">
                    <h1 className="section-title">All Posts</h1>
                    <span style={{color:'var(--text-muted)', fontSize:'0.9rem'}}>{posts.length} article{posts.length !== 1 ? 's' : ''}</span>
                </div>
                {posts.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📭</div>
                        <h2 className="empty-state-title">Nothing here yet</h2>
                        <p className="empty-state-subtitle">Be the first to publish a post!</p>
                    </div>
                ) : (
                    <div className="posts-grid">
                        {posts.map((post) => (
                            <Post key={post.$id} {...post} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllPosts;
