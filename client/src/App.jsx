import React from 'react'
import Navbar from './components/Navbar'
import { HashRouter as Router, Route, Switch, HashRouter } from 'react-router-dom/cjs/react-router-dom.min'
import Home from './components/Home'
function App() {
  return (
    <div>
      <Router>
      <Navbar/>
        <Switch >
          {/* Routes Here */}
          <Route component={Home}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App