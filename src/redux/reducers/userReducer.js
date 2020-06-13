import { 
    SET_USER, 
    LIKE_PRODUCT,
    UNLIKE_PRODUCT,
    SET_AUTHENTICATED, 
    SET_UNAUTHENTICATED, 
    LOADING_USER,
    FOLLOW_USER,
    UNFOLLOW_USER,  
    MARK_NOTIFICATIONS_READ
} from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    likes: [],
    follows: [],
    credentials: []
}

export default function(state = initialState, action){
    switch(action.type){
        case  SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true ,
            }
        case SET_UNAUTHENTICATED:
            return initialState
        case SET_USER:
            return{
                authenticated: true,
                loading: false, 
                ...action.payload
            }
        case LOADING_USER:
            return{
                ...state,
                loading: true,
            }
        case LIKE_PRODUCT:
            return {
                ...state,
                likes: [
                ...state.likes,
                {
                    userName: state.credentials.userName,
                    productId: action.payload.productId
                }
                ]
            };      
        case UNLIKE_PRODUCT:
            return {
                ...state,
                likes: state.likes.filter(
                like => like.productId !== action.payload.productId
                )
            }; 
        case FOLLOW_USER:
            return {
                ...state,
                follows: [
                ...state.follows,
                {
                    follower: state.credentials.userName,
                    following: action.payload.userName
                }
                ]
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                follows: state.follows.filter(
                follow => follow.following !== action.payload.following
                )
            };
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(not => (not.read = true));
            return {
                ...state
            };                    
        default:
            return state;
    }
}