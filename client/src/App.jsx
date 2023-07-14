import React, { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import { HashRouter as Router, Route, Switch, HashRouter } from 'react-router-dom/cjs/react-router-dom.min'
import Home from './components/Home'
import UploadItemsForm from './adminPanel/UploadItemsForm'
import ProductsDetailsPage from './components/ProductsDetailsPage'
function App() {

  const[show, setShow] = useState(false)

  const featiredRef = useRef(null)
  const scrollToSection =(ref)=>{
    ref.current.scrollIntoView({behavior : "smooth"})
  }
  const handleshow = () =>{
    if(window.scrollY > 100){
      setShow(true)
    }else{
      setShow(false)
    }
  }

  useEffect(() =>{
    window.addEventListener("scroll", handleshow)
    return () => window.removeEventListener("scroll", handleshow)
  },[])
  return (
    <div> 
      <Router>
      <div className={`fixed w-full z-40 ${show && "backdrop-blur-xl bg-white/30 shadow"}`}>
      <Navbar scrollToSection={scrollToSection} featiredRef={featiredRef}/>
      </div>
        <Switch >
          {/* Routes Here */}
          <Route exact path="/">
            <Home theref={featiredRef}/>
            </Route>
          <Route path="/UploadItemsForm" component={UploadItemsForm}/>
          <Route path="/product/:id" component={ProductsDetailsPage}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App