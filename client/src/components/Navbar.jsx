import { Close, Error, Logout, Menu, Search } from "@mui/icons-material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NavbarMobile from "./NavbarMobile";
import Cart from "./Cart";
import { useCartcontext } from "./context/CartContex";
import { useUserContext } from "./context/UserContext";
import { Avatar } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Fade, Slide } from "react-awesome-reveal";

function Navbar({ scrollToSection, featiredRef }) {
  const [showNavbarMobile, setShowNavbarMobile] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showLogOut, setLogOut] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [{ itemsInCart }] = useCartcontext();
  const [{ user }, dispatch] = useUserContext();

  const backendURL = "https://e-shop-xlam.onrender.com/uploads";

  useEffect(() => {
    fetch(`https://e-shop-xlam.onrender.com/products/all`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error when fetching products");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const handleLogOut = () => {
    localStorage.removeItem("user");
    dispatch({
      type: "LOG_OUT",
    });
  };
  const handleChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchInput(inputValue);

    // Filter products based on whether the name includes the search input
    const searchedItems = products.filter((item) =>
      item.name.toLowerCase().includes(inputValue)
    );
    setFilteredProducts(searchedItems);
  };

  return (
    <div
      className={`navbar relative h-10 p-1 flex items-center justify-between gap-1 lg:w-11/12 lg:mx-auto`}
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
          <h1 className=" font-YsabeauInfant tracking-tight bg-ebony-50 w-14 text-center rounded text-orange-500 font-bold lg:tracking-wide">
            E-Shop
          </h1>
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
      </div>
      <div className="navbar-center">
        <ul className="hidden lg:flex items-center justify-between gap-10 font-YsabeauInfant">
          <li className="navlist">
            <Link to="/">Home</Link>
          </li>
          <li className="navlist">
            <div onClick={() => scrollToSection(featiredRef)}>
              <Link to="/">Shop</Link>
            </div>
          </li>
          <li className="navlist">
            <Link to="">Blog</Link>
          </li>
          <li className="navlist">
            <Link to="">Contact</Link>
          </li>
          <li className="navlist">
            {/* /UploadItemsForm */}
            <Link to="">Create</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right relative flex items-center justify-end gap-1 px-1">
        <form className=" bg-gray-50 shadow rounded-full px-1 flex items-center overflow-hidden lg:w-full w-1/2">
          <input
            onChange={handleChange}
            type="text"
            placeholder="Search Item"
            className=" indent-1 placeholder:text-gray-400 placeholder:font-YsabeauInfant bg-transparent outline-none border-none px-2 py-1 w-full "
          />
          <Search />
        </form>
        {searchInput && (
          <div className=" absolute z-10 border-ebony-50  border shadow-slate-900 top-10 right-1/2 -translate-x-1/2 left-1/2 bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-10% to-100% from-yellow-200 via-red-400 to-fuchsia-500 rounded-md shadow-2xl w-full py-1 px-2">
            <Slide triggerOnce direction="right">
              {filteredProducts.length === 0 ? (
                <div>
                  <p className=" lg:text-sm text-xs font-Poppins font-bold text-center bg-slate-900 text-ebony-50 py-2 rounded">
                    {" "}
                    No such item!
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center lg:text-base text-sm font-Poppins  tracking-wide font-bold my-1">
                    Found {filteredProducts.length}{" "}
                    {filteredProducts.length === 1 ? "Result" : "Results"}
                  </div>
                  <Fade cascade duration={200} direction="right" triggerOnce>
                    <ul className="searchResult h-72 overflow-auto flex flex-col gap-2">
                      {filteredProducts.map((product, index) => (
                        <Link to={`/product/${product._id}`} key={index}>
                          <li className=" flex items-center gap-1 bg-slate-900 text-ebony-50 rounded-md hover:bg-ebony-50 delay-75 duration-300 hover:text-slate-900 hover:cursor-pointer border border-ebony-50 shadow-md">
                            <div className="h-12 w-12 bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-300 via-green-300 to-rose-600 rounded overflow-hidden ">
                              <img
                                src={`${backendURL}/${product.image_url}`}
                                alt=""
                                className=" h-full w-full object-contain"
                              />
                            </div>
                            <div>
                              <h2 className=" lg:text-sm text-xs font-YsabeauInfant tracking-wide font-bold">
                                {product.name}
                              </h2>
                            </div>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </Fade>
                </>
              )}
            </Slide>
          </div>
        )}
        <div
          className=" h-10 w-10 flex items-center justify-start relative cursor-pointer bg-gray-50 rounded-full px-1 py-1"
          onClick={() => {
            setShowNavbarMobile(false);
          }}
        >
          <Link to="/cart">
            <div className=" bg-gray-50 rounded-full px-1 py-1">
              <LocalMallIcon />
            </div>
          
          {itemsInCart >= 1 && (
            <div className=" absolute top-1  right-1 bg-orange-500 h-5 w-5 rounded-full grid place-items-center text-center">
              <h1 className=" text-center text-white text-sm">{itemsInCart}</h1>
            </div>
          )}</Link>
        </div>
        <div
          className=" uppercase rounded-full lg:hover:cursor-pointer lg:hover:border border-ebony-50"
          onClick={() => setLogOut(!showLogOut)}
        >
          {user && (
            <Avatar sx={{ bgcolor: "#253748", width: 38, height: 38 }}>
              {user.email[0]}
            </Avatar>
          )}
        </div>
        {showLogOut && (
          <button
            className="hidden lg:flex items-center gap-1 absolute top-10 right-1 py-2 px-5 rounded-full bg-ebony-100 shadow-xl border border-ebony-500"
            onClick={handleLogOut}
          >
            <span>log Out</span>
            <Logout fontSize="small" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
