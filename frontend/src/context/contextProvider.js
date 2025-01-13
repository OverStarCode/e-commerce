'use client'
import React, { createContext, useState } from 'react'


export const CheckoutContext = createContext(null)

const CheckOutNeeds = {
    amount: null,
    user_id: null,
    basketItems: []
    
  }
function ContextProvider({children}) {
    const [CheckOutDetails,setCheckOutDetails] =useState(CheckOutNeeds)
  return (
    <CheckoutContext.Provider value={{CheckOutDetails,setCheckOutDetails}}>
        {children}
    </CheckoutContext.Provider>
  )
}

export default ContextProvider