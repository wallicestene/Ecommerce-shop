import { Upload } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";

const UploadItemsForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image_url, setImage_url] = useState(null);
  const [showCategoriesForm, setShowCategoriesForm] = useState(false);

  const handleProductSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image_url", image_url);

    const item = { name, price, description, category, image_url };
    fetch("http://localhost:3000/products", {
      method: "POST",
      body: formData,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
    });
    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     setImage_url(file);
    //   };
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image_url", image_url);
    fetch("http://localhost:3000/product/categories", {
      method: "POST",
      body: formData,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
    });
    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     setImage_url(file);
    //   };
  };
  return (
    <div className=" flex flex-col items-center justify-center h-screen">
      <div>
        <h1>Admin Panel</h1>
      </div>

      <div className=" flex w-full gap-2 border-blue border">
        <div className=" flex-4 border border-green-600 p-1">
          <div className="">
            <div className="flex items-center lg:gap-2 gap-1">
              <Avatar />
              <h1>Admin's name</h1>
            </div>
            <hr className="mt-2 h-1 w-full rounded-full bg-black" />
          </div>
          <div className=" flex flex-col gap-5 mt-5">
            <div className="border border-slate-900 p-3 rounded-lg flex items-center gap-1 cursor-pointer" onClick={() => setShowCategoriesForm(false)}>
              <h1>Upload new Products</h1>
              <Upload />
            </div>
            <div className="border border-slate-900 p-3 rounded-lg flex items-center gap-1 cursor-pointer" onClick={() => setShowCategoriesForm(true)}>
              <h1>Upload new Categories</h1>
              <Upload />
            </div>
          </div>
        </div>
        <div className="w-72 px-5  rounded-md border bg-slate-900 my-2 py-2 text-white flex-6">
          {
            !showCategoriesForm &&
            <form
            className=" w-full "
            onSubmit={handleProductSubmit}
            encType="multipart/form-data"
          >
            <label className=" block my-1" htmlFor="name">
              Product Name <br />
              <input
                name="name"
                onChange={(e) => setName(e.target.value)}
                className=" w-full h-8 outline-none bg-transparent border rounded-lg px-2 py-5"
                type="text"
                id="name"
                placeholder="Enter product name"
                value={name}
                required
              />
            </label>
            <label className=" block my-1" htmlFor="price">
              Product Price <br />
              <input
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                className=" w-full h-8 outline-none bg-transparent border rounded-lg px-2 py-5"
                type="number"
                id="price"
                placeholder="Enter product price"
                value={price}
                required
              />
            </label>
            <label className=" block my-1" htmlFor="description">
              Product Description <br />
              <input
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                className=" w-full h-8 outline-none bg-transparent border rounded-lg px-2 py-5"
                type="text"
                id="description"
                placeholder="Enter product description"
                value={description}
                required
              />
            </label>
            <label className=" block my-1" htmlFor="category">
              Product Category <br />
              <input
                name="category"
                onChange={(e) => setCategory(e.target.value)}
                className=" w-full h-8 outline-none bg-transparent border rounded-lg px-2 py-5"
                type="text"
                id="category"
                placeholder="Enter product Category"
                value={category}
                required
              />
            </label>
            <label className=" block my-1" htmlFor="image_url">
              Product Image <br />
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
          }
          {showCategoriesForm && (
            <form onSubmit={handleCategorySubmit}>
              <label className=" block my-1" htmlFor="name">
                Category Name <br />
                <input
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  className=" w-full h-8 outline-none bg-transparent border rounded-lg px-2 py-5"
                  type="text"
                  id="name"
                  placeholder="Enter product name"
                  value={name}
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
