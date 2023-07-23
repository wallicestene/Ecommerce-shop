import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import Categories from './Categories'
import FeaturedProducts from './FeaturedProducts'
import { useCartcontext } from './context/CartContex'
import NewsLetterForm from './NewsLetterForm'
import Footer from './Footer'

const Home = ({theref}) => {
  const [{ itemsInCart }, dispatch] = useCartcontext();
    useEffect(() => {  
      const fetchCartItems = () => {
        fetch("https://e-shop-xlam.onrender.com/product/cart")
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
        <div>
          <NewsLetterForm/>
        </div>
        <div>
          <Footer/>
        </div>
    </div>
  )
}

export default Home