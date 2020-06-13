import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//Components
import ProductCard from '../components/products/ProductCard'


//Redux
import { connect } from 'react-redux';
import { getProducts } from '../redux/actions/dataActions';

//MUI
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ProductSkeleton from '../util/ProductSkeleton';

const styles = (theme) => ({
    cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  typography: {
    useNextVariants: true,
  },
})

class home extends Component {

    componentDidMount(){
       this.props.getProducts();
    }

    render() {
        const { products, loading } = this.props.data
        let recentProductMarkup = !loading ?(
            products && products.map(product => (<ProductCard key={product.productId} product={product}/>))
            ):
               <ProductSkeleton/>
            ;
        const {classes} = this.props
        return (
            <div>
                <Container className={classes.cardGrid} maxWidth="lg">
                <Grid container spacing={1}>
                    {recentProductMarkup}
                </Grid>
                </Container>
            </div>
        )
    }
}

home.propTypes = {
    getProducts: PropTypes.func.isRequired,
    data:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps,{ getProducts })(withStyles(styles)(home))
