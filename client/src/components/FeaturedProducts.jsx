import React, { useEffect, useState } from "react";
import AllProducts from "./AllProducts";
import { Skeleton } from "@mui/material";

const FeaturedProducts = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const skeletonArr = [1, 2, 3, 4];
  useEffect(() => {
    // Fetch categories
    fetch("https://e-shop-xlam.onrender.com/product/categories")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error when fetching categories!");
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

    // Fetch all products
    fetch("https://e-shop-xlam.onrender.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error when fetching products");
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

  useEffect(() => {
    // Filtering products when a category is selected
    if (selectedCategory) {
      const filtered = products.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <main className="grid place-items-center mt-5">
      <div className="text-center">
        <h1 className="font-Poppins font-extrabold text-2xl uppercase">
          Featured Products
        </h1>
        <p className="text-zinc-500 font-YsabeauInfant text-sm lg:text-base md:text-base my-2">
          Discover our handpicked collection of trendy and stylish clothing,
          showcasing the latest fashion must-haves for men, women, and kids on
          our featured products page.
        </p>
      </div>
      <div className="categories flex flex-row lg:gap-10 gap-2 items-center justify-center flex-wrap w-full text-zinc-500">
        {loading &&
          skeletonArr.map((index) => (
            <Skeleton key={index} variant="rounded" width={90} height={30} />
          ))}
        {error && <p>{error}</p>}
        {!loading && (
          <div
            onClick={() => setFilteredProducts(products)}
            className="h-8  w-fit px-5 py-1 hover:rounded-full hover:bg-orange-500 hover:text-white cursor-pointer focus:bg-orange-500 delay-150 duration-300 "
          >
            <h1>All</h1>
          </div>
        )}
        {!loading &&
          categories?.map((category, index) => (
            <div
              key={index}
              className={`h-8  w-fit px-5 py-1 hover:rounded-full hover:bg-orange-500 hover:text-white cursor-pointer focus:bg-orange-500 delay-150 duration-300 ${
                selectedCategory === category.name
                  ? "bg-orange-500 text-white rounded-full"
                  : ""
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <h2>{category.name}</h2>
            </div>
          ))}
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-2 md:grid-cols-3 lg:gap-5 gap-5 my-5 ">
        {loading &&
          skeletonArr.map((index) => (
            <div className=" flex flex-col gap-2">
              <Skeleton
                key={index}
                variant="rectangle"
                width={160}
                height={230}
              />
              <Skeleton key={index} variant="rounded" width={130} height={14} />
              <Skeleton key={index} variant="rounded" width={80} height={14} />
            </div>
          ))}
        {error && <p>error</p>}
        {!loading &&
          filteredProducts.map((product, index) => (
            <AllProducts product={product} key={index} />
          ))}
      </div>
    </main>
  );
};

export default FeaturedProducts;
