import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

//MUI
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import EditIcon from "@material-ui/icons/Edit";
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';


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
    },
    icon:{
      margin: theme.spacing(0,1,0,0),
    }
})

export class DeleteProduct extends Component {
    render() {
        const { classes } = this.props
        return (
            <div>
            <Card>
            <Typography className={classes.header} variant="h5">Edit Product</Typography>
            <Container>
            <form className={classes.root} noValidate autoComplete="off">
            <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
              <TextField className={classes.textfield}
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="ProductName"
                name="email"
                autoComplete="email"
              />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField className={classes.textfield}
                autoComplete="fname"
                name="Price"
                variant="outlined"
                required
                fullWidth
                id="Price"
                label="Price"
                autoFocus
                InputProps={{
                  startAdornment: <InputAdornment position="start">Ksh</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField className={classes.textfield}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Quantity in stock"
                name="stock"
                autoComplete="lname"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField className={classes.textfield}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Description"
                id="password"
                multiline
                rows={4}
              />
            </Grid>
              <Grid sm={6}  alignItems="center">
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={this.handleUploadClick}
                />
                <label htmlFor="contained-button-file">
                  <Fab className={classes.fab} component="span">
                    <AddPhotoAlternateIcon  />
                  </Fab>
                </label>
              </Grid>
            </Grid>
            <br></br><br></br>
          <Button className={classes.button}><EditIcon className={classes.icon} />Edit Product</Button>
          </form>
          </Container>
          </Card>
          </div>
        )
    }
}

export default withStyles(styles)(DeleteProduct);