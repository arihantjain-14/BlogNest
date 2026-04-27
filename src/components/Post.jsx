import React from "react";
import service from "../appwrite/conf";
import { Link } from "react-router-dom";

function Post({ $id, title, image }){
    return(
      <Link to={`/post/${$id}`} className="post-card">
        <div className="post-card-img-wrap">
            <img src={service.getfilepreview(image).toString()} alt={title} />
        </div>
        <div className="post-card-body">
            <span className="post-card-tag">Article</span>
            <h2 className="post-card-title">{title}</h2>
            <div className="post-card-arrow">
                Read more <span>→</span>
            </div>
        </div>
      </Link>
    );
}

export default Post;
