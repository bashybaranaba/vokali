import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//Components
import MyButton from "../../util/MyButton";
import Order from "./orders/Order";
import Reveiws from "./reviews/Reviews";
import ReviewForm from "./reviews/ReviewForm";
import Orders from "./orders/Orders"

//MUI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';

//Icons
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

//Redux
import { connect } from 'react-redux';
import { getProduct } from '../../redux/actions/dataActions'


const styles =  (theme) => ({
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        marginRight: theme.spacing(3)
    },
    card: {
        margin: theme.spacing(6),
    },
    media: {
        height: 0,
        paddingTop: '96.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
      },
    cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(0),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    paper: {
        margin: theme.spacing(2),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    button:{
        background: 'linear-gradient(45deg, #f50057 10%, #FF8E53 90%)',
        borderRadius: 5,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        margin: theme.spacing(0),
    },
    grid:{
        margin: theme.spacing(6,6,0,6),
    },

    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
})


class ProductDetails extends Component {
    state = {
        open: false,
    }
    componentDidMount(){
        this.props.getProduct(this.props.productId);
    }
    handleOpen = () => {
        this.setState({open: true});
    }
    handleClose = () => {
        this.setState({open: false});
    }

    render() {
        const { classes, product:{productId, title, price, imageUrl, description, storeName, likeCount, reviewCount, reviews, orders}, UI:{loading}, user:{  authenticated, credentials:{ userName }}} = this.props
        const orderMarkup = 
        authenticated && storeName === userName ? (
           
            <Orders orders={orders} />
        ) : (<Order productId={productId} />);

        const detailsMarkup = loading? (
            <CircularProgress/>
        ):(
            <Container className={classes.cardGrid}  maxWidth="lg">
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={5}>
                    <Card className={classes.card}>
                    <CardMedia
                    className={classes.media}
                    image={imageUrl}
                    title="Product Image"
                    />
                    </Card>
                </Grid>
                <Grid className={classes.grid} item xs={12} sm={6} md={5}>
                    <Typography className="uppercase" variant ="h4">
                        {title}
                    </Typography >
                    <Typography variant ="h6" color="primary">
                        KSH {price}
                    </Typography>
                    
                    <div className={classes.controls}> 
                        <Grid container> 
                        <Grid item xs={12}sm={8}> 
                        <Typography variant ="overline"> Item By:</Typography >
                        <Typography
                            component={Link}
                            color="secondary"
                            variant="overline"
                            to={`/shopfront/${storeName}`}
                        >
                              {storeName  }
                        </Typography >
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography variant ="overline">
                            {likeCount}
                            {likeCount === 1 ? " like " : " likes "} 
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography variant ="overline">
                            {reviewCount}
                            {reviewCount === 1 ? " review " : " reviews "}
                            </Typography>
                        </Grid>
                        </Grid>
                    </div>
                    <hr></hr>
                    <br></br>
                    <Typography variant ='body2'>
                        {description}
                    </Typography>
                    <br></br>
                    { this.state.open? 
                        <MyButton tip="Hide Reviews" onClick={this.handleClose}>
                            <ExpandLessIcon/>
                        </MyButton>:
                        <MyButton tip="View Reviews" onClick={this.handleOpen}>
                            <ExpandMoreIcon/> 
                        </MyButton>
                    }
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <Reveiws reviews={reviews} />
                        <ReviewForm productId={productId} />
                    </Collapse>
                    <br></br><br></br>
                    {orderMarkup}
                    <br></br><br></br><br></br><br></br>
                   
                </Grid>
            </Grid> 
            </Container>
        )
        return detailsMarkup
    }
}

ProductDetails.propTypes = {
    getProduct: PropTypes.func.isRequired,
    productId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    userName: PropTypes.object,
    product: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
  }
  
  const mapStateToProps = (state) => ({
    user: state.user,
    product: state.data.product,
    UI: state.UI
  });
  
  export default connect(mapStateToProps,{ getProduct })(withStyles(styles)(ProductDetails))
