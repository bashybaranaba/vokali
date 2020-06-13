import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

//MUI
import Button from "@material-ui/core/Button";

// Redux
import { connect } from "react-redux";
import { followUser, unfollowUser } from "../../redux/actions/dataActions";

const styles = theme => ({
    button:{
      background: 'linear-gradient(45deg, #e91e63 10%, #FF8E53 90%)',
      borderRadius: 5,
      border: 0,
      color: 'white',
      height: 45,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      margin: theme.spacing(-40,0,0,50),
    },
    
});

export class FollowButton extends Component {

  followedUser = () => {
    if (
      this.props.user.follows &&
      this.props.user.follows.find(
        follow => follow.following === this.props.userName   
      )
    )
      return true;
    else return false;
  };

  followUser = () => {
    const userName = this.props.userName;
    this.props.followUser(userName);
  };

  unfollowUser = () => {
    const userName = this.props.userName;
    this.props.unfollowUser(userName);
  };

  render() {
    const { authenticated } = this.props.user;
    const { classes } = this.props;
    const FollowButton = !authenticated ? (
      <Link to="/login">
        <Button className={classes.button}>
          Follow
        </Button>
      </Link>
    ) : this.followedUser() ? (
      <Button className={classes.button}onClick={this.unfollowUser}>
       Following
      </Button>
    ) : (
      <Button  className={classes.button} onClick={this.followUser}>
       Follow
      </Button>
    );
    return FollowButton;
  }
}

FollowButton.propTypes = {
  user: PropTypes.object.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  data: state.data
});

const mapActionsToProps = {
  followUser,
  unfollowUser
};

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(FollowButton));