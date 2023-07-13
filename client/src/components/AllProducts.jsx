import React from "react";

const AllProducts = ({ product }) => {
  const backendURL = "http://localhost:3000/uploads";
  return (
    <div className="h-72 w-40 shadow-md">
      <div className="w-full flex flex-col justify-between h-full">
        <img
          src={`${backendURL}/${product.image_url}`}
          alt=""
          className="w-full h-60 object-cover bg-gray-200"
        />
        <div className=" p-1">
          <h1 className=" lg:text-sm text-xs text-zinc-800 font-Poppins font-bold">{product.name}</h1>
          <div className=" flex justify-between items-center">
            <p className=" font-YsabeauInfant lg:text-sm text-xs font-bold">${product.price}.00</p>
            <p className=" font-Montserrat lg:text-sm text-xs text-gray-500">{product.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
