import React, { Component } from "react";
import react from "../assets/image/react.svg";


import Menu from "./Menu";

class Header extends Component {
    render(){
        return(
            <header className="header">
                <div className="logo">
                    <img src={react} alt="app-logo"/>
                    <span className="brand">
                        <strong>Blog</strong>React
                    </span>
                </div>
                <Menu></Menu>
            
            </header>
        );
    }
     
    
}


export default Header;