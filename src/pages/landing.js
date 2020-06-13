import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
    
    typography: {
        fontFamily: 'marion',
    },
    button:{
        background: 'linear-gradient(45deg, #e91e63 10%, #FF8E53 90%)',
        borderRadius: 5,
        border: 0,
        color: 'white',
        height: 45,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        margin: theme.spacing(2),
    },
    img:{
        height:400,
        margin:0
    }
})

export class landing extends Component {
    render() {
        const {classes} = this.props 
        return (
            <div  align='center'>
                
                <img className={classes.img} src="vokali-1.png" alt="img"/>
                <Typography className={classes.typography} variant="h3"> Showcase and sell your craft </Typography>
                <Typography   variant="subtitle1"> Share photos of your art, get reviews, earn. </Typography>
                <br></br>
                <Button className={classes.button}  component={Link} to="/signup">Get Started</Button>
        
            </div>
        )
    }
}

landing.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(landing)
