import React, { useEffect, useState } from "react";
import { useCartcontext } from "./context/CartContex";
import { Delete } from "@mui/icons-material";

const Cart = () => { 
   const [cartData, setCartData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [{ cart }, dispatch] = useCartcontext();
  const backendURL = "http://localhost:3000/uploads";

  const removeFromcart = (item) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      cart: item,
    });
  };


  useEffect(() => {
    fetch("http://localhost:3000/product/cart")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error when fetching data");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setCartData(data);
        console.log(data);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  return (
    
    <div className=" fixed top-10 right-0 lg:right-0 lg:w-96 z-40  bg-slate-300 w-96 h-screen flex flex-col">
        <div className=" relative h-full w-full">
        <div className=" absolute bottom-14 z-10 w-full h-10  flex items-center justify-center bg-orange-500 rounded-lg">
          <button className=" w-full h-full">Checkout</button>
        </div>
      <div className=" border-b-2 py-2 px-5 border-gray-500">
        <h1>Cart</h1>
      </div>
      <div className="cart flex flex-col gap-5 p-2 overflow-y-scroll h-4/5">
        {cartData.length > 0 ? (
          cartData.map((item, index) => (
            <div key={index}>
              <div className=" flex items-center justify-between">
                <div className=" flex items-center gap-1 lg:gap-5">
                  <img
                    src={`${backendURL}/${item?.item.image_url}` || ""}
                    alt=""
                    className="h-20 w-20 object-cover bg-slate-200 rounded-lg"
                  />
                  <div>
                  <p>{item.name}</p>
                  <p>${item.price}.00 X </p>
                  </div>
                </div>
                <div onClick={() => removeFromcart(item)}>
                  <Delete />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>Your shopping cart is empty!</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Cart;
