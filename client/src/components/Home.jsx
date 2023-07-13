import React from 'react'
import Banner from './Banner'
import Categories from './Categories'
import FeaturedProducts from './FeaturedProducts'
const Home = ({theref}) => {
  
  return (
    <div className='Home'> 
        <div className=' bg-gradient-to-r from-gray-300 from-15% to-100% via-gray-200 to-gray-400'>
        <Banner/>
        </div>
        <div>
          <Categories/>
        </div>
        <div onClick={() => scrollToSection(featiredRef)}>featured</div>
        <div ref={theref}>
          <FeaturedProducts/>
        </div>
    </div>
  )
}

export default Home