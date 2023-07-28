import { Close, Menu, Search } from "@mui/icons-material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NavbarMobile from "./NavbarMobile";
import Cart from "./Cart";
import { useCartcontext } from "./context/CartContex";
import { useUserContext } from "./context/UserContext";

function Navbar({ scrollToSection, featiredRef }) {
  const [showNavbarMobile, setShowNavbarMobile] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [{ itemsInCart }] = useCartcontext();
  const [{user}, dispatch] = useUserContext()
  return (
    <div
      className={`navbar h-10 p-1 flex items-center justify-between gap-1 lg:w-11/12 lg:mx-auto`}
    >
      <div className="navbar-left">
        <div className=" flex items-center gap-1 w-24">
        <div
          className=" lg:hidden bg-gray-50 rounded-full h-10 w-10 grid place-items-center"
          onClick={() => {
            setShowNavbarMobile(!showNavbarMobile);
            setShowCart(false);
          }}
        >
          {!showNavbarMobile ? <Menu /> : <Close />}
        </div>
           <h1 className=" font-YsabeauInfant text-black tracking-tight lg:tracking-normal">E-Shop</h1>
        </div>
       
        <div className=" lg:hidden">
          {showNavbarMobile && (
            <NavbarMobile
              scrollToSection={scrollToSection}
              featiredRef={featiredRef}
              setShowNavbarMobile={setShowNavbarMobile}
            />
          )}
        </div>
        <div>{showCart && <Cart setShowCart={setShowCart}/>}</div>
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
            <Link to="">Blog</Link>
          </li>
          <li>
            <Link to="">Contact</Link>
          </li>
          <li>
            <Link to="/UploadItemsForm">Create</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right flex items-center justify-end gap-1 px-1">
        <form className=" bg-gray-50 shadow rounded-full px-1 flex items-center overflow-hidden lg:w-full w-1/2">
          <input
            type="text"
            placeholder="Search Item"
            className=" indent-1 placeholder:text-gray-400 placeholder:font-YsabeauInfant bg-transparent outline-none border-none px-2 py-1 w-full "
          />
          <Search />
        </form>

        <div
          className=" h-10 w-10 flex items-center justify-start relative cursor-pointer bg-gray-50 rounded-full px-1 py-1"
          onClick={() => {
            setShowCart(!showCart);
            setShowNavbarMobile(false);
          }}
        >
          <div className=" bg-gray-50 rounded-full px-1 py-1">
            <LocalMallIcon />
          </div>
          {itemsInCart >= 1 && (
            <div className=" absolute top-1  right-1 bg-orange-500 h-5 w-5 rounded-full grid place-items-center text-center">
              <h1 className=" text-center text-white text-sm">{itemsInCart}</h1>
            </div>
          )}
        </div>
        {/* <div
          className=" lg:hidden bg-gray-50 rounded-full h-10 w-10 grid place-items-center"
          onClick={() => {
            setShowNavbarMobile(!showNavbarMobile);
            setShowCart(false);
          }}
        >
          {!showNavbarMobile ? <Menu /> : <Close />}
        </div> */}
        <div className="bg-gradient-to-r from-orange-400 tracking-wide to-rose-400 py-2 px-2 rounded-full flex justify-center items-center">
          {
            user && (
              <h1 className="uppercase text-ebony-50 font-semibold font-YsabeauInfant">{user.email[0]}{user.email[1]}</h1>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Navbar;
