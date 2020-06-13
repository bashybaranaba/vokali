import React from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//Redux
import { connect } from 'react-redux';

//Components
import ProductList from '../products/ProductList'
import OrderList from '../products/orders/OrderList'


//MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const styles = (theme) => ({
    root: {
      flexGrow: 1,
    },
    media: {
        height: 0,
        paddingTop: '35%', // 16:9
    },
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
  
const StoreTab = (props) => {
   
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { classes, userName, user:{ credentials: { bannerUrl}} }= props;

    return (
        <div>
        <Card>
        <CardMedia
                className={classes.media}
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
            <Tab label="My Posts" {...a11yProps(0)}/>
            <Tab label="Orders" {...a11yProps(1)}/>
        </Tabs>
        </Card>
        <TabPanel value={value} index={0}>
            <ProductList userName={userName}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <OrderList/>
        </TabPanel>
        </div>
    )

}

StoreTab.propTypes = {
    data:  PropTypes.object.isRequired,
    userName: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(StoreTab));