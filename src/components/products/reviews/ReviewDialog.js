import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from "prop-types";
import MyButton from "../../../util/MyButton";

//Components
import ReviewForm from "./ReviewForm";

//MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//Icons
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

//Redux
import { connect } from "react-redux";

const styles =  (theme) => ({
    root: {
        margin: theme.spacing(8),
    },
})
class ReviewDialog extends Component {
    state={
        open:false
    }
    handleOpen = () =>{
        this.setState({open: true});
      }
  
    handleClose = () =>{
        this.setState({open: false});
    }

    render() {
        
        return (
            <Fragment>
                <MyButton tip="review"  onClick={this.handleOpen}>
                    <ChatBubbleOutlineIcon />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Review Post</DialogTitle>
                <DialogContent>
                    <ReviewForm productId={this.props.productId} />
                </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ReviewDialog.propTypes = {
    productId: PropTypes.string.isRequired,
    product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    product: state.data.product,
});

export default connect(mapStateToProps)(withStyles(styles)(ReviewDialog))
