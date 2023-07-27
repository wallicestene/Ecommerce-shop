import { createContext, useContext, useReducer } from "react";
import reducer, { initialSate } from "./reducer";


export const userContext = createContext()

export const UserDataContext = ({children}) => {
    return (
        <userContext.Provider value={useReducer(reducer, initialSate)}>
            { children }
        </userContext.Provider>
    )
}
export const useUserContext = () => {
    return useContext(userContext)
}