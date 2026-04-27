import React, { useCallback, useEffect, useState } from "react";
import { Input, Select, Button, RTE } from "../index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import service from "../../appwrite/conf";
import { useForm } from "react-hook-form";

function PostForm({ post }){
    const navigate = useNavigate();
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active"
        },
    })

    const userData = useSelector((state) => state.auth.userdata)

    const submit = async (data) => {
    setError("");
    setLoading(true);
    try {
        if(!data.slug){
            data.slug = slugTransform(data.title);
        }
        if(post){
            const file = data.image?.[0] ? await service.uploadFile(data.image[0]) : null;
            if(file) service.deleteFile(post.image.$id)
            const dbPost = await service.updatePost(post.$id, {
                ...data,
                image: file ? file.$id : undefined,
            })
            if(dbPost) navigate(`/post/${dbPost.$id}`)
        } else {
            const file = await service.uploadFile(data.image[0]);
            if(file){
                const fileId = file?.$id
                data.image = fileId
                const dbPost = await service.createPost({
                    ...data,
                    userId: userData.$id,
                    image: fileId
                })
                if(dbPost) navigate(`/post/${dbPost.$id}`)
            }
        }
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value == "string"){
            return value.trim()
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '-')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
        }
        return "";
    }, [])

    useEffect(()=>{
        const subscription = watch((value, { name }) => {
            if(name === "title"){
                setValue('slug', slugTransform(value.title), { shouldValidate: true })
            }
        })
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue])

    return(
        <div className="post-form-card">
            <h1 className="post-form-title">
                {post ? "✏️ Edit Post" : "✍️ New Post"}
            </h1>
            {error && (
                <div style={{
                    background:'rgba(239,68,68,0.1)',
                    border:'1px solid rgba(239,68,68,0.3)',
                    color:'#f87171',
                    padding:'10px 14px',
                    borderRadius:'8px',
                    fontSize:'0.875rem',
                    marginBottom:'1rem'
                }}>
                    ⚠️ {error}
                </div>
            )}
            <form onSubmit={handleSubmit(submit)}>
                <div className="post-form-layout">
                    {/* Main column */}
                    <div className="post-form-main">
                        <Input 
                            label="Title"
                            type="text"
                            placeholder="Enter a captivating title..."
                            {...register("title", { required: true })}
                        />
                        <Input 
                            label="Slug"
                            type="text"
                            placeholder="auto-generated-slug"
                            {...register("slug")}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                            }}
                        />
                        <div>
                            <RTE
                                control={control}
                                label="Content"
                                name="content"
                                defaultvalue={getValues("content")}
                            />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="post-form-sidebar">
                        <Input 
                            label="Featured Image"
                            type="file"
                            accept="image/png,image/jpg,image/jpeg,image/gif"
                            {...register("image", { required: !post })}
                        />

                        {post && (
                            <div>
                                <img
                                    src={service.getfilepreview(post.image).toString()}
                                    alt={post.title}
                                    className="form-preview-image"
                                />
                            </div>
                        )}

                        <Select
                            label="Status"
                            options={["active", "inactive"]}
                            {...register("status", { required: true })}
                        />

                        <Button type="submit" bgColor={post ? "bg-green-500" : "bg-blue-500"} style={{width:'100%', marginTop:'0.5rem'}} disabled={loading}>
                            {loading ? "Please wait..." : post ? "Update Post" : "Publish Post"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PostForm;
