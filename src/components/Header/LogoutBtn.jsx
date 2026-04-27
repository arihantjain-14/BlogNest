import React from "react";
import { useDispatch } from "react-redux";   
import authservice from "../../appwrite/Auth";
import { logout } from "../../store/authSlice";

function LogoutBtn(){
    const dispatch = useDispatch();
    const handleLogout = ()=>{
        authservice.logout().then(()=>{
            dispatch(logout())
        })
    }    
    return(
        <button className="nav-btn nav-btn-logout" onClick={handleLogout}>
            Logout
        </button>
    )
}

export default LogoutBtn;
