import React, { Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//Redux
import { connect } from 'react-redux';

//Components
import StoreTab from '../components/layout/StoreTab'

const styles = (theme) => ({

  avatar: {
    width: theme.spacing(24),
    height: theme.spacing(24),
    margin: theme.spacing(4)
  },
  button:{
    background: 'linear-gradient(45deg, #e91e63 10%, #FF8E53 90%)',
    borderRadius: 5,
    border: 0,
    color: 'white',
    height: 45,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    margin: theme.spacing(4,2,4,10),
  },
  header:{
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(10),
    paddingTop: theme.spacing(4),
  },
  content:{
    padding: theme.spacing(8)
  }
});

class mystore extends Component {
    
    handleImageChange = (event) => {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append('image', image);
      this.props.uploadImage(formData);
    };

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    handleLogout = () => {
      this.props.logoutUser();
    };

    render() {
      const { user:{ credentials: {userName} , loading, authenticated} } = this.props
      let mystoreMarkup = !loading? (authenticated? (
        <div>
            <StoreTab userName={userName}/>
          </div>
      ):(<p>Login or SignUp</p>)): (<p>loading...</p>)
      return mystoreMarkup;
    }
}

mystore.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}


const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(mystore))
