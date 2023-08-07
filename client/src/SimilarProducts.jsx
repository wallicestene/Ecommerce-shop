import React, { useEffect, useState } from 'react'
import AllProducts from './components/AllProducts';
import { Skeleton } from '@mui/material';

const SimilarProducts = ({ProductCategory}) => {
    const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState([])
  const skeletonArr = [1, 2, 3, 4];
  useEffect(() => {
    fetch(`https://e-shop-xlam.onrender.com/products/all`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error when fetching products");
      } else {
        return res.json();
      }
    })
    .then(data => {
        const similar = data.filter(item => item.category === ProductCategory)
        setSimilarProducts(similar)
        console.log(data)
        setLoading(false)
    })
    .catch(err => {
        setError(err.message)
        setLoading(false)
    })

  },[ProductCategory])
  return (
    <section>
        {!loading && (
            <div className=' text-center uppercase font-bold font-Montserrat text-xl border-b border-slate-600'>
                <h1>you may also like</h1>
            </div>
        )}
        <div className="grid lg:grid-cols-4 grid-cols-2 md:grid-cols-3 lg:gap-5 gap-5 my-5 ">
        {loading &&
          skeletonArr.map((index) => (
            <div className=" flex flex-col gap-2"  key={index}>
              <Skeleton
               sx={{ bgcolor: "grey.700" }}
                variant="rectangle"
                width={160}
                height={230}
              />
              <Skeleton variant="rounded" sx={{ bgcolor: "grey.700" }}  width={130} height={14} />
              <Skeleton variant="rounded" sx={{ bgcolor: "grey.700" }} width={80} height={14} />
            </div>
          ))}
        {error && <p>error</p>}
        {!loading &&
          similarProducts.map((product, index) => (
            <AllProducts product={product} key={index} />
          ))}
      </div>
    </section>
  )
}

export default SimilarProducts