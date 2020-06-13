import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode';
import axios from 'axios';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
//components
import AuthRoute from './util/AuthRoute';
import Navbar from './components/layout/Navbar'

//pages
import home from './pages/home';
import landing from './pages/landing';
import signup from './pages/signup';
import login from './pages/login';
import shopfront from './pages/shopfront';
import EditProduct from './components/products/EditProduct'
import checkout from './pages/checkout'
import myprofile from './pages/myprofile'
import mystore from './pages/mystore'

const theme = createMuiTheme(themeFile)

axios.defaults.baseURL =  "https://us-central1-vokali-5a518.cloudfunctions.net/api"

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = '/landing';
  } else{
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <Provider store={store}>
       <MuiThemeProvider theme = {theme}>
          <Router>
            <Navbar/>
            <div className='container'>
            <Switch>
              <Route exact path="/" component={home}/>
              <AuthRoute exact path="/landing" component={landing}/>
              <AuthRoute exact path="/signup" component={signup}/> 
              <AuthRoute exact path="/login" component={login}/>
              <Route exact path="/myprofile" component={myprofile}/>
              <Route exact path="/mystore" component={mystore}/> 
              <Route exact path="/shopfront/:userName" component={shopfront}/>
              <Route exact path="/shopfront/:userName/item/:productId"component={shopfront}/>
              <Route exact path="/editproduct/:id" component={EditProduct}/>
              <Route exact path="/checkout" component={checkout}/> 
            </Switch>
            </div>
          </Router>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
