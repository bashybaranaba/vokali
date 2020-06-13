import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Redux stuff
import { connect } from 'react-redux';
import { orderItem } from "../../../redux/actions/dataActions";

//MUI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';

const styles =  (theme) => ({
    root: {
          margin: theme.spacing(8),
      },
    input: {
    display: "none"
    },
    button:{
        background: 'linear-gradient(45deg, #f50057 10%, #FF8E53 90%)',
        borderRadius: 5,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        margin: theme.spacing(3),
    },
    header:{
      padding: theme.spacing(10,10,0,14),
    },
    textfield:{
      margin: theme.spacing(2),
    },
    fab:{
      margin: theme.spacing(4),
    }
})

export class Order extends Component {
    state = {
        open: false,
        location: "",
        fullName: "",
        phoneNumber: "",
        emailAdress: "",
        orderNotes: "",
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ 
                location: "",
                fullName: "",
                phoneNumber: "",
                emailAdress: "",
                orderNotes: "",
        });
            
    }
    }

    handleOpen = () => {
        this.setState({open: true});
    }
    handleClose = () => {
        this.setState({open: false});
    }

    handleChange = event => {
        this.setState({ 
            [event.target.name]: event.target.value 
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const orderDetails ={
            location: this.state.location,
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            emailAdress: this.state.emailAdress,
            orderNotes: this.state.orderNotes,
        }
        this.props.orderItem(this.props.productId,orderDetails);
    };

    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <Button className={classes.button} onClick={this.handleOpen}>Order Item</Button>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                <Typography className={classes.header} variant="h5">Order Detais</Typography>
                <Container>
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid container spacing={2}>

                    <Grid item xs={12}>
                    <FormControl fullWidth>
                    <TextField className={classes.textfield}
                       variant="outlined"
                       required
                       fullWidth
                       name="location"
                       label="Location"
                       multiline
                       rows={3}
                       value={this.state.location}
                       onChange={this.handleChange}
                    />
                    </FormControl>
                    </Grid>
                    
                    <Grid item xs={12}>
                    <TextField className={classes.textfield}
                        variant="outlined"
                        required
                        fullWidth
                        name="fullName"
                        label="FullName"
                        multiline
                        rows={3}
                        value={this.state.fullName}
                        onChange={this.handleChange}
                    />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <TextField className={classes.textfield}
                        variant="outlined"
                        required
                        fullWidth
                        name="phoneNumber"
                        label="PhoneNumber"
                        multiline
                        rows={3}
                        value={this.state.phoneNumber}
                        onChange={this.handleChange}
                    />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <TextField className={classes.textfield}
                        variant="outlined"
                        required
                        fullWidth
                        name="emailAdress"
                        label="Email"
                        multiline
                        rows={3}
                        value={this.state.emailAdress}
                        onChange={this.handleChange}
                    />
                    </Grid>

                    <Grid item xs={12}>
                    <TextField className={classes.textfield}
                        variant="outlined"
                        required
                        fullWidth
                        name="orderNotes"
                        label="Notes"
                        multiline
                        rows={3}
                        value={this.state.orderNotes}
                        onChange={this.handleChange}
                    />
                    </Grid>
                    </Grid>

                    <br></br><br></br>
                    <Button className={classes.button} onClick={this.handleSubmit} >Place Oder</Button>
                    <br></br><br></br>
                </form>
                </Container>
                </Dialog>
            </Fragment>
        )
    }
}

Order.propTypes = {
    orderItem: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    productId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
  };
  
  const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
  });

export default connect(mapStateToProps,{ orderItem })(withStyles(styles)(Order))