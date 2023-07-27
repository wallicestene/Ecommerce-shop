import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartDataContext } from './components/context/CartContex.jsx'
import { UserDataContext } from './components/context/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserDataContext>
    <CartDataContext>
    <App />
    </CartDataContext>
    </UserDataContext>
  </React.StrictMode>,
)
