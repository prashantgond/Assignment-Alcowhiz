import { ADD_TO_CART, REMOVE_ITEM_FROM_CART, UPDATE_CART } from './actions/actionConstants';
import AsyncStorage from "@react-native-community/async-storage";


const initialState = {
    cartData: [],
};

const AlcoReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            let cartItem = Object.assign([], state.cartData);
            let Data = action.payload

            Data.isAdded = !Data.isAdded;
            // console.log('Dtata', Data)
            cartItem.push(Data)
            AsyncStorage.setItem('cartData', JSON.stringify(cartItem))
            return {
                ...state, cartData: cartItem
            }
        case REMOVE_ITEM_FROM_CART:
            let cartItems = Object.assign([], state.cartData);
            let deltedData = action.payload

            deltedData.isAdded = !deltedData.isAdded;
            let itemIndex = cartItems.findIndex((item) => {
                return parseInt(item.id) === parseInt(deltedData.id)
            })
            cartItems.splice(itemIndex, 1)

            // console.log('After Delete', cartItems)
            AsyncStorage.setItem('cartData', JSON.stringify(cartItems))
            return {
                ...state, cartData: cartItems
            }
        case UPDATE_CART:
            return {
                ...state, cartData: action.payload
            }
        default:
            return state;
    }
}

export default AlcoReducer;