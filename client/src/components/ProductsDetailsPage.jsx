import {
  Add,
  KeyboardBackspace,
  LocalMall,
  Minimize,
  Remove,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
const ProductsDetailsPage = () => {
  const [details, setDetails] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const history = useHistory();

  const backendURL = "http://localhost:3000/uploads";
  const { id } = useParams();  

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error when fetching data");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setDetails(data);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);


  const addToCart = (item) => {
    const itemToAdd = { item, quantity };
    fetch("http://localhost:3000/product/cart", {
      method: "POST",
      body: JSON.stringify(itemToAdd),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Item added to cart")
      })
      .catch((error) => {
        console.log("Error adding item to cart:", error);
      });
  };
  
 
  return (
    <div className=" grid place-items-center lg:h-screen h-screen md:h-full bg-gradient-to-r from-gray-100 from-10% to-100% via-gray-200 to-gray-400 overflow-y-auto">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && (
        <div className=" grid lg:grid-cols-2 grid-cols-1 lg:border-l lg:border-t lg:border-b rounded-xl lg:gap-5 gap-2 w-11/12 mx-auto h-full lg:h-96 border-slate-600">
          <div className="details-right h-full w-full overflow-hidden">
            <img
              src={`${backendURL}/${details.image_url}`}
              alt=""
              className="h-full w-full lg:object-contain object-cover drop-shadow-2xl shadow-black"
            />
            <div
              className="fixed top-10 hover:bg-gray-100 hover:shadow-lg hover:rounded-full h-12 w-12 grid place-items-center z-10"
              onClick={() => history.go(-1)}
            >
              <KeyboardBackspace fontSize="large" />
            </div>
          </div>
          <div className="detailsleft border border-slate-600 rounded-xl px-2 flex flex-col justify-center h-full w-full">
            <div className=" flex flex-col justify-between  h-full  mb-5">
              <div className="flex flex-col justify-center h-full">
                <h1 className=" font-Poppins font-extrabold uppercase my-1 bg-orange-500 inline w-fit px-2 text-gray-200 rounded-md shadow-md">
                  {details.name}
                </h1>
                <p className=" text-gray-700 font-YsabeauInfant text-sm my-1">
                  {details.description}
                </p>
                <p className=" font-YsabeauInfant font-extrabold mt-5 bg-gray-200 inline px-2 w-fit rounded shadow-md">
                  ${details.price}.00
                </p>
              </div>
              <div className=" flex lg:flex-row flex-col items-center lg:gap-5 gap-2 mt-2 lg:mt-0">
                <div className=" flex items-center bg-gray-300  justify-between  w-full  h-10 rounded-lg">
                  <div
                    onClick={() => {
                      if (quantity <= 1) {
                        return 1;
                      }
                      setQuantity((prevSate) => prevSate - 1);
                    }}
                  >
                    <Remove />
                  </div>
                  <p>{quantity}</p>
                  <div
                    onClick={() => {
                      setQuantity((prevSate) => prevSate + 1);
                    }}
                  >
                    <Add />
                  </div>
                </div>
                <div
                  className="flex items-center bg-orange-500 justify-center h-10 rounded-lg w-full gap-2"
                  onClick={() => addToCart(details)}
                >
                  <button className=" w-full h-full">
                    <LocalMall /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsDetailsPage;
