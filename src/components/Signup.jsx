import React, { useState } from "react";
import authservice from "../appwrite/Auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";

function Signup(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [loading,setLoading] = useState(false);
    const [showPassword,setShowPassword] = useState(false);

    const signup = async (data) => {
        setError("");
        setLoading(true)
        try {
            const session = await authservice.createAccount(data);
            if(session){
                const userdata = await authservice.getUserAccount()
                if(userdata){
                    dispatch(login(userdata));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message)
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
                <h2 className="auth-title">Create account</h2>
                <p className="auth-subtitle">
                    Already have an account?&nbsp;
                    <Link to="/login">Sign In</Link>
                </p>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit(signup)} className="auth-form">
                    <Input 
                        label="Full Name"
                        type="text"
                        placeholder="Enter your name"
                        {...register("name", { required: true })}
                    />
                    <Input 
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: true,
                            // validate: {
                            //     matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.w+){1,}$/.test(value) ||
                            //     "Enter valid email address"
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
                    <Button type="submit" style={{width:'100%'}} disabled={loading}>
                        {loading ? "Creating account..." : "Create Account"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
