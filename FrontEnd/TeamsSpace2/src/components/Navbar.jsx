import React from 'react'
import {NavLink} from "react-router-dom"
const Navbar = () => {
    return (
        <>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/Authpage">Login</NavLink></li>
                <li><NavLink to="/Authpage">Register</NavLink></li>
              
            </ul>
        </>
    )
}

export default Navbar