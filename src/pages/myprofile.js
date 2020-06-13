import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage, uploadBanner } from '../redux/actions/userActions';

//Components
import EditDetails from '../components/profile/EditDetails.js';

//MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone'; 
import LanguageIcon from '@material-ui/icons/Language';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const styles = (theme) => ({

  media: {
      height: 0,
      paddingTop: '35%', // 16:9
  },
  avatar: {
    width: theme.spacing(36),
    height: theme.spacing(36),
    marginTop: theme.spacing(-24),
    marginBotton: theme.spacing(20)
  },
  button:{
    background: 'linear-gradient(45deg, #e91e63 10%, #FF8E53 90%)',
    borderRadius: 5,
    border: 0,
    color: 'white',
    height: 15,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    margin: theme.spacing(4,2,4,10),
  },
  profile:{
    padding: theme.spacing(2)
  },
  username:{
    padding: theme.spacing(4,0,0,0),
  },
  content:{
    padding: theme.spacing(8)
  }
})

class myprofile extends Component {
    handleImageChange = (event) => {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append('image', image);
      this.props.uploadImage(formData);
    };

    handleBannerChange = (event) => {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append('image', image);
      this.props.uploadBanner(formData);
    };

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    handleLogout = () => {
      this.props.logoutUser();
    };

    render() {
      const { classes, user:{ credentials: {userName, bannerUrl,imageUrl, bio, telephone, email, website, location} , loading, authenticated} } = this.props
      let profileMarkup = !loading? (authenticated? (
        <Card>
            <CardMedia
              className={classes.media}
              image={bannerUrl}
              title="Banner"
              />
              <input type="file" hidden="hidden" id="BannerInput"  onChange={this.handleBannerChange}/>
              <div className={classes.profile} align='center'>
                <Avatar className={classes.avatar} alt="Remy Sharp" src={imageUrl}/>  
                
                <EditDetails/>
                <Grid sm={6}>
                <div className={classes.username}>
                 <Typography variant="h4">{userName}</Typography>
                </div>
                
                <div>
                {location && (
                  <Fragment>
                    <Typography variant="overline">{location}
                    </Typography>
                  </Fragment>
                )}
                </div>

                {/*{followerCount && (
                  <Fragment>
                    <Typography variant="overline">{followerCount} 
                    {followerCount === 1 ? " Follower " : " Followers "}
                    </Typography>
                  </Fragment>
                )}
                */}
                
                <br></br><br></br>
                <hr></hr>
               <br></br>
                {bio && (
                  <Fragment>
                    <Typography variant="body2">{bio}
                    </Typography>
                  </Fragment>
                )}
                <br></br><br></br><br></br>

                <Typography variant="overline">
                  contact info:
                </Typography>
                <br></br><br></br>
                <Grid container>
                  <Grid sm={4}>
                    {telephone && (
                      <Fragment>
                        <PhoneIcon/>
                    <Typography variant="body2">{' '}{telephone}
                        </Typography>
                      </Fragment>
                    )}
                  </Grid>
                  <Grid sm={4}>
                    {email && (
                      <Fragment>
                        <MailOutlineIcon/>
                    <Typography variant="body2">{' '}{email}
                        </Typography>
                      </Fragment>
                    )}
                  </Grid>
                  <Grid sm={4}>
                    {website && (
                      <Fragment>
                        <LanguageIcon/>
                        <Typography>
                        <a href={website}>
                        {website}
                        </a>
                        </Typography>
                      </Fragment>
                    )}
                  </Grid>
                </Grid>

                </Grid>
                <br></br><br></br>
              </div>
          </Card>
      ):(<p>Login or SignUp</p>)): (<p>loading...</p>)
      return profileMarkup;
    }
}

myprofile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  uploadBanner: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

const mapActionToProps = {logoutUser, uploadImage, uploadBanner};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(myprofile))
