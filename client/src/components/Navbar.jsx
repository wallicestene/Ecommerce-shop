import { Close, Menu, Search } from "@mui/icons-material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NavbarMobile from "./NavbarMobile";
import Cart from "./Cart";
import { useCartcontext } from "./context/CartContex";

function Navbar({ scrollToSection, featiredRef }) {
  const [showNavbarMobile, setShowNavbarMobile] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [{ cart }, dispatch] = useCartcontext();
  return (
    <div
      className={`navbar h-10 p-2 flex items-center justify-between lg:w-11/12 lg:mx-auto  text-slate-950`}
    >
      <div className="navbar-left">
        <h1 className=" font-Poppins">E-SHOP</h1>
        <div className=" lg:hidden">
          {showNavbarMobile && (
            <NavbarMobile
              scrollToSection={scrollToSection}
              featiredRef={featiredRef}
            />
          )}
        </div>
        <div>{showCart && <Cart />}</div>
      </div>
      <div className="navbar-center">
        <ul className="hidden lg:flex items-center justify-between gap-10 font-YsabeauInfant">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <div onClick={() => scrollToSection(featiredRef)}>
              <Link to="/">Shop</Link>
            </div>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/contacts">Contact</Link>
          </li>
          <li>
            <Link to="/UploadItemsForm">Create</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right flex items-center lg:gap-5 gap-1 px-2">
        <form className=" bg-gray-50 shadow rounded-full px-1 flex items-center overflow-hidden lg:w-full w-4/5">
          <input
            type="text"
            placeholder="Search Item"
            className=" indent-1 placeholder:text-gray-400 placeholder:font-YsabeauInfant bg-transparent outline-none border-none px-2 py-1 w-full "
          />
          <Search />
        </form>

        <div
          className=" h-10 w-10 flex items-center justify-start relative cursor-pointer"
          onClick={() => {
            setShowCart(!showCart);
            setShowNavbarMobile(false);
          }}
        >
          <div>
            <LocalMallIcon />
          </div>
          {cart.length > 0 && (
            <div className=" absolute top-1  right-1 bg-orange-500 h-5 w-5 rounded-full grid place-items-center text-center">
              <h1 className=" text-center text-white text-sm">{cart.length}</h1>
            </div>
          )}
        </div>
        <div
          className=" lg:hidden"
          onClick={() => {
            setShowNavbarMobile(!showNavbarMobile);
            setShowCart(false);
          }}
        >
          {!showNavbarMobile ? <Menu /> : <Close />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
