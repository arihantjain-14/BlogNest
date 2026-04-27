import React, { useState } from "react";
import authservice from "../appwrite/Auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import { login as authlogin } from "../store/authSlice";

function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [loading,setLoading] = useState(false);
    const [showPassword,setShowPassword] = useState(false);

    const login = async (data) => {
       setError("");
       setLoading(true)
       try {
        const session = await authservice.login(data);
        if(session){
            const userdata = await authservice.getUserAccount();
            if(userdata){
                dispatch(authlogin(userdata));
            }
            navigate("/");
        }
       } catch (e) {
        setError(e.message)
       }
       finally{
        setLoading(false);
       }
    }

    return(
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-logo">
                    <Logo />
                </div>
                <h2 className="auth-title">Welcome back</h2>
                <p className="auth-subtitle">
                    Don&apos;t have an account?&nbsp;
                    <Link to="/signup">Sign Up</Link>
                </p>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit(login)} className="auth-form">
                    <Input 
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            // validate: {
                            //     matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.w+){1,}$/.test(value) || 
                            //     "Please enter a valid email address"
                            // }
                        })}
                    />
                    <div style={{position:'relative'}}>
                        <Input 
                            label="Password"
                            placeholder="Enter your password"
                            type={showPassword ? "text" : "password"}
                            {...register("password", { required: true })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            style={{
                                position:'absolute', right:'12px', bottom:'10px',
                                background:'none', border:'none', cursor:'pointer',
                                color:'var(--text-muted)', fontSize:'1.1rem', lineHeight:1,
                                transition:'color 0.2s'
                            }}
                            onMouseEnter={e => e.target.style.color='var(--accent-gold)'}
                            onMouseLeave={e => e.target.style.color='var(--text-muted)'}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>
                    <Button type="submit" className="w-full" style={{width:'100%'}} disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
