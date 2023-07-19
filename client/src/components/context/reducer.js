export const initialSate = {
    itemsInCart: "",
}
const reducer = (state, action) => {
    console.log(action)
    switch(action.type){
        case 'ADD_IN_CART':
            return {
                ...state, 
                itemsInCart: action.inCart 
            };
            default:
                return state;
    }
}
export default reducer