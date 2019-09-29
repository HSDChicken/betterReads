import React from 'react';
import {NavLink} from 'react-router-dom';

const NavBar = () => {
  return(
    <div id="navbar">
      <NavLink className="logo nav-link" to="/">ReactBooks</NavLink>

      <div id="nav-links">
        <NavLink className="nav-link" to="/explore">Explore</NavLink>
        <NavLink className="nav-link" to="/profile">Profile</NavLink>
        <NavLink className="nav-link" to="/logout">Logout</NavLink>
      </div>
    </div>
  )
}

export default NavBar;