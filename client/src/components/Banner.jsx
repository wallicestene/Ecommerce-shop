import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const backendURL = "https://e-shop-xlam.onrender.com/uploads"

  useEffect(() => {
    fetch("https://e-shop-xlam.onrender.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error when fetching data");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        const randomItem = Math.floor(Math.random() * data.length );
        setBannerData(data[randomItem]);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  return (
    <div className="banner mx-auto lg:w-11/12 bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-yellow-200 via-red-500 to-fuchsia-500 rounded-br-md rounded-bl-md">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && (
        <div className=" grid grid-cols-3 gap-1 h-fit rounded-2xl lg:px-3 px-1 ">
          <div className="banner-left h-full grid place-items-center col-span-1">
            <div>
                <h1 className=" text-gray-50 font-Montserrat">{bannerData.name}</h1>
            <h2 className=" lg:text-3xl text-xl font-Poppins font-extrabold text-ebony-950">Fashion {bannerData.category}</h2>
            <div className=" bg-ebony-800 inline-block rounded-full text-white w-24 h-7 text-center hover:cursor-pointer mt-5  transition duration-500 hover:scale-125 hover:bg-sky-600">
                <Link to={`/product/${bannerData._id}`}>
                <p className=" font-Montserrat text-sm px-2 py-1">Shop Now</p>
                </Link>
            </div>
            </div>
          </div>
          <div className=" banner-right lg:h-96 h-80 flex items-center justify-center col-span-2">
            <img src={`${backendURL}/${bannerData.image_url[0]}`} alt="" className="h-full object-cover"/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
