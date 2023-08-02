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

const NavbarMobile = ({
  scrollToSection,
  featiredRef,
  setShowNavbarMobile,
}) => {
  const [{ user }, dispatch] = useUserContext();
  const handleLogOut = () => {
    localStorage.removeItem("user");
    dispatch({
      type: "LOG_OUT",
    });
  };
  return (
    <div className=" fixed bg-ebony-50 grid place-items-center  rounded-r-xl bg left-0 top-10 h-screen w-3/5 z-40 text-black">
      <div className="navbar-center w-full">
        <ul className=" flex items-center flex-col justify-between gap-10 font-YsabeauInfant">
          <Link to="/" className="w-full">
            <li
              className="navlistMob "
              onClick={() => setShowNavbarMobile(false)}
            >
              Home
              <Home />
            </li>
          </Link>
          <Link onClick={() => scrollToSection(featiredRef)} to="/" className="w-full ">
            <li
              className="navlistMob"
              onClick={() => setShowNavbarMobile(false)}
            >
              Shop
              <Shop />
            </li>
          </Link>
          <Link to="" className="w-full">
            <li
              className="navlistMob"
              onClick={() => setShowNavbarMobile(false)}
            >
              Blog
              <Article />
            </li>
          </Link>{" "}
          <Link to="" className="w-full">
            <li
              className="navlistMob flex flex-row-reverse  items-center justify-center gap-1 py-1"
              onClick={() => setShowNavbarMobile(false)}
            >
              Contact
              <ContactPage />
            </li>
          </Link>
          <Link to="" className="w-full">
            <li
              className="navlistMob"
              onClick={() => setShowNavbarMobile(false)}
            >
              Create
              <AddCard />
            </li>
          </Link>
        </ul>
        <div
          className=" flex items-center justify-center gap-1 bg-ebony-100 mt-5 h-10 hover:cursor-pointer hover:bg-ebony-50 border border-ebony-500 rounded-full"
          onClick={handleLogOut}
        >
          <p>Log Out</p>
          <div>
            <Logout fontSize="small" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
