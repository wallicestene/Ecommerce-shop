import React, { useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useUserContext } from "./context/UserContext";
function SignupPage() {
  const [error, setError] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [{ user }, dispatch] = useUserContext();
  // handling the user SignUp
  const handleSignUp = (e) => {
    e.preventDefault();
    fetch("https://e-shop-xlam.onrender.com/user/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw Error(`${data.error}`);
        } else {
          // saving the user to local storage
          localStorage.setItem("user", JSON.stringify(data));
          // updating the userContext
          dispatch({
            type: "SET_USER",
            user: data,
          });
          setError(null);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  // handling the user logIn
  const handleLogIn = (e) => {
    e.preventDefault();
    fetch("https://e-shop-xlam.onrender.com/user/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw Error(`${data.error}`);
        } else {
          // saving the user to local storage
          localStorage.setItem("user", JSON.stringify(data));
          // updating the userContext
          dispatch({
            type: "SET_USER",
            user: data,
          });
          setError(null);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  return (
    <div className="grid place-items-center h-screen">
      <form className=" border border-ebony-500 rounded-md w-11/12 grid place-items-center font-Poppins">
        <div className=" mt-2">
          <h1>
            {showSignup ? "Sign Up to Create an" : "Log In to your"}{" "}
            <span className=" text-orange-500 font-bold">E-Shop</span> Account
          </h1>
        </div>
        <div className=" lg:w-1/2 w-full h-full py-4 px-2">
          <label htmlFor="email" className="block">
            <span className=" font-bold tracking-wide">Email</span> <br />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter Your Email Address"
              className=" w-full h-10 rounded outline-none border border-ebony-900 my-1 indent-2 font-YsabeauInfant placeholder:text-gray-600 font-semibold tracking-wide"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password" className=" block relative">
            <span className=" font-bold tracking-wide">Password</span> <br />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Your Password"
              id="password"
              className=" w-full h-10 rounded outline-none border border-ebony-900 my-1 indent-2 font-YsabeauInfant placeholder:text-gray-600 font-semibold tracking-wider"
              onChange={handleChange}
            />
            <span
              className=" absolute top-1/2 bottom-1/2 -translate-y-1/2 right-3 z-10"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <VisibilityOffIcon fontSize="small" />
              ) : (
                <VisibilityIcon fontSize="small" />
              )}
            </span>
          </label>
          <div className=" flex items-center justify-center">
            {!showSignup && (
              <button
                className=" bg-green-700 hover:bg-green-800 h-10 rounded-full text-white my-2 w-full"
                onClick={handleLogIn}
              >
                Log In
              </button>
            )}
            {showSignup && (
              <button
                className=" bg-blue-950 h-10 hover:bg-slate-800  rounded-full text-white my-2 w-full"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            )}
          </div>
          {error && (
            <div className=" border mt-3 border-red-600 lg:text-sm text-xs font-Poppins text-red-600 w-full text-center rounded flex items-center justify-center gap-1 py-1 bg-red-100">
              <div>
                <ErrorOutlineIcon fontSize="small" />
              </div>
              <p>{error}</p>
            </div>
          )}

          <div className=" text-center text-sm font-YsabeauInfant font-semibold tracking-wide mt-2">
            {!showSignup ? (
              <p>
                Not Registered?{" "}
                <span
                  className=" underline cursor-pointer  text-blue-800"
                  onClick={() => setShowSignup(true)}
                >
                  Sign Up
                </span>
              </p>
            ) : (
              <p>
                Already Registered?{" "}
                <span
                  className=" underline cursor-pointer  text-blue-800"
                  onClick={() => setShowSignup(false)}
                >
                  Log In
                </span>
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
