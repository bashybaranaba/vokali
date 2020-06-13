import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//Components
import ProductDetails from './ProductDetails'
import LikeButton from "./LikeButton";
import ReviewDialog from "./reviews/ReviewDialog"
import DeleteProduct from "./DeleteProduct";

//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

//Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
    
    card: {
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
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

class ProductCard extends Component {
    state = {
        open: false,
        oldPath: "",
        newPath: ""

    }

    componentDidMount() {
        const openDialog = this.props.openDialog
        if (openDialog) {
          this.handleOpen();
        }
    }

    handleOpen = () =>{
        let oldPath = window.location.pathname;

        const { product:{storeName, productId} } = this.props;
        const newPath = `/shopfront/${storeName}/item/${productId}`;

        if (oldPath === newPath) oldPath = `/shopfront/${storeName}`;

        window.history.pushState(null, null, newPath);

        this.setState({ open: true, oldPath, newPath });
        this.setState({open: true});
    }

    handleClose = () =>{
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({open: false});
    }
    render() {
        const { classes, product:{productId, title, imageUrl, storeName}, user:{  authenticated, credentials:{ userName }}} = this.props
        
        const deleteButton =
        authenticated && storeName === userName ? (
            <DeleteProduct productId={productId} />
        ) : null;

        return (
            <Grid item xs={12} sm={6} lg={4}>
                <Card className={classes.card}>
                    
                    <Fragment>
                        <CardActionArea onClick={this.handleOpen}>
                        <CardMedia
                        className={classes.media}
                        image={imageUrl}
                        title="Product Image"
                        />
                        </CardActionArea>
                        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="lg">
                        <DialogContent>
                            <ProductDetails productId={productId}/>
                        </DialogContent>
                        </Dialog>
                        </Fragment>  
                    <CardContent>
                        <Typography variant="button">{title}</Typography>

                        <div className={classes.buttons}>
                            <LikeButton productId={productId} />
                            <ReviewDialog productId={productId}/>
                            {deleteButton}
                        </div> 
                        
                    </CardContent>
                </Card>
            </Grid>         
        )
    }
}

ProductCard.propTypes = {
    user: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
  };
  
  const mapStateToProps = state => ({
    user: state.user
  });

export default connect(mapStateToProps)(withStyles(styles)(ProductCard));
