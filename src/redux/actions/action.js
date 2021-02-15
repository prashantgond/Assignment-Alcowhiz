import { ADD_TO_CART, REMOVE_ITEM_FROM_CART, UPDATE_CART } from './actionConstants';
// import AsyncStorage from '@react-native-community/async-storage';


export function addItemToCart(data) {
    return {
        type: ADD_TO_CART,
        payload: data
    }
}

export function removeItemToCart(data) {
    return {
        type: REMOVE_ITEM_FROM_CART,
        payload: data
    }
}

export function updateCart(data) {
    return {
        type: UPDATE_CART,
        payload: data
    }
}