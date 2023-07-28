import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  AddCard,
  Article,
  ContactPage,
  Create,
  Home,
  Logout,
  NoteAlt,
  Search,
  Shop,
} from "@mui/icons-material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useUserContext } from "./context/UserContext";
const NavbarMobile = ({ scrollToSection, featiredRef, setShowNavbarMobile }) => {
  const [{user}, dispatch] = useUserContext()
  const handleLogOut = () => {
    localStorage.removeItem("user")
    dispatch({
      type: 'LOG_OUT',
    })
  }
  return (
    <div className=" fixed  bg-gradient-to-r from-gray-900 to-gray-600 rounded-l-xl  rounded-lg bg left-0 top-10 h-screen w-1/2 p-10 z-50 text-black">
      <div className="navbar-center">
        <ul className=" flex items-center flex-col justify-between gap-10 font-YsabeauInfant">
          <li className=" flex items-center gap-1 py-1" onClick={() => setShowNavbarMobile(false)}>
            <Link to="/">Home</Link>
            <Home />
          </li>
          <li className=" flex items-center gap-1 py-1" onClick={() => setShowNavbarMobile(false)}>
            <div onClick={() => scrollToSection(featiredRef)}>
              <Link to="/">Shop</Link>
              <Shop />
            </div>
          </li>
          <li className=" flex items-center gap-1 py-1" onClick={() => setShowNavbarMobile(false)}>
            <Link to="">Blog</Link>
            <Article/>
          </li>
          <li className=" flex items-center justify-center gap-1 py-1" onClick={() => setShowNavbarMobile(false)}>
            <Link to="">Contact</Link>
            <ContactPage />
          </li>
          <li className=" flex items-center gap-1 py-1" onClick={() => setShowNavbarMobile(false)}>
            <Link to="/UploadItemsForm">Create</Link>
            <AddCard />
          </li>
        </ul>
        <div className=" flex items-center justify-center gap-1 bg-ebony-50 mt-2 rounded-full" onClick={handleLogOut}>
          <p>Log Out</p>
          <div>
            <Logout fontSize="small"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
