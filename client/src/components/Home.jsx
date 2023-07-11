import React from 'react'
import Banner from './Banner'
import Categories from './Categories'

const Home = () => {
  return (
    <div className='Home'>
        <div className=' bg-slate-100'>
        <Banner/>
        </div>
        <div>
          <Categories/>
        </div>
    </div>
  )
}

export default Home