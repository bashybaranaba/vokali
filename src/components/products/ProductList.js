import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';


//Components
import ProductCard from './ProductCard'
import ProductSkeleton from '../../util/ProductSkeleton';

//Redux
import { connect } from 'react-redux';
import { getShopData } from '../../redux/actions/dataActions';

//MUI
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const styles = (theme) => ({

    media: {
        height: 0,
        paddingTop: '35%', // 16:9
    },
    cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    },
})


class ProductList extends Component {
    
    componentDidMount(){
        const userName = this.props.userName;

        this.props.getShopData(userName);
     }
    render() {
        const { products, loading} = this.props.data
        const { classes, productIdParam } = this.props;
        const productsMarkup = loading? (
            <ProductSkeleton/>
        ): products === null? (
            <p>No items Uploaded yet</p>
        ): !productIdParam ?(
            products && products.map(product => (<ProductCard key={product.productId} product={product}/>))
        ):(
            products && products.map(product => {
                if (product.productId !== productIdParam)
                  return <ProductCard key={product.productId} product={product} />;
                else
                  return (
                    <ProductCard key={product.productId} product={product} openDialog/>
                )
                }
        ))
        return (
            <div>
                <Container className={classes.cardGrid} maxWidth="lg">
                <Grid container spacing={1}>
                    {productsMarkup}
                </Grid>
                </Container>
            </div>
        )
    }
}

ProductList.propTypes = {
    getShopData: PropTypes.func.isRequired,
    data:  PropTypes.object.isRequired,
    userName: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps,{ getShopData })(withStyles(styles)(ProductList));