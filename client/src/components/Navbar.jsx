import { Close, Menu, Search } from "@mui/icons-material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NavbarMobile from "./NavbarMobile";
function Navbar() {
  const [showNavbarMobile, setShowNavbarMobile] = useState(false);

  return (
    <div className="navbar h-10 p-2 flex items-center justify-between lg:w-11/12 lg:mx-auto">
      <div className="navbar-left">
        <h1 className=" font-Poppins">LOGO</h1>
        <div className=" lg:hidden">{showNavbarMobile && <NavbarMobile />}</div>
      </div>
      <div className="navbar-center">
        <ul className="hidden lg:flex items-center justify-between gap-10 font-YsabeauInfant">
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
        <div>
          <form className=" bg-gray-50 shadow rounded-full px-1 flex items-center overflow-hidden">
            <input
              type="text"
              placeholder="Search Item"
              className=" indent-1 placeholder:text-gray-400 placeholder:font-YsabeauInfant bg-transparent outline-none border-none px-2 py-1 w-full "
            />
            <Search />
          </form>
        </div>
        <div className=" h-10 w-10 flex items-center justify-start relative">
          <div>
            <LocalMallIcon />
          </div>
          <div className=" absolute top-1 right-1 bg-orange-500 h-5 w-5 rounded-full grid place-items-center text-center">
            <h1 className=" text-center text-white text-sm">2</h1>
          </div>
          
        </div>
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
