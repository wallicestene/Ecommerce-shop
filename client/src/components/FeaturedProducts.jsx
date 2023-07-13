import React, { useEffect, useState } from "react";
import AllProducts from "./AllProducts";

const FeaturedProducts = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const backendURL = "http://localhost:3000/uploads";

  useEffect(() => {
    fetch("http://localhost:3000/product/categories")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error when fetching data");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setCategories(data);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    // all products
    fetch("http://localhost:3000/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error when fetching data");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  return (
    <main className=" grid place-items-center mt-5">
      <div className=" text-center">
        <h1 className=" font-Poppins font-extrabold text-2xl uppercase">
          Featured Products
        </h1>
        <p className=" text-zinc-500">
          A collection of textile samples lay spread out on the table Samsa was
          travelled
        </p>
      </div>
      <div className=" flex flex-row lg:gap-10 items-center justify-center overflow-x-auto w-full">
        {loading && <p>Loading...</p>}
        {error && <p>error</p>}
        <div className=" h-8 text-zinc-500 w-fit px-5 py-1 hover:rounded-full hover:bg-orange-500 hover:text-white cursor-pointer focus:bg-orange-500 delay-150 duration-300">
          <h2>Shop</h2>
        </div>
        {!loading &&
          categories?.map((category, index) => (
            <div
              key={index}
              className=" h-8 text-zinc-500 w-fit px-5 py-1 hover:rounded-full hover:bg-orange-500 hover:text-white cursor-pointer focus:bg-orange-500 delay-150 duration-300"
            >
              <h2>{category.name}</h2>
            </div>
          ))}
      </div>
      <div>
          {loading && <p>Loading...</p>}
          {error && <p>error</p>}
          {!loading &&
            products.map((product, index) => (
              <AllProducts product={product} key={index} />
            ))}
        </div>
    </main>
  );
};

export default FeaturedProducts;
