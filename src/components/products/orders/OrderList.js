import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// Icons
import ListAltIcon from "@material-ui/icons/ListAlt";
// Redux
import { connect } from "react-redux";
import { markNotificationsRead } from "../../../redux/actions/userActions";

const styles = (theme) => ({
    
  card: {
      margin: theme.spacing(4),
  },
  media: {
      height: 0,
      paddingTop: '90.25%', // 16:9
      margin: theme.spacing(0)
  },
  cardContent: {
      flexGrow: 1,
  },
  buttons: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0),
    },
})

class OrderList extends Component {
  state = {
    anchorEl: null
  };


  onMenuOpened = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter(not => !not.read)
      .map(not => not.notificationId);
    this.props.markNotificationsRead(unreadNotificationsIds);
  };

  render() {
    const {classes} = this.props;
    const notifications = this.props.notifications;

    dayjs.extend(relativeTime);

    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map(not => {
          const verb = not.type === "order" ? "ordered" : null;
          const time = dayjs(not.createdAt).fromNow();
          const iconColor = not.read ? "inherit" : "secondary";
          const icon =
            not.type === "order" ? (
              <ListAltIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : null ;
          const markUp =  not.type === "order" ? (
            <div key={not.createdAt} >
              <Card className={classes.card}>
                <CardContent>
                  {icon}
                  <Typography
                    component={Link}
                    color="default"
                    variant="body1"
                    to={`/shopfront/${not.recipient}/item/${not.productId}`}
                  >
                    {not.sender} {verb} one of your items {time}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ):null;
    
    
          return (
            <div>
              {markUp}
            </div>
          );
        })
      ) : (
        <div onClick={this.handleClose}>
          You have no notifications yet
        </div>
      );
    return (
      <Fragment>
       {notificationsMarkup}
      </Fragment>
    );
  }
}

OrderList.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  notifications: state.user.notifications
});

export default connect(
  mapStateToProps,
  { markNotificationsRead }
)(withStyles(styles)(OrderList));;