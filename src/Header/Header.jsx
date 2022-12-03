import React, { useState } from "react";
import Menu from "./Menu";
import "./header.css";
function Header() {
  const [menu, setMenu] = useState(false)

  const showMenu = () => {
    if (menu === false) {
      setMenu(true);
    }
    if (menu === true) {
      setMenu(false);
    }
  };
  return (
    <div className="header-container">
      <div className="modal-container">
        <button onClick={showMenu}>Menu</button>
        <div className={menu ? "header-menu-container active" : "header-menu-container"}>
          {menu ? <Menu setMenu={setMenu} menu={menu}/> : <></>}
        </div>
      </div>
      <div className="header-content">
        <h4>Reservate:</h4>
        <div className="header-subcontent">
          Track your guests with confidence.
        </div>
      </div>
    </div>
  );
}

export default Header;
