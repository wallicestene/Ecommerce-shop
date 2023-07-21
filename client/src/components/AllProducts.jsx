import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const AllProducts = ({ product }) => {
  const backendURL = "http://localhost:3000/uploads";
  return (
    <div className="h-72 w-40 shadow-md transform transition ease-in-out duration-500 hover:scale-110 relative">
      <Link to={`/product/${product._id}`}>
        <div className="w-full flex flex-col justify-between h-full ">
          <img
            src={`${backendURL}/${product.image_url}`}
            alt=""
            className="w-full h-60 object-cover bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-100 via-green-200 to-rose-500"
          />
          <div className=" p-1">
            <h1 className=" lg:text-sm text-xs text-zinc-800 font-Poppins font-bold">
              {product.name}
            </h1>
            <div className=" flex justify-between items-center">
              <p className=" font-YsabeauInfant lg:text-sm text-xs font-bold">
                {(product.price).toLocaleString("en-US", {
                  style:"currency",
                  currency: "USD"
                })}
              </p>
              <p className=" font-Montserrat text-xs text-gray-500">
                {product.category}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {
        product.isNewItem && (
          <div className=" absolute top-1 left-2 shadow-lg bg-red-600 text-ebony-50 h-10 w-10 grid place-items-center rounded-full">
            <p>New</p>
          </div>
        )
      }
    </div>
  );
};

export default AllProducts;
