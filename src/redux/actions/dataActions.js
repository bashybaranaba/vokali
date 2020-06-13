import {
    SET_PRODUCTS,
    SET_PRODUCT,
    LIKE_PRODUCT,
    UNLIKE_PRODUCT,
    FOLLOW_USER,
    UNFOLLOW_USER,
    POST_PRODUCT,
    LOADING_DATA,
    LOADING_UI,
    DELETE_PRODUCT,
    CLEAR_ERRORS,
    SET_ERRORS,
    STOP_LOADING_UI,
    SUBMIT_REVIEW,
    ORDER_ITEM
} from '../types';

import axios from 'axios';

//Get All Products
export const getProducts = () => (dispatch) => {
    dispatch({type: LOADING_DATA});
    axios
        .get('/products')
        .then((res) => {
            dispatch({
                type:SET_PRODUCTS,
                payload:res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: SET_PRODUCTS,
                payload: []
            });
        });
}

//Get one product
export const getProduct = (productId) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios
        .get(`/product/${productId}`)
        .then((res) => {
            dispatch({
                type:SET_PRODUCT,
                payload:res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => console.log(err));
}

//Add a new product
export const addNewProduct = (formData) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post('/products', formData)
        .then((res) => {
            dispatch({
                type: POST_PRODUCT,
                payload: res.data
            });
            dispatch({ type: CLEAR_ERRORS })
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

// Like a Product
export const likeProduct = productId => dispatch => {
    axios
      .get(`/product/${productId}/like`)
      .then(res => {
        dispatch({
          type: LIKE_PRODUCT,
          payload: res.data
        });
        dispatch({ type: CLEAR_ERRORS })
      })
      .catch(err => console.log(err));
};

// Unlike a Product
export const unlikeProduct = productId => dispatch => {
  axios
    .get(`/product/${productId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_PRODUCT,
        payload: res.data
      });
      dispatch({ type: CLEAR_ERRORS })
    })
    .catch(err => console.log(err));
};

//Follow user...To do
export const followUser = userName => dispatch => {
  axios
    .get(`/user/${userName}/follow`)
    .then(res => {
      dispatch({
        type: FOLLOW_USER,
        payload: res.data
      });
      dispatch({ type: CLEAR_ERRORS })
    })
    .catch(err => console.log(err));
};

// Unfollow User...To do
export const unfollowUser = userName => dispatch => {
  axios
    .get(`/user/${userName}/unfollow`)
    .then(res => {
      dispatch({
        type: UNFOLLOW_USER,
        payload: res.data
      });
      dispatch({ type: CLEAR_ERRORS })
    })
    .catch(err => console.log(err));
};

// Submit a reveiw
export const submitReview = (productId, reviewData) => dispatch => {
  axios
    .post(`/product/${productId}/review`, reviewData)
    .then(res => {
      dispatch({
        type: SUBMIT_REVIEW,
        payload: res.data
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// Order item
export const orderItem = (productId, orderDetails) => dispatch => {
  axios
    .post(`/product/${productId}/order`, orderDetails)
    .then(res => {
      dispatch({
        type: ORDER_ITEM,
        payload: res.data
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
  

//get Shop Data
export const getShopData = (storeName) => dispatch => {
    dispatch({type: LOADING_DATA});
    axios.get(`/user/${storeName}`)
        .then(res => {
            dispatch({
                type:SET_PRODUCTS,
                payload:res.data.products
            });
        })
        .catch(() => {
            dispatch({
                type:SET_PRODUCTS,
                payload:null
            });
        });
}

//Delete Product
export const deleteProduct = (productId) => (dispatch) => {
    axios
        .delete(`/product/${productId}`)
        .then( () => {
            dispatch({
                type: DELETE_PRODUCT,
                payload: productId
            });
        })
        .catch((err) => console.log(err));
}