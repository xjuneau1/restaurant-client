import React from 'react';
import { Link } from "react-router-dom"
import "./menu.css"
function Menu({setMenu}) {
    const handleHideMenu = ()=> {
        setMenu(false)
    }
    
    return ( 
    <div className='menu-container'>
        <Link onClick={handleHideMenu} to="/dashboard">Dashboard</Link>
        <Link onClick={handleHideMenu} to="/reservations">Reservations</Link>
        <Link onClick={handleHideMenu} to="/tables">Tables</Link>
    </div> 
    );
}

export default Menu;