import React, { useEffect, useState } from "react";
import { Delete } from "@mui/icons-material";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import io from "socket.io-client";

const Cart = ({ setShowCart }) => {
  const [cartData, setCartData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const backendURL = "http://localhost:3000/uploads";
  const history = useHistory();

  useEffect(() => {
    const socket = io("http://localhost:3000");

    const fetchCartItems = () => {
      fetch("http://localhost:3000/product/cart")
        .then((response) => response.json())
        .then((data) => {
          setCartData(data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Failed to fetch cart items.");
          setLoading(false);
        });
    };
    // fetching initial item in the cart
    fetchCartItems();

    // Socket.IO event listener for cart updates

    socket.on("dataChange", (change) => {
      // Handling the change event

      if (change.type === "cartItemAdded") {
        const newItem = change.cartItem;
        
        setCartData((prevData) => [...prevData, newItem]);
      } else if (change.type === "cartItemDeleted") {
       
        const deletedItemId = change.cartItem._id;
        setCartData((prevData) =>
          prevData.filter((item) => item._id !== deletedItemId)
        );
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const removeFromCart = (item) => {
    fetch(`http://localhost:3000/product/cart/${item._id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Updating the cart data in the component state
        setCartData((prevData) => prevData.filter((product) => product._id !== item._id));
      })
      .catch((error) => {
        setError("Failed to remove item from the cart.");
      });
  };

  return (
    <div className=" fixed top-10 right-0 lg:right-0 lg:w-96 z-40 bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-yellow-200 via-red-500 to-fuchsia-500 rounded-md w-3/4 h-screen flex flex-col">
      <div className=" relative h-full w-full">
        <div className=" absolute bottom-14 z-10 w-full h-10  flex items-center justify-center bg-orange-500 rounded-lg">
          <button className=" w-full h-full text-gray-50">Checkout</button>
        </div>
        <div className=" border-b-2 py-2 px-5 border-gray-500">
          <h1 className=" text-gray-50">Cart</h1>
        </div>
        <ul className="cart flex flex-col gap-5 p-2 overflow-y-scroll h-4/5">
          {cartData.length > 0 ? (
            cartData.map((item, index) => (
              <li key={index} className=" shadow shadow-orange-700 rounded cursor-default">
                <Link className=" flex items-center justify-between" to={`/product/${item.item._id}`} onClick={() => setShowCart(false)}>
                  <div className=" flex items-center gap-1 lg:gap-5">
                    <img
                      src={`${backendURL}/${item?.item.image_url}` || ""}
                      alt=""
                      className="h-20 w-20 object-cover bg-slate-200 rounded-lg"
                    />
                    <div>
                      <p className=" lowercase first-letter:uppercase text-ebony-50">{item.item.name}</p>
                      <p className=" text-xs text-gray-200 font-semibold">
                        ${item.item.price.toLocaleString()}.00 X {item.quantity}{" "}
                        <strong className="text-base shadow-xl text-ebony-50">
                          ${item.item.price * item.quantity}.00
                        </strong>
                      </p>
                    </div>
                  </div>
                  </Link>
                  <div onClick={() => removeFromCart(item)} className="text-slate-950">
                    <Delete />
                  </div>
                
              </li>
            ))
          ) : (
            <div className=" text-center flex flex-col items-center justify-center h-full">
              <p className=" text-gray-50">Your shopping cart is empty!</p>
              <p
                className=" px-10 py-2 bg-gray-200 rounded-md mt-2 cursor-pointer"
                onClick={() => {
                  history.push("/");
                  setShowCart(false);
                }}
              >
                Continue Shopping
              </p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Cart;
