import React, { Fragment } from "react";

import PropTypes from "prop-types";
// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  
  card: {
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(4),
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25
  },
  media: {
    height: 0,
    paddingTop: '90.25%', // 16:9
    margin: theme.spacing(0)
  },
  cover: {
    minWidth: 200,
    objectFit: "cover"
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 7
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: "rgba(0,0,0, 0.3)",
    marginBottom: 10
  },
  fullLine: {
    height: 15,
    width: "90%",
    backgroundColor: "rgba(0,0,0, 0.6)",
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    width: "50%",
    backgroundColor: "rgba(0,0,0, 0.6)",
    marginBottom: 10
  }
});

const ProductSkeleton = props => {
  const { classes } = props;

  const content = Array.from({ length: 12 }).map((item,index) => (
    <Grid item xs={12} sm={6} lg={4}>
    <Card className={classes.card} key={index}>
      <div className={classes.media}/>
      <CardContent className={classes.cardContent}>
        <div className={classes.halfLine} />
        <div className={classes.date} />
      </CardContent>
    </Card>
    </Grid>
  ));

  return <Fragment>{content}</Fragment>;
};

ProductSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductSkeleton);