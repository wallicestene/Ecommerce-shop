import React from 'react'
import Navbar from './components/Navbar'
import { HashRouter as Router, Route, Switch, HashRouter } from 'react-router-dom/cjs/react-router-dom.min'
import Home from './components/Home'
import UploadItemsForm from './adminPanel/UploadItemsForm'
function App() {
  return (
    <div>
      <Router>
      <div className='fixed w-full z-40'>
      <Navbar/>
      </div>
        <Switch >
          {/* Routes Here */}
          <Route exact path="/" component={Home}/>
          <Route path="/UploadItemsForm" component={UploadItemsForm}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App