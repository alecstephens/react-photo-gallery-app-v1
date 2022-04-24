import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return <nav className="main-nav">
                <ul>
                    <li><NavLink to="/sun">Sun</NavLink></li>
                    <li><NavLink to="/moon">Moon</NavLink></li>
                    <li><NavLink to="/clouds">Clouds</NavLink></li>
                </ul>
           </nav>
};

export default Nav;