import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";

// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  },
  form: {
    textAlign: "center"
  },
  image: {
    margin: "20px auto 20px auto"
  },
  pageTitle: {
    margin: "10px auto 10px auto"
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  button: {
    marginTop: 20,
    position: "relative"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  },
  progress: {
    position: "absolute"
  },
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: 20
  },
  paper: {
    padding: 20
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: "#00bcd4"
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin:theme.spacing(1),
  },
  reviewData: {
    marginLeft:2
  }
});

class Reviews extends Component {
  render() {
    const { reviews, classes } = this.props;
    return (
      <Grid container>
        {reviews && reviews.map((review, index) => {
          const { body, createdAt, userImage, storeName} = review;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                  <Avatar className={classes.avatar} alt="avatar" src={userImage}/> 
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.reviewData}>
                      <Typography
                        variant="overline"
                        component={Link}
                        to={`/shopfront/${storeName}`}
                        color="secondary"
                      >
                        {storeName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                     
                      <Typography variant="body2">{body}</Typography>
                      <br></br>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== reviews.length - 1 && (
                <br></br>
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Reviews.propTypes = {
  reviews: PropTypes.array.isRequired
};

export default withStyles(styles)(Reviews);