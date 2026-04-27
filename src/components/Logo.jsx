import React from "react";
import logo from "../images/Logo.jpg"

function Logo({ width = "100px" }){
    return(
        <div>
            <img src={logo} alt="Logo" className="logo-img" />
        </div>
    )
}

export default Logo;
