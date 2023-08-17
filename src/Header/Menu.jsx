import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faListUl,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import "./menu.css";
function Menu({ setMenu }) {
  const handleHideMenu = () => {
    setMenu(false);
  };

  return (
    <div className="menu-container">
      <Link onClick={handleHideMenu} to="/dashboard">
        <FontAwesomeIcon icon={faListUl} className="" /> Dashboard
      </Link>
      <div className="menuBorderBottom"></div>
      <Link onClick={handleHideMenu} to="/reservations">
        <FontAwesomeIcon icon={faAddressBook} className="" /> Reservations
      </Link>
      <div className="menuBorderBottom"></div>
      <Link onClick={handleHideMenu} to="/tables">
        <FontAwesomeIcon icon={faUtensils} className="" /> Tables
      </Link>
    </div>
  );
}

export default Menu;
