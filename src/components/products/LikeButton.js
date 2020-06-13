import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// Redux
import { connect } from "react-redux";
import { likeProduct, unlikeProduct } from "../../redux/actions/dataActions";

export class LikeButton extends Component {
  likedProduct = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.productId === this.props.productId
      )
    )
      return true;
    else return false;
  };

  likeProduct = () => {
    this.props.likeProduct(this.props.productId);
  };

  unlikeProduct = () => {
    this.props.unlikeProduct(this.props.productId);
  };

  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder />
        </MyButton>
      </Link>
    ) : this.likedProduct() ? (
      <MyButton tip="Undo like" onClick={this.unlikeProduct}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeProduct}>
        <FavoriteBorder/>
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  productId: PropTypes.string.isRequired,
  likeProduct: PropTypes.func.isRequired,
  unlikeProduct: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeProduct,
  unlikeProduct
};

export default connect(mapStateToProps,mapActionsToProps)(LikeButton);