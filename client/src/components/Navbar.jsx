import { Close, Menu, Search } from "@mui/icons-material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NavbarMobile from "./NavbarMobile";
function Navbar() {
  const [showNavbarMobile, setShowNavbarMobile] = useState(false);
  return (
    <div className="navbar h-10 p-2 flex items-center justify-between  w-full top-0 z-40 fixed bg-white">
      <div className="navbar-left">
        <h1>LOGO</h1>
        <div className=" lg:hidden">{showNavbarMobile && <NavbarMobile />}</div>
      </div>
      <div className="navbar-center">
        <ul className="hidden lg:flex items-center justify-between gap-10">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/contacts">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right flex items-center gap-5">
        <Search />
        <LocalMallIcon />
        <div
          className=" lg:hidden"
          onClick={() => setShowNavbarMobile(!showNavbarMobile)}
        >
          {!showNavbarMobile ? <Menu /> : <Close />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
