import React, { useState, useEffect, useRef } from "react";
import { Logo, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { lightMode, darkMode } from "../../store/themeSlice";

function Header(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authStatus = useSelector((state) => state.auth.status);
    const themeStatus = useSelector((state) => state.theme.themeMode);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const changeTheme = () => {
        if(themeStatus === "dark"){
            dispatch(lightMode());
        } else {
            dispatch(darkMode());
        }
    }

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navItems = [
        { name: "Home", slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Signup", slug: "/signup", active: !authStatus },
        { name: "All Posts", slug: "/all-posts", active: authStatus },
    ]

    return(
        <header className="site-header">
            <div className="header-inner">
                <Link to='/' className="header-logo-link">
                    <Logo />
                    <span className="logo-text">BlogNest</span>
                </Link>
                <ul className="nav-list">
                    {navItems.map((item) =>
                        item.active ? (
                            <li key={item.name}>
                                <button
                                    onClick={() => navigate(item.slug)}
                                    className="nav-btn"
                                >
                                    {item.name}
                                </button>
                            </li>
                        ) : null
                    )}

                    {/* User dropdown */}
                    {authStatus && (
                        <li style={{ position: 'relative' }} ref={dropdownRef}>
                            <button
                                className="nav-btn"
                                onClick={() => setDropdownOpen(prev => !prev)}
                                style={{ fontSize: '1.3rem', padding: '6px 12px' }}
                            >
                                👤
                            </button>

                            {dropdownOpen && (
                                <div style={{
                                    position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                                    background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                                    borderRadius: '12px', minWidth: '180px', zIndex: 200,
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                                    overflow: 'hidden', animation: 'fadeInUp 0.2s ease both'
                                }}>
                                    <button
                                        onClick={() => { navigate('/my-posts'); setDropdownOpen(false); }}
                                        className="dropdown-item"
                                    >
                                        📋 My Posts
                                    </button>
                                    <button
                                        onClick={() => { navigate('/add-post'); setDropdownOpen(false); }}
                                        className="dropdown-item"
                                    >
                                        ✍️ Add Post
                                    </button>
                                    <div
                                        className="dropdown-item dropdown-item-danger"
                                        style={{ padding: 0 }}
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <LogoutBtn />
                                    </div>
                                </div>
                            )}
                        </li>
                    )}

                    {/* Theme toggle */}
                    <li>
                        <button onClick={changeTheme} className="nav-btn">
                            {themeStatus === "dark" ? "🌙" : "☀️"}
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;