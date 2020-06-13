import React from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//Components
import AddProduct from '../products/AddProduct';
import Notifications from './Notifications'

//Material UI
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import { fade } from '@material-ui/core/styles';

//Icons
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import StorefrontIcon from '@material-ui/icons/Storefront';

// Redux
import { connect } from "react-redux";

const styles = (theme) => ({
    grow: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
      logo: {
        maxWidth: 100,
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.10),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginRight: theme.spacing(2),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(2, 12, 2, 10),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
      sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
      },
      sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      },
  });
  
const Navbar = (props) => { 
   

        const {classes} = props
        const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const handleMobileMenuClose = () => {
            setMobileMoreAnchorEl(null);
        }

        const handleMobileMenuOpen = (event) => {
            setMobileMoreAnchorEl(event.currentTarget);
        };

        const menuId = 'primary-search-account-menu';

        const mobileMenuId = 'primary-search-account-menu-mobile';
        const renderMobileMenu = (
            <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            >
            <MenuItem >
                <AddProduct/>
                <p>Add product</p>
            </MenuItem>
            <MenuItem>
               <Notifications/>
               <p>Notifications</p>
            </MenuItem>
            <MenuItem component={Link} to="/mystore">
                <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                >
                <StorefrontIcon/>
                </IconButton>
                <p>My store</p>
            </MenuItem>
            <MenuItem component={Link} to="/myprofile">
                <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                >
                <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            </Menu>
        );  
        const {authenticated} = props; 
        const { loading } = props.data;
        return (
            <div className={classes.grow}> 
            <AppBar>
            { authenticated? ( loading? null :(
                <Toolbar>
                <Toolbar>
                  <img src="https://firebasestorage.googleapis.com/v0/b/vokali-5a518.appspot.com/o/logo.png?alt=media&token=c3e2db45-6b9d-4abb-aac4-d22ab875077c" alt="logo" className={classes.logo} />
                </Toolbar>
                <div className={classes.grow} />
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase
                    placeholder="Search"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <IconButton color="inherit"  component={Link} to="/" aria-label="menu">
                  <HomeIcon />
                </IconButton>
                
                <div className={classes.sectionDesktop}>
                    <AddProduct/>
                    
                    <Notifications/>
                    <Tooltip title="My store" placement="top">
                      <IconButton
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      component={Link} to="/mystore"
                      color="inherit"
                      >
                      <StorefrontIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Profile" placement="top">
                      <IconButton
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      component={Link} to="/myprofile"
                      color="inherit"
                      >
                      <AccountCircle />
                      </IconButton>
                    </Tooltip>
                </div>
                <div className={classes.sectionMobile}>
                    <IconButton
                    aria-label="show more"
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                    >
                    <MoreIcon />
                    </IconButton>
                </div>
                </Toolbar>
           )): (
              <Toolbar>
              <Toolbar>
                <img src="https://firebasestorage.googleapis.com/v0/b/vokali-5a518.appspot.com/o/logo.png?alt=media&token=c3e2db45-6b9d-4abb-aac4-d22ab875077c" alt="logo" className={classes.logo} />
              </Toolbar>
              <div className={classes.grow} />
              <Button color="inherit" component={Link} to="/">
                Explore
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              </Toolbar>
            ) }
           </AppBar>
      {renderMobileMenu}
    </div>
    )
}

Navbar.propTypes = {
  classes:PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  data:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  data: state.data
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));