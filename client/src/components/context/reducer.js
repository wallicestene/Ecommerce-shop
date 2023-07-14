export const initialSate = {
    cart: [],
    quantity: 1,
}
const reducer = (state, action) => {
    console.log(action)
    switch(action.type){
        case 'ADD_TO_CART':
            return {
                ...state, 
                cart: [
                    ...state.cart, {...action.cart},
                ]
            };
            case "REMOVE_FROM_CART":
                return {
                    ...state,
                    cart:[
                        ...state.cart.filter((item)=> item._id !== action.cart._id),
                    ]
                };
            // case "ADD_QUANTITY":
            //     return {
            //         ...state, 
            //         quantity: state.quantity + 1
            //     };
            // case "REMOVE_QUANTITY":
            //     return {
            //         ...state, 
            //         quantity: state.quantity <= 1 ? 1 : state.quantity - 1
            //     }
            default:
                return state;
    }
}
export default reducer