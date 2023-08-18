import { Close } from '@mui/icons-material'
import React from 'react'

function CheckoutPage() {
  return (
    <div>
        <div className=' flex'>
            <div>
                <h1>Payment Details</h1>
            <p>Enter details below to purchase your products.</p>
            </div>
            <div>
            <Close/>
        </div>
        </div>
        
    </div>
  )
}

export default CheckoutPage