import { useState, useEffect } from 'react'
import service from '../appwrite/conf'
import { useSelector } from 'react-redux';
import { Post } from '../components';

function Myposts(){
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userdata);

    useEffect(() => {
    if(userData){
        console.log("userData.$id:", userData.$id);
        service.getAllUserPost(userData.$id).then((res) => {
            console.log("getUserPosts response:", res);
            if(res && res.rows){
                setPosts(res.rows);
            }
        })
    }
}, [userData])

    return(
        <div className="app-container">
            <div className="posts-section">
                <div className="section-header">
                    <h1 className="section-title">My Posts</h1>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        {posts.length} article{posts.length !== 1 ? 's' : ''}
                    </span>
                </div>
                {posts.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">✍️</div>
                        <h2 className="empty-state-title">No posts yet</h2>
                        <p className="empty-state-subtitle">You haven't published anything yet!</p>
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

export default Myposts;