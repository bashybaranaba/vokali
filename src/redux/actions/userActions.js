import { 
    SET_USER, 
    SET_ERRORS, 
    CLEAR_ERRORS, 
    LOADING_UI, 
    SET_UNAUTHENTICATED, 
    LOADING_USER,
    MARK_NOTIFICATIONS_READ
} from '../types';

import axios from 'axios';

//Login User
export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI});
    axios.post('/login', userData)
        .then((res) => {
          setAuthorizationHeader(res.data.token)
          dispatch(getUserData());
          dispatch({ type: CLEAR_ERRORS });
          history.push('/');
        })
        .catch(err => {
          dispatch({
              type: SET_ERRORS,
              payload: err.response.data
          })
        })
}

//SignUp user
export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI});
    axios.post('/signup', newUserData)
        .then((res) => {
          setAuthorizationHeader(res.data.token)
          dispatch(getUserData());
          dispatch({ type: CLEAR_ERRORS });
          history.push('/');
        })
        .catch(err => {
          dispatch({
              type: SET_ERRORS,
              payload: err.response.data
          })
        })
}

//LogoutUser
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED});
}

//Get Own User data 
export const getUserData = () => (dispatch) =>{
    dispatch({type: LOADING_USER});
    axios.get('/user')
         .then(res => {
             dispatch({
                 type: SET_USER,
                 payload: res.data
             })
         })
         .catch(err => console.log(err));
}

//upload profile image
export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/user/image', formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err));
}

//Upload banner
export const uploadBanner = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/user/banner', formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err));
}

//Edit user details
export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios.post('/user', userDetails)
        .then(() => {
            dispatch(getUserData());
        })
        .catch((err) => console.log(err));
}

//mark notification as read
export const markNotificationsRead = notificationIds => dispatch => {
    axios
      .post("/notifications", notificationIds)
      .then(res => {
        dispatch({
          type: MARK_NOTIFICATIONS_READ
        });
      })
      .catch(err => console.log(err));
  };

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};