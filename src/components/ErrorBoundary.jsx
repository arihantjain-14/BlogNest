import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props){
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error){
        return { hasError: true, error };
    }

    componentDidCatch(error, info){
        console.log("Error caught by boundary:", error, info);
    }

    render(){
        if(this.state.hasError){
            return(
                <div style={{
                    minHeight:'100vh', display:'flex', flexDirection:'column',
                    alignItems:'center', justifyContent:'center',
                    background:'var(--bg-primary)', padding:'2rem', textAlign:'center'
                }}>
                    <div style={{
                        fontSize:'4rem', marginBottom:'1rem'
                    }}>💥</div>
                    <h1 style={{
                        fontFamily:'var(--font-display)', fontSize:'2rem',
                        color:'var(--text-primary)', marginBottom:'0.5rem'
                    }}>Something went wrong</h1>
                    <p style={{
                        color:'var(--text-secondary)', marginBottom:'0.5rem'
                    }}>
                        {this.state.error?.message || "An unexpected error occurred"}
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        style={{
                            marginTop:'1.5rem', padding:'12px 28px',
                            background:'var(--accent-gold)', color:'#0d0f14',
                            border:'none', borderRadius:'8px', fontWeight:'600',
                            fontSize:'0.95rem', cursor:'pointer'
                        }}
                    >
                        Go back home
                    </button>
                </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;