import React, { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const backendURL = "https://e-shop-xlam.onrender.com/uploads";

  useEffect(() => {
    fetch("https://e-shop-xlam.onrender.com/product/categories")
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
  }, []);
  return (
    <div className=" mt-3 ">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="categories flex items-center gap-4 w-full justify-center overflow-x-auto">
        {!loading &&
          categories?.map((category, index) => (
            <div
              key={index}
              className=" h-32 w-36 border flex-shrink-0 relative bg-gray-200 rounded"
            >
              <img
                src={`${backendURL}/${category.image_url}`}
                alt=""
                className="h-full w-full object-cover px-4"
              />
              <div className=" absolute top-1/2 bottom-1/2 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 h-fit w-fit bg-white border rounded-full">
                <p className="text-sm px-5 py-1 font-YsabeauInfant">#{category.name}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Categories;
