import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//Redux
import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/userActions';

//MUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(4, 0, 2),
    },
  });

class signup extends Component {

    constructor(){
      super();
      this.state = {
        email: '',
        password: '',
        confirmPassword:'',
        userName:'',
        fullName:'',
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
      this.setState({
        loading: true
      });
      const newUserData = {
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        userName: this.state.userName,
        fullName: this.state.fullName,       
      }
     
      this.props.signupUser(newUserData, this.props.history );
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
            <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <div align="center">
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              </div>
              <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                      variant="outlined"
                      required
                      color="secondary"
                      fullWidth
                      id="fullName"
                      label="Full Name"
                      name="fullName"
                      helperText={errors.fullName}
                      error={errors.fullName ? true : false}
                      value={this.state.fullName}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      color="secondary"
                      fullWidth
                      id="userName"
                      label="User Name"
                      name="userName"
                      autoComplete="userName"
                      helperText={errors.userName}
                      error={errors.userName ? true : false}
                      value={this.state.userName}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      color="secondary"
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      helperText={errors.email}
                      error={errors.email ? true : false}
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      color="secondary"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      helperText={errors.password}
                      error={errors.password ? true : false}
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      color="secondary"
                      fullWidth
                      name="confirmPassword"
                      label="confirmPassword"
                      type="confirmPassword"
                      id="confirmPassword"
                      helperText={errors.confirmPassword}
                      error={errors.confirmPassword ? true : false}
                      value={this.state.confirmPassword}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                  {loading && (
                      <CircularProgress color="secondary" />
                    )}
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2" color="secondary">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Container>
        );
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps, {signupUser})(withStyles(styles)(signup));
