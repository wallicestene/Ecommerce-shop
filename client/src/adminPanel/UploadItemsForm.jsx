import { KeyboardBackspace, Upload } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UploadItemsForm = () => {
  const [productData, SetProductData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    isNewItem: false,
  });
  console.log(productData.isNewItem);
  const [image_url, setImage_url] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [showCategoriesForm, setShowCategoriesForm] = useState(false);

  const history = useHistory();

  const handleProductSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("category", productData.category);
    formData.append("image_url", image_url);
    formData.append("isNewItem",  JSON.parse(productData.isNewItem));
    // const item = { name, price, description, category, image_url};
    fetch("http://localhost:3000/products", {
      method: "POST",
      body: formData,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
    });
    SetProductData((prevData) => ({
      ...prevData,
      name: "",
      price: "",
      description: "",
      category: "",
      isNewItem: false
    }));
    setImagePreview("")
    setImage_url(null)
  };

  const handleChange = (event) => {

    const { name, value, type, checked } = event.target;

    SetProductData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];

    setImage_url(selectedImage);

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImagePreview("");
    }
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("image_url", image_url);
    fetch("http://localhost:3000/product/categories", {
      method: "POST",
      body: formData,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
    });
    setImage_url(null);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen font-Montserrat">
      <div
        className="fixed top-10 left-5 bg-gray-100 hover:shadow-lg rounded-full h-12 w-12 grid place-items-center z-10"
        onClick={() => history.go(-1)}
      >
        <KeyboardBackspace fontSize="large" />
      </div>
      <div className="flex lg:flex-row flex-col w-full gap-2 mt-10">
        <div className=" flex-4 p-1 flex flex-col justify-center">
          <div className="">
            <div className=" text-center py-1">
              <h1 className=" font-bold first-letter:uppercase text-xl lg:text-4xl ">
                Admin Panel
              </h1>
            </div>
            <div className="flex items-center lg:gap-2 gap-1">
              <Avatar />
              <h1>Admin's name</h1>
            </div>
            <hr className="mt-2 h-1 w-full rounded-full bg-black" />
          </div>
          <div className=" flex flex-col gap-5 mt-5">
            <div
              className="border border-slate-900 p-3 rounded-lg flex items-center gap-1 cursor-pointer hover:bg-zinc-200 justify-center hover:rounded-full"
              onClick={() => setShowCategoriesForm(false)}
            >
              <h1>Upload new Products</h1>
              <Upload />
            </div>
            <div
              className="border border-slate-900 p-3 rounded-lg flex items-center gap-1 cursor-pointer hover:bg-zinc-200 justify-center hover:rounded-full"
              onClick={() => setShowCategoriesForm(true)}
            >
              <h1>Upload new Categories</h1>
              <Upload />
            </div>
          </div>
        </div>
        <div className="w-full px-5  rounded-md border bg-slate-900 my-2 py-2 text-white flex-6 ">
          {!showCategoriesForm && (
            <form
              className=" w-full "
              onSubmit={handleProductSubmit}
              encType="multipart/form-data"
            >
              <label className=" block my-1" htmlFor="name">
                Product Name <br />
                <input
                  name="name"
                  onChange={handleChange}
                  className=" w-full h-8 outline-none bg-transparent border rounded-lg px-2 py-5"
                  type="text"
                  id="name"
                  placeholder="Enter product name"
                  value={productData.name}
                  required
                />
              </label>
              <label className=" block my-1" htmlFor="price">
                Product Price <br />
                <input
                  name="price"
                  onChange={handleChange}
                  className=" w-full h-8 outline-none bg-transparent border rounded-lg px-2 py-5"
                  type="number"
                  id="price"
                  placeholder="Enter product price"
                  value={productData.price}
                  required
                />
              </label>
              <label className=" block my-1" htmlFor="description">
                Product Description <br />
                <input
                  name="description"
                  onChange={handleChange}
                  className=" w-full h-8 outline-none bg-transparent border rounded-lg px-2 py-5"
                  type="text"
                  id="description"
                  placeholder="Enter product description"
                  value={productData.description}
                  required
                />
              </label>
              <label className=" block my-1" htmlFor="category">
                Product Category <br />
                <input
                  name="category"
                  onChange={handleChange}
                  className=" w-full h-8 outline-none bg-transparent border rounded-lg px-2 py-5"
                  type="text"
                  id="category"
                  placeholder="Enter product Category"
                  value={productData.category}
                  required
                />
              </label>
              <label className="inline my-1" htmlFor="image_url">
                Product Image <br />
                <input
                  name="image_url"
                  onChange={handleImageUpload}
                  className=" "
                  type="file"
                  id="image_url"
                  required
                />
                {imagePreview && (
                  <div className="mt-1 border w-fit h-32">
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="w-28 h-full object-contain"
                    />
                  </div>
                )}
              </label>
              <label className=" block my-1" htmlFor="isNewItem">
                New product <br />
                <input
                  name="isNewItem"
                  checked={productData.isNewItem}
                  onChange={handleChange}
                  className=" "
                  type="checkbox"
                  id="isNewItem"
                />
              </label>
              <div className=" bg-red-600 text-center rounded-full mt-4 h-10">
                <button className=" h-full w-full">Submit</button>
              </div>
            </form>
          )}
          {showCategoriesForm && (
            <form onSubmit={handleCategorySubmit}>
              <label className=" block my-1" htmlFor="name">
                Category Name <br />
                <input
                  name="name"
                  onChange={handleChange}
                  className=" w-full h-8 outline-none bg-transparent border rounded-lg px-2 py-5"
                  type="text"
                  id="name"
                  placeholder="Enter product name"
                  value={productData.name}
                  required
                />
              </label>
              <label className=" block my-1" htmlFor="image_url">
                Category Image <br />
                <input
                  name="image_url"
                  onChange={(e) => setImage_url(e.target.files[0])}
                  className=" w-full h-8 outline-none bg-transparent border rounded-lg px-2"
                  type="file"
                  id="image_url"
                  //   placeholder="Chose Product image"
                  //   value={image_url}
                  required
                />
              </label>

              <div className=" bg-red-600 text-center rounded-full mt-4 h-10">
                <button className=" h-full w-full">Submit</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadItemsForm;
