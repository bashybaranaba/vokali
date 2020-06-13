import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//MUI
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';

//Icons
import EditIcon from '@material-ui/icons/Edit';

//redux
import { connect } from 'react-redux';
import { editUserDetails, uploadImage,uploadBanner } from '../../redux/actions/userActions'

const styles = (theme) => ({
  root: {
    margin: theme.spacing(8),
  },
  textfield:{
    margin: theme.spacing(2),
  },
  input: {
    display: "none"
  },
  button:{
    background: 'linear-gradient(45deg, #f50057 10%, #FF8E53 90%)',
    borderRadius: 5,
    border: 0,
    color: 'white',
    height: 40,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    margin: theme.spacing(3),
  },
  fab:{
    background: 'linear-gradient(45deg, #f50057 10%, #FF8E53 90%)',
    color:'white',
    radius: 5,
    marginTop:theme.spacing(-44),
    marginLeft:theme.spacing(34),
  },
  avatar: {
    width: theme.spacing(24),
    height: theme.spacing(24),
    margin: theme.spacing(4)
  },
  header:{
    padding: theme.spacing(10,10,0,14),
  },
  images:{
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(10),
    paddingTop: theme.spacing(4),
  },
})

class EditDetails extends Component {
    state = {
        bio: '',
        telephone:'',
        email:'',
        website:'',
        location:'',
        open: false
    }

    mapUserDetailsToState = (credentials) => {
        this.setState({
            imageUrl: credentials.imageUrl ? credentials.imageUrl: '',
            bannerUrl: credentials.bannerUrl ? credentials.bannerUrl: '',
            bio: credentials.bio ? credentials.bio: '',
            telephone: credentials.telephone ? credentials.telephone: '',
            email: credentials.email ? credentials.email: '',
            website: credentials.website ? credentials.website: '',
            location: credentials.location ? credentials.location: '',
        })
    }

    handleOpen = () =>{
        this.setState({open: true});
        this.mapUserDetailsToState(this.props.credentials)
    }

    handleClose = () =>{
        this.setState({open: false});
    }
    

    componentDidMount(){
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials)
    }

    handleBannerChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        this.props.uploadBanner(formData);
    };

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        this.props.uploadImage(formData);
    };

    handleChange = (event) =>{
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    handleSubmit = () => {
        const userDetails ={
            imageUrl: this.state.imageUrl,
            bio: this.state.bio,
            telephone: this.state.telephone,
            email: this.state.email,
            website: this.state.website,
            location: this.state.location,
        }
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {
        const {classes} = this.props
        return (
            <Fragment>
                <Tooltip title="Edit profile" placement="top">
                    <Fab className={classes.fab} onClick={this.handleOpen}>
                        <EditIcon/>
                    </Fab>
                </Tooltip>

                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Edit Your Details</DialogTitle>
                    <DialogContent>
                        <div align="center" className={classes.images}>
                        
                        <div>
                            <Avatar className={classes.avatar} alt="Remy Sharp" src={this.state.bannerUrl} />  
                            <input type="file" id="bannerInput" hidden onChange={this.handleBannerChange}/>
                        </div>
                        <label htmlFor="bannerInput">
                            <IconButton component="span">
                                <EditIcon/>
                            </IconButton>
                        </label>

                        <div>
                            <Avatar className={classes.avatar} alt="Remy Sharp" src={this.state.imageUrl} />  
                            <input type="file" id="imageInput" hidden onChange={this.handleImageChange}/>
                        </div>
                        <label htmlFor="imageInput">
                            <IconButton component="span">
                                <EditIcon/>
                            </IconButton>
                        </label>    
                        </div>
                
                        <form>
                            <TextField className={classes.textfield} variant="outlined" name="bio" type="text" label="Bio" multiline rows="3" placeholder="A short Description" value={this.state.bio} onChange={this.handleChange} fullWidth/>
                            <TextField className={classes.textfield} variant="outlined" name="telephone" type="text" label="telephone"  placeholder="Your phone Number" value={this.state.telephone} onChange={this.handleChange} fullWidth/>
                            <TextField className={classes.textfield} variant="outlined" name="email" type="text" label="email"  placeholder="Your phone email" value={this.state.email} onChange={this.handleChange} fullWidth/>
                            <TextField className={classes.textfield} variant="outlined" name="website" type="text" label="website"  placeholder="Your professional Website" value={this.state.website} onChange={this.handleChange} fullWidth/>
                            <TextField className={classes.textfield} variant="outlined" name="location" type="text" label="Location"  placeholder="Your location" value={this.state.location} onChange={this.handleChange} fullWidth/>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} >Cancel</Button>
                        <Button onClick={this.handleSubmit} className={classes.button}>Save</Button>
                    </DialogActions>
                </Dialog>

            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    uploadBanner: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
  });
  
export default connect(mapStateToProps,{ editUserDetails, uploadImage, uploadBanner })(withStyles(styles)(EditDetails))
  
