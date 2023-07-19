import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import Categories from './Categories'
import FeaturedProducts from './FeaturedProducts'
import { useCartcontext } from './context/CartContex'

const Home = ({theref}) => {
  const [{ itemsInCart }, dispatch] = useCartcontext();
    useEffect(() => {  
      const fetchCartItems = () => {
        fetch("http://localhost:3000/product/cart")
          .then((response) => response.json())
          .then((data) => {
            dispatch({
              type:"ADD_IN_CART",
              inCart : data.length
            })
          })
          .catch((error) => {
            console.log("failed to fetch items"+ error)
          });
      };
      // fetching initial item in the cart
      fetchCartItems();
    }, [])  
  
  return (
    <div className='Home'> 
        <div className=' '>
        <Banner/>
        </div>
        <div>
          <Categories/>
        </div>
        <div ref={theref}>
          <FeaturedProducts/>
        </div>
    </div>
  )
}

export default Home