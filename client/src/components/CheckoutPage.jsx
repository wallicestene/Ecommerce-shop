import { Close } from "@mui/icons-material";
import React from "react";

const CheckoutPage = () => {
  return (
    <section className="bg-white h-screen w-screen bg-opacity-30 grid place-items-center">
      <form className=" bg-white lg:w-2/5 w-11/12 shadow-xl py-2 px-4">
        <div className=" flex items-center justify-between">
          <div>
          <h1 className=" font-bold text-lg">Payment Details</h1>
          <p className=" text-sm">Enter details below to purchase your products.</p>
          </div>
          <div>
            <Close/>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CheckoutPage;
