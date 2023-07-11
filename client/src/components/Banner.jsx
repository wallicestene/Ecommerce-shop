import React, { useEffect, useState } from "react";

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
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
        console.log(data[randomData]);
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
        <div className=" grid grid-cols-2 gap-1 h-fit rounded-2xl px-3">
          <div className="banner-left h-full grid place-items-center">
            <div>
                <h1 className=" text-gray-700 font-Montserrat">{bannerData.name}</h1>
            <h2 className=" text-3xl font-Montserrat font-extrabold">Fashion {bannerData.category}</h2>
            <div className=" bg-zinc-800 inline-block rounded-full text-white w-24 h-7 text-center hover:cursor-pointer mt-5">
                <p className=" font-Montserrat text-sm px-2 py-1">Shop Now</p>
            </div>
            </div>
          </div>
          <div className=" banner-right lg:h-96 h-80 flex items-center justify-center">
            <img src={bannerData.image_url} alt="" className="h-full object-cover"/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
