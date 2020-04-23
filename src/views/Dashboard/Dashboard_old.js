import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import RGL, { WidthProvider } from "react-grid-layout";
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import _ from "lodash";
import { Rnd } from 'react-rnd';
import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders,
  Xset2,
} from './components';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));


const Dashboard = () => {
  const classes = useStyles();
    // layout is an array of objects, see the demo for more complete usage
    
  const defaultProps = {
    className: "layout",
    items: 20,
    onLayoutChange: function() {},
    cols: 12
  }

  const generateLayout = ()=>{
    return _.map(new Array(defaultProps.items), function(item, i) {
      const y = _.result(defaultProps, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString()
      };
    });
  }

  const generateDOM = ()=> {
    return _.map(_.range(defaultProps.items), function(i) {
      console.log("Passing key: ", i);
      return (
          
          <Xset2 key={i} gridId={i} setId={"s2"}/>
        
      );
    });
  }

  const layout = generateLayout();
  const defaults = {
    display: 'flex',
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
    
  }
  const defaultsRnd = {
    
      x: 0,
      y: 0,
      
    
    
  }

  return (
      
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >


        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
          style= {{position: 'static'}}
        >
        
          {/* <Rnd default={defaultsRnd}> */}
          <Xset2 setId={"set1"} />
          {/* </Rnd> */}
          
        

        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
          style= {{position: 'static'}}
        >
        
          {/* <Rnd default={defaultsRnd}>
          <Xset2 setId={"set2"} />
          </Rnd>
           */}
        

        </Grid>

      </Grid>
    </div>
  );
};

export default Dashboard;
