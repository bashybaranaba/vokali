import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

//icons
import DeleteOutline from "@material-ui/icons/DeleteOutline";

//redux
import { connect } from "react-redux";
import { deleteProduct } from "../../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%"
  }
};

class DeleteProduct extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteProduct = () => {
    this.props.deleteProduct(this.props.productId);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Delete item"
          onClick={this.handleOpen}
          ClassName={classes.deleteButton}
        >
          <DeleteOutline color="inherit" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this product?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.deleteProduct} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteProduct.propTypes = {
  deleteProduct: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  productId: PropTypes.string.isRequired
};

export default connect(
  null,
  { deleteProduct }
)(withStyles(styles)(DeleteProduct));