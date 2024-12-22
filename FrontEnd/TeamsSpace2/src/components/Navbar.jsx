import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div class="brand">TeamSpace</div>
      <div class="nav-links">
        <button>
          <NavLink to="/">Home</NavLink>
        </button>
        <button>
          <NavLink to="/Authpage">Login</NavLink>
        </button>
        <button>
          <NavLink to="/Authpage">Register</NavLink>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
