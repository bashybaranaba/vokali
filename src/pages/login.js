import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//Redux
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions';

// MUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
       
        <Link color="inherit" href="https://material-ui.com/">
          vokali.co.ke
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const styles = (theme) => ({
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(5),
    },
    submit: {
      margin: theme.spacing(4, 0, 2),
    },
  });


class login extends Component {

    constructor(){
      super();
      this.state = {
        email: '',
        password: '',
        errors:{}
      }
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.UI.errors){
        this.setState({ errors : nextProps.UI.errors})
      }
    }

    handleSubmit = (event) => {
      event.preventDefault();
      const userData = {
        email: this.state.email,
        password: this.state.password,
      };
      this.props.loginUser(userData, this.props.history);
    }

    handleChange = (event) =>{
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    render() {
        const { classes, UI:{ loading }} = this.props
        const { errors } = this.state
        return (
            <Grid container component="main" className={classes.root}>
          
            <Grid item sm/>
            <Grid item sm >
              <div className={classes.paper}>
                <div align="center">
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                </div>
                <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    color="secondary"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    helperText={errors.email}
                    error={errors.email ? true : false}
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    color="secondary"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    helperText={errors.password}
                    error={errors.password ? true : false}
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  {errors.general && (
                    <Typography variant="body2">
                      {errors.general}
                    </Typography>
                  )}
                  <FormControlLabel
                    control={<Checkbox value="remember" color="secondary"/>}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={loading}
                  >
                    Sign In
                    {loading && (
                      <CircularProgress color="secondary" />
                    )}
                  </Button>
                  
                  <Grid container>
                    
                    <Grid item>
                      <Link href="/signup" variant="body2" color="secondary">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Box mt={5}>
                    <Copyright />
                  </Box>
                </form>
              </div>
            </Grid>
            <Grid item sm/>
          </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
