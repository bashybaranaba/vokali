import React, { Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

//Components
import ProductList from '../products/ProductList'

// MUI
import Avatar from '@material-ui/core/Avatar';
import Card from "@material-ui/core/Card";
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Icons
import PhoneIcon from '@material-ui/icons/Phone'; 
import LanguageIcon from '@material-ui/icons/Language';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const styles = theme => ({
    cardMedia: {
        height: 0,
        paddingTop: '35%', // 16:9
    },
    cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    },
    media: {
      height: 0,
      paddingTop: '35%', // 16:9
    },
    avatar: {
      width: theme.spacing(36),
      height: theme.spacing(36),
      marginTop: theme.spacing(6),
      marginBotton: theme.spacing(20)
    },
    button:{
      background: 'linear-gradient(45deg, #e91e63 10%, #FF8E53 90%)',
      borderRadius: 5,
      border: 0,
      color: 'white',
      height: 15,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      margin: theme.spacing(4,2,4,10),
    },
    profile:{
      padding: theme.spacing(2)
    },
    username:{
      padding: theme.spacing(4,0,0,0),
    },
    content:{
      padding: theme.spacing(8)
    }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const StaticProfile = (props) => {
  const {
    classes, productIdParam,
    profile: { userName, bannerUrl, imageUrl, bio, website, location, telephone, email }
  } = props;

  const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  return (
    <div>
    <Card>
        <CardMedia
        className={classes.cardMedia}
        image={bannerUrl}
        title="Banner"
        />
        <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            <Tab label="Posts" {...a11yProps(0)}/>
            <Tab label="Profile" {...a11yProps(1)}/>
        </Tabs>
    </Card>
    <TabPanel value={value} index={0}>
          <ProductList userName={userName} productIdParam={productIdParam}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.profile} align='center'>
            <Avatar className={classes.avatar} alt="Remy Sharp" src={imageUrl}/>  
            {/*<FollowButton userName={userName}/>*/}
            <Grid item sm={6}>
            <div className={classes.username}>
                <Typography variant="h4">{userName}</Typography>
            </div>
            <div>
            {location && (
                <Fragment>
                <Typography variant="overline">{location}
                </Typography>
                </Fragment>
            )}
            </div>

            {/*{followerCount && (
                <Fragment>
                <Typography variant="overline">{followerCount} 
                {followerCount === 1 ? " Follower " : " Followers "}
                </Typography>
                </Fragment>
            )}
            */}
            
            <br></br><br></br>
            <hr></hr>
            <br></br>
            {bio && (
                <Fragment>
                <Typography variant="body2">{bio}
                </Typography>
                </Fragment>
            )}
            <br></br><br></br><br></br>

            <Typography variant="overline">
                contact info:
            </Typography>
            <br></br><br></br>
            <Grid container>
                <Grid item sm={4}>
                {telephone && (
                    <Fragment>
                    <PhoneIcon/>
                <Typography variant="body2">{' '}{telephone}
                    </Typography>
                    </Fragment>
                )}
                </Grid>
                <Grid item sm={4}>
                {email && (
                    <Fragment>
                    <MailOutlineIcon/>
                <Typography variant="body2">{' '}{email}
                    </Typography>
                    </Fragment>
                )}
                </Grid>
                <Grid item sm={4}>
                {website && (
                    <Fragment>
                    <LanguageIcon/>
                    <Typography>
                    <a href={website}>
                    {website}
                    </a>
                    </Typography>
                    </Fragment>
                )}
                </Grid>
            </Grid>

            </Grid>
            <br></br><br></br>
            </div>
      </TabPanel>
    </div>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  productIdParam: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StaticProfile);