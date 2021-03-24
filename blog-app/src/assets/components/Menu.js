import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Menu extends Component {
    render(){
        return(
            <nav className="menu">
                <ul>
                    <li>
                        <NavLink to="/home" activeClassName="selected">Inicio</NavLink>
                    </li>
                    <li>
                        <NavLink to="/blog" activeClassName="selected">Blog</NavLink>
                    </li>
                    <li>
                        <NavLink to="/formulario" activeClassName="selected">Formulario</NavLink>
                    </li>
                    <li>
                        <NavLink to="/noWhere">Pagina 1</NavLink>
                    </li>
                    <li>
                        <NavLink to="/noWhere">Pagina 2</NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}



export default Menu;