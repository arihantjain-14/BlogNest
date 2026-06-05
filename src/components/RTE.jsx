import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

export default function RTE({ name, control, defaultvalue = "", label }){
    return(
        <div className="input-wrapper">
            {label && (
                <label className="input-label">{label}</label>
            )}
            <div style={{borderRadius:'8px', overflow:'hidden', border:'1.5px solid rgba(90,96,112,0.4)', transition:'border-color 0.25s'}}>
                <Controller 
                    name={name}
                    control={control}
                    render={({ field: { onChange } }) => (
                        <Editor 
                            initialValue={defaultvalue}
                            apiKey="nkhojz42in6536dvrqmwjbodqy106vwqdkivpnp8kw6cm3gm"
                            init={{
                                height: 480,
                                menubar: true,
                                skin: 'oxide-dark',
                                content_css: 'dark',
                                plugins: [
                                    "image","advlist","autolink","lists","link","image",
                                    "charmap","preview","anchor","searchreplace","visualblocks",
                                    "code","fullscreen","insertdatetime","media","table","help","wordcount","anchor",
                                ],
                                toolbar: "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                                content_style: `
                                    body {
                                        font-family: 'DM Sans', sans-serif;
                                        font-size: 15px;
                                        background: #13151c;
                                        color: #f0ece4;
                                        padding: 16px;
                                        line-height: 1.7;
                                    }
                                `
                            }}
                            onEditorChange={onChange}
                        />
                    )}
                />
            </div>
        </div>
    )
}
