import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import "./SideBar.css";

const SideBar = () => {
  const [sideBar, setSideBar] = useState(false);
  const location = useLocation();
  const showSidebar = () => setSideBar(!sideBar);

  return (
    <>
      <button className="menu-btn" onClick={showSidebar}>
        <FaIcons.FaBars />
      </button>

      <div className="side-bar">
        <nav className={sideBar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <button className="menu-bars" onClick={showSidebar}>
                <AiIcons.AiOutlineClose />
              </button>
            </li>
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/favorites"
                className={location.pathname === "/favorites" ? "active" : ""}
              >
                Favorites
              </Link>
            </li>
            <li>
              <Link
                to="/watched"
                className={location.pathname === "/watched" ? "active" : ""}
              >
                Watched
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
