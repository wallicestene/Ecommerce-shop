import React from 'react'
import Banner from './Banner'
import Categories from './Categories'
import FeaturedProducts from './FeaturedProducts'
const Home = ({theref}) => {
  
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