const BaseUrl = 'https://fakestoreapi.com/products?limit=';
import axios from 'axios';

export const getProductList = (limit) => {
    return axios.get(BaseUrl + limit)
        .then(res => {
            return res
        }).catch((err) => {
            console.log("error while api fetch", err)
        })
}