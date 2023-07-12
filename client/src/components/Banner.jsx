import React, { useEffect, useState } from "react";

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const backendURL = "http://localhost:3000/uploads"

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error when fetching data");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        const randomData = Math.floor(Math.random() * data.length );
        setBannerData(data[randomData]);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  return (
    <div className="banner mx-auto lg:w-4/5">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && (
        <div className=" grid grid-cols-3 gap-1 h-fit rounded-2xl lg:px-3 px-1 ">
          <div className="banner-left h-full grid place-items-center col-span-1">
            <div>
                <h1 className=" text-gray-700 font-Montserrat">{bannerData.name}</h1>
            <h2 className=" text-3xl font-Montserrat font-extrabold">Fashion {bannerData.category}</h2>
            <div className=" bg-zinc-800 inline-block rounded-full text-white w-24 h-7 text-center hover:cursor-pointer mt-5">
                <p className=" font-Montserrat text-sm px-2 py-1">Shop Now</p>
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
