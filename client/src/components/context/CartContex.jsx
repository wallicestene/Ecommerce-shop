import { useContext, useReducer } from "react";
import { createContext } from "react";
import reducer, { initialSate } from "./reducer";


export const cartContext = createContext()

export const CartDataContext = ({children}) => {

    return (
        <cartContext.Provider value={useReducer(reducer, initialSate)}>
            { children }
        </cartContext.Provider>
    )
}
export const useCartcontext = () => {
    return  useContext(cartContext)
}