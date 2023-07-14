import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartDataContext } from './components/context/CartContex.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartDataContext>
    <App />
    </CartDataContext>
  </React.StrictMode>,
)
