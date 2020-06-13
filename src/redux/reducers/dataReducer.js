import {
    SET_PRODUCTS,
    SET_PRODUCT,
    LIKE_PRODUCT,
    UNLIKE_PRODUCT,
    POST_PRODUCT,
    LOADING_DATA,
    DELETE_PRODUCT,
    STOP_LOADING_UI,
    SUBMIT_REVIEW,
    ORDER_ITEM
} from '../types'

const initialState = {
    products: [],
    product: {},
    loading: false
}


export default function(state = initialState, action){
    switch(action.type){
        case  LOADING_DATA:
            return {
                ...state,
                loading: true ,
            };
        case SET_PRODUCTS:
            return{
                ...state,
                products: action.payload,
                loading: false
            };
        case SET_PRODUCT:
            return{
                ...state,
                product: action.payload,
                
            }; 
        case LIKE_PRODUCT:
        case UNLIKE_PRODUCT:
            let index = state.products.findIndex(
            product => product.productId === action.payload.productId
            );
            state.products[index] = action.payload;
            if (state.product.productId === action.payload.productId) {
            state.product = action.payload;
            }
            return {
            ...state
            };    
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter((product) => product.productId !== action.payload )
           };
        case POST_PRODUCT:
            return{
                ...state,
                products: [
                    action.payload,
                    ...state.products
                ]
            };
        case SUBMIT_REVIEW:
            return {
                ...state,
                product: {
                ...state.product,
                reviews: [action.payload, ...state.product.reviews]
                }
            };     
        case ORDER_ITEM:
            return {
                ...state,
                product: {
                ...state.product,
                orders: [action.payload, ...state.product.orders]
                }
            };           
        case  STOP_LOADING_UI:
            return{
                ...state,
                loading : false
            };   
        default:
            return state;
    }
}