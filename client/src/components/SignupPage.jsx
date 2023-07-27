import React, { useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function SignupPage() {
  const [error, setError] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  // handling the user SignUp
  const handleSignUp = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/user/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw Error(`${data.error}`);
        } else {
          console.log(data);
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
    fetch("http://localhost:3000/user/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw Error(`${data.error}`);
        } else {
          setError(null);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const handeleChange = (e) => {
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
      <form className=" border w-11/12 grid place-items-center font-Poppins">
        <div className=" mt-2">
          <h1>{showSignup ? "Sign Up and Create an" : "Log In to your"} <span className=" text-orange-500 font-bold">E-shop</span> Account</h1>
        </div>
        <div className=" lg:w-1/2 w-full h-full py-4 px-2">
          <label htmlFor="email" className="block">
            Email <br />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter Your Email Address"
              className=" w-full h-10 rounded outline-none border my-1 indent-2"
              onChange={handeleChange}
            />
          </label>
          <label htmlFor="password" className=" block">
            Password <br />
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              id="password"
              className=" w-full h-10 rounded outline-none border my-1 indent-2"
              onChange={handeleChange}
            />
          </label>
          <div className=" flex items-center justify-center">
            {!showSignup && (
              <button
                className=" bg-green-600 h-10 w-20 rounded-md text-white my-2"
                onClick={handleLogIn}
              >
                Log In
              </button>
            )}
            {showSignup && (
              <button
                className=" bg-green-600 h-10 w-20 rounded-md text-white my-2"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            )}
          </div>
          <div className=" text-center text-sm font-YsabeauInfant font-semibold tracking-wide">
            {
              !showSignup ? (
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
              )
            }
          </div>
          {error && (
            <div className=" border-2 mt-3 border-red-600 text-sm text-red-600 w-full text-center rounded flex items-center justify-center gap-1 py-1">
              <div>
                <ErrorOutlineIcon fontSize="small" />
              </div>
              <p>{error}</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
