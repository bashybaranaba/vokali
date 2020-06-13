import React, { Component, Fragment} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//MUI
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';

//Icons
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import AddIcon from '@material-ui/icons/Add';

//redux
import { connect } from 'react-redux';
import { addNewProduct } from '../../redux/actions/dataActions'

const styles =  (theme) => ({
    root: {
          margin: theme.spacing(8),
    },
    textfield:{
      margin: theme.spacing(2),
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
    fab:{
      background: 'linear-gradient(45deg, #f50057 10%, #FF8E53 90%)',
      color: 'white',
      margin: theme.spacing(4),
    }
})

export class AddProduct extends Component {

    state = {
      open: false,
      title:'',
      price: '',
      description: '',
      errors: {}
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.UI.errors){
        this.setState({ errors : nextProps.UI.errors})
      }
    }

    handleOpen = () =>{
      this.setState({open: true});
    }

    handleClose = () =>{
      this.setState({open: false});
    }

    handleChange = (event) =>{
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
      event.preventDefault();
      
      const imageInput = this.refs.imageInput;
      const image = imageInput.files[0];
      const formData = new FormData();
      formData.append('image', image, image.name);
      formData.append('title', this.state.title);
      formData.append('price', this.state.price);
      formData.append('description', this.state.description);
      this.props.addNewProduct(formData,)
      this.handleClose();
    }

    render() {
        const { errors } = this.state;
        const { classes, UI:{ loading }} = this.props;
        return(
            <Fragment>
              <Tooltip title="Post Item" placement="top">
                <IconButton  onClick={this.handleOpen} color="inherit">
                  <AddIcon/>
                </IconButton>  
              </Tooltip>
            <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Add New Item</DialogTitle>
            <Container>
            <form className={classes.root}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
              <TextField className={classes.textfield}
                variant="outlined" 
                name="title" 
                type="text" 
                label="title"
                error={errors.body ? true: false}
                helperText={errors.body}
                value={this.state.title}
                onChange={this.handleChange}
              />
              </FormControl>
            </Grid>

            <Grid item xs={12} >
              <TextField className={classes.textfield}
                name="price"
                variant="outlined"
                required
                fullWidth
                label="Price"
                autoFocus
                InputProps={{
                  startAdornment: <InputAdornment position="start">Ksh</InputAdornment>,
                }}
                value={this.state.price}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField className={classes.textfield}
                variant="outlined"
                required
                fullWidth
                name="stock"
                label="Quantity in stock"
                onChange={this.handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField className={classes.textfield}
                variant="outlined"
                required
                fullWidth
                name="description"
                label="Description"
                multiline
                rows={3}
                value={this.state.description}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid>
              <input
                type="file"
                id="imageInput" 
                ref="imageInput" 
                hidden
              />
              <label htmlFor="imageInput">
                <Fab component="span" className={classes.fab}>
                  <AddPhotoAlternateIcon />
                </Fab>
              </label>
            </Grid>
            <Typography variant="caption">Image</Typography>
            </Grid>
          </form>
          </Container>
            <DialogActions>
              <Button onClick={this.handleClose} >Cancel</Button>
              <Button onClick={this.handleSubmit} className={classes.button} disabled={loading}>
                {loading && (
                    <CircularProgress color="secondary" />
                )}
                Add Item
              </Button>
            </DialogActions>
          </Dialog>
          </Fragment>
          )
    }
}

AddProduct.propTypes = {
  addNewProduct: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(mapStateToProps,{ addNewProduct })(withStyles(styles)(AddProduct))
