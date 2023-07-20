import React from "react";

const Footer = () => {
  return (
    <footer className=" bg-black text-ebony-50 py-8 px-1 lg:px-10 lg:grid lg:grid-cols-4 grid-cols-2 lg:gap-5 gap-8 place-items-center flex flex-row flex-wrap">
      <div>
        <h1 className=" lg:text-2xl text-lg text-ebony-50 my-1 font-semibold">E-Shop</h1>
        <div className=" lg:text-sm text-xs  text-neutral-500 flex flex-col gap-2 overflow-ellipsis">
          <p>
            <strong className=" text-ebony-50">Address: </strong> 123 street,Embakasi, KE, 12345 KENYA
          </p>
          <p>
            <strong className=" text-ebony-50">Phone: </strong>+254 792 8174 28
          </p>
          <p>
            <strong className=" text-ebony-50">Email: </strong>wallicestenewaweru@gmail.com
          </p>
        </div>
      </div>
      <div>
        <h1  className=" lg:text-2xl text-lg text-ebony-50 my-1 uppercase font-semibold">Customer Services</h1>
        <div className=" lg:text-sm text-xs text-neutral-500 flex flex-col gap-2">
          <p>Shipping Policy</p>
          <p>Compensation First</p>
          <p>Return Policy</p>
          <p>Shipping Info</p>
        </div>
      </div>
      <div>
        <h1  className=" lg:text-2xl text-lg text-ebony-50 my-1 uppercase font-semibold">Information</h1>
        <div className="lg:text-sm text-xs text-neutral-500 flex flex-col gap-2">
          <p>About Us</p>
          <p>Prices Drop</p>
          <p>New Products</p>
          <p>Best Sales</p>
        </div>
      </div>
      <div>
        <h1  className="lg:text-2xl text-lg text-ebony-50 my-1 uppercase font-semibold">Contact Us</h1>
        <div className="lg:text-sm text-xs text-neutral-500 flex flex-col gap-2">
          <p>Delivery</p>
          <p>Legal Notice</p>
          <p>Contact Us</p>
          <p>Sitemap</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
