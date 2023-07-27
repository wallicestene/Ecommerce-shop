export const initialSate = {
    itemsInCart: "",
    user: null
}
const reducer = (state, action) => {
    console.log(action);
    switch(action.type){
        case 'ADD_IN_CART':
            return {
                ...state, 
                itemsInCart: action.inCart 
            };
            case "SET_USER":
                return {
                    ...state,
                    user: action.user
                };
            case "LOG_OUT" : 
            return {
                ...state,
                user: []
            };
            default:
                return state;
    }
}
export default reducer