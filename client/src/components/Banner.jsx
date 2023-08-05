import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { PropagateLoader } from "react-spinners";
const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const backendURL = "https://e-shop-xlam.onrender.com/uploads";

  const fetChBannerItem = () => {
    fetch("https://e-shop-xlam.onrender.com/products/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error when fetching data");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        const itemData = data;
        const randomItem = Math.floor(Math.random() * itemData.length);
        setBannerData(itemData[randomItem]);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Fetching the data initially when the component mounts
    fetChBannerItem();

    // Settting up the interval to fetch data every 1 minute
    const interval = setInterval(fetChBannerItem, 40000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner mx-auto lg:w-11/12 bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-yellow-200 via-red-500 to-fuchsia-500 rounded-br-md rounded-bl-md">
      {error && <p>{error}</p>}

      <div className=" grid grid-cols-3 gap-1 h-fit rounded-2xl lg:px-3 px-1 ">
        {loading && (
          <div className=" h-80 grid place-items-center col-span-3">
            <PropagateLoader color="#f43500" size={30} />
          </div>
        )}
        {!loading && (
          <>
            <div className="banner-left h-full grid place-items-center col-span-1">
              <div className=" w-52 h-40 bg-blac z-20 overflow-clip">
                <Fade triggerOnce
                  key={bannerData.name}
                  delay={500}
                  cascade
                  damping={1e-1}
                  className=" text-gray-50 font-Montserrat "
                >
                  {bannerData.name}
                </Fade>
                <Fade triggerOnce key={bannerData.category} delay={500} duration={2000}>
                  <h2 className=" lg:text-3xl text-xl font-Poppins font-extrabold text-ebony-950">
                    Fashion {bannerData.category}
                  </h2>
                </Fade>
                <Slide triggerOnce key={bannerData._id} delay={1000} duration={500} >
                  <div className=" bg-ebony-800 inline-block rounded-full text-white w-24 h-7 text-center hover:cursor-pointer mt-5  transition duration-500 hover:scale-125 hover:bg-sky-600">
                    <Link to={`/product/${bannerData._id}`}>
                      <p className=" font-Montserrat text-sm px-2 py-1">
                        Shop Now
                      </p>
                    </Link>
                  </div>
                </Slide>
              </div>
            </div>
              <Slide triggerOnce
              duration={1000}
              delay={200}
              direction="down"
              key={bannerData.image_url[0]} 
              className=" banner-right lg:h-96 h-80 flex items-center justify-center col-span-2">
                <img
                  src={`${backendURL}/${bannerData.image_url[0]}`}
                  alt=""
                  className="h-full object-cover"
                />
            </Slide>
          </>
        )}
      </div>
    </div>
  );
};

export default Banner;
