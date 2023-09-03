import React, { useEffect, useState } from "react";
import { Delete, KeyboardBackspace, LocalShipping } from "@mui/icons-material";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import io from "socket.io-client";
import { useCartcontext } from "./context/CartContex";
import { useUserContext } from "./context/UserContext";
import { Fade, Slide } from "react-awesome-reveal";
import paypal from "../assets/paypal.webp";
import masterCard from "../assets/masterCard.webp";
import visa from "../assets/visa.webp";
const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [{ itemsInCart }, dispatch] = useCartcontext();
  const [{ user }, dispatchUser] = useUserContext();
  const backendURL = "https://e-shop-xlam.onrender.com/uploads";
  const history = useHistory();
  const [paymentMethods] = useState([masterCard, visa, paypal]);

  useEffect(() => {
    const socket = io("https://e-shop-xlam.onrender.com");

    const fetchCartItems = () => {
      fetch("https://e-shop-xlam.onrender.com/product/cart", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCartData(data);
          setLoading(false);
          dispatch({
            type: "ADD_IN_CART",
            inCart: data.length,
          });
        })
        .catch((error) => {
          setError("Failed to fetch cart items.");
          setLoading(false);
        });
    };
    // fetching initial item in the cart
    if (user) {
      fetchCartItems();
    }
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
    fetch(`https://e-shop-xlam.onrender.com/product/cart/${item._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(() => {
        // Updating the cart data in the component state
        setCartData((prevData) =>
          prevData.filter((product) => product._id !== item._id)
        );
      })
      .catch((error) => {
        setError("Failed to remove item from the cart.");
      });
  };

  // looping through the cartItems to get the total amout of the items
  const getTotal = () => {
    let total = 0;
    for (let index = 0; index < cartData.length; index++) {
      const element = cartData[index];
      total += Number(element?.item.price * element?.quantity);
    }
    return total;
  };

  return (
    <section className="relative bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-10% to-100% from-yellow-200 via-red-400 to-fuchsia-500 h-screen grid place-items-center lg:grid-cols-2  grid-cols-1 px-5 gap-5">
      <div
        className="fixed top-10 left-10 z-10 bg-gray-100 hover:shadow-lg rounded-full h-12 w-12 grid place-items-center"
        onClick={() => history.go(-1)}
      >
        <KeyboardBackspace fontSize="large" />
      </div>
      <div className="left grid place-items-center border w-full">
        <Fade cascade triggerOnce duration={400}>
          {cartData.length > 0 ? (
            <ul className="cartUl flex flex-col gap-4 items-start overflow-y-scroll h-30 w-full scroll-smooth py-3 px-1">
              {cartData.map((item, index) => (
                <li
                  key={index}
                  className=" w-full flex items-center justify-between gap-2 p-1 shadow-md rounded-md bg-gray-200"
                >
                  <Link
                    className=" flex items-center"
                    to={`/product/${item.item._id}`}
                  >
                    <div className=" flex items-center  gap-1 lg:gap-5 w-full">
                      {/* Product image */}
                      <img
                        src={`${backendURL}/${item?.item.image_url}` || ""}
                        alt=""
                        className="lg:h-24 lg:w-24 h-20 w-20 object-contain drop-shadow-lg bg-slate-300 rounded border"
                      />
                      <div>
                        <p className=" uppercase tracking-tighter first-letter:uppercase ">
                          {item.item.name}
                        </p>
                        <p className=" text-xs font-semibold">
                          {item.item.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}{" "}
                          x {item.quantity}{" "}
                          <strong className="text-base shadow-xl">
                            {(item.item.price * item.quantity).toLocaleString(
                              "en-US",
                              {
                                style: "currency",
                                currency: "USD",
                              }
                            )}
                          </strong>
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div
                    onClick={() => removeFromCart(item)}
                    className="bg-gray-50 rounded-full h-10 w-10 grid place-items-center cursor-pointer"
                  >
                    <Delete />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className=" text-center h-30 flex flex-col items-center justify-center w-full">
              <p className=" text-gray-50">Your shopping cart is empty!</p>
              <Link
                to="/"
                className=" px-10 py-2 bg-gray-200 rounded-md mt-2 hover:bg-opacity-30 hover:text-white duration-500"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </Fade>
      </div>
      <div className="right shadow-md rounded bg-slate-300 w-full flex flex-col gap-5 px-8 py-12">
        <div className="top">
          <div className="flex items-center justify-between">
            <h1 className=" font-bold text-2xl">Total</h1>
            <p className=" font-Montserrat">
              {getTotal().toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <h2 className=" font-Poppins">Delivery</h2>
            <p className=" font-semibold text-base">
              <LocalShipping fontSize="small" /> Free Shipping
            </p>
          </div>
          <hr className="border-slate-900 mt-3" />
        </div>
        <div className="mid flex items-center justify-center">
          <button
            className=" bg-black text-white px-1 py-2 rounded-sm"
            disabled={cartData.length === 0 ? true : false}
          >
            Proceed To Checkout
          </button>
        </div>
        <div className="bottom">
          <h2 className=" font-bold text-lg">We Accept</h2>
          <div className=" flex gap-5 mt-2">
            {paymentMethods.map((method, index) => (
              <img
                key={index}
                src={method}
                className=" h-8 object-contain hover:cursor-pointer transition-transform transform lg:hover:scale-75 duration-200 delay-100"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
