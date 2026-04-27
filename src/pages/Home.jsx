import { useEffect, useState } from "react";
import service from "../appwrite/conf";
import { Container, Post } from "../components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home(){
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(()=>{

        if(!authStatus){
            setPosts([]);
            return;
        }
        service.getAllPost().then((res)=>{
            if(res && res.rows){
                setPosts(res.rows)
            } else {
                setPosts([])
            }
        });
    },[authStatus])
    
    if(posts.length === 0){
        return(
            <div className="app-container">
                <div className="empty-state">
                    <div className="empty-state-icon">✍️</div>
                    <h1 className="empty-state-title">No Posts Yet</h1>
                    <p className="empty-state-subtitle">
                        Sign in to discover stories and ideas from our community.
                    </p>
                    <Link to="/login">
                        <button className="btn-primary" style={{padding:'12px 32px', borderRadius:'8px', border:'none', cursor:'pointer', fontWeight:'600', fontSize:'0.95rem'}}>
                            Get Started →
                        </button>
                    </Link>
                </div>
            </div>
        )
    }

    return(
        <div>
            <div className="home-hero">
                <div className="home-hero-badge">✦ Latest Stories</div>
                <h1 className="home-hero-title">
                    Ideas worth <em>reading</em>
                </h1>
                <p className="home-hero-subtitle">
                    Discover thoughtful essays, stories, and insights from writers around the world.
                </p>
            </div>
            <div className="app-container">
                <div className="posts-section">
                    <div className="posts-grid">
                        {posts.map((post) => (
                            <Post key={post.$id} {...post} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
