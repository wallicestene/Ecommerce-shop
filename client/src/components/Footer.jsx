import React from "react";

const Footer = () => {
  return (
    <footer className=" bg-black text-ebony-50 py-8 px-1 lg:px-10 grid lg:grid-cols-4 grid-cols-2 lg:gap-5 gap-8">
      <div>
        <h1 className=" lg:text-2xl text-lg text-white my-1">E-Shop</h1>
        <div className=" text-sm  text-neutral-500 flex flex-col gap-2 overflow-ellipsis">
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
        <h1  className=" lg:text-2xl text-lg text-white my-1">Customer Services</h1>
        <div className=" text-sm  text-neutral-500 flex flex-col gap-2">
          <p>Shipping Policy</p>
          <p>Compensation First</p>
          <p>Return Policy</p>
          <p>Shipping Info</p>
        </div>
      </div>
      <div>
        <h1  className=" lg:text-2xl text-lg text-white my-1">Information</h1>
        <div className=" text-sm  text-neutral-500 flex flex-col gap-2">
          <p>About Us</p>
          <p>Prices Drop</p>
          <p>New Products</p>
          <p>Best Sales</p>
        </div>
      </div>
      <div>
        <h1  className="lg:text-2xl text-lg text-white my-1">Contact Us</h1>
        <div className=" text-sm  text-neutral-500 flex flex-col gap-2">
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
