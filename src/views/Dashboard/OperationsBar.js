import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountTree from '@material-ui/icons/AccountTree';
import SaveIcon from '@material-ui/icons/Save';
import Explore from '@material-ui/icons/Explore';
import Transform from '@material-ui/icons/Transform';
import FilterList from '@material-ui/icons/FilterList';
import GroupWork from '@material-ui/icons/GroupWork';
import Sort from '@material-ui/icons/Sort';
import PivotDialog from 'views/Pivot/Pivot';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  
  operationButton: {
    marginLeft: theme.spacing(1)
  },
  inputRoot: {
    color: 'inherit',
  },
  title: {
    fontWeight: 700,
    color: '#fff'
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const OperationsBar = props => {
  const { className, onSave, onSidebarOpen, ...rest } = props;
  const [pivotOpen, setPivotOpen] = useState(false);

  const classes = useStyles();

  const [notifications] = useState([]);
  
  const handlePivotClick = ()=>{
    
    console.log("Pivot clicked!");
    setPivotOpen(true);
  }

  return (
      
      <Toolbar>
        <div className={classes.flexGrow} />
        <IconButton color="inherit" title="Save">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
              onClick={onSave}
              
            >
              <SaveIcon />
            </Badge>
        </IconButton>

        <PivotDialog open={pivotOpen} setOpen={setPivotOpen}/>
        {/* <Hidden mdDown> */}
        <IconButton color="inherit" title="Derref URL in search box">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <AccountTree />
            </Badge>
        </IconButton>

        <IconButton
            className={classes.operationButton}
            color="inherit"
            title="Refines the selected set using filters"
          >
            <FilterList />
          </IconButton>
          <IconButton
            className={classes.operationButton}
            color="inherit"
            title="Sorts the selected set"
          >
            <Sort />
          </IconButton>
          <IconButton
            className={classes.operationButton}
            color="inherit"
            title="Groups the items of the selected set using a grouping function"
          >
            <GroupWork />
          </IconButton>


          <IconButton
            className={classes.operationButton}
            color="inherit"
            onClick={handlePivotClick}
            title="Navigates to a related set of items"
          >
            <Explore />
          </IconButton>

          <IconButton
            className={classes.operationButton}
            color="inherit"
            title="Map the items of a set onto another set of items by applying transformation functions"
          >
            <Transform />
          </IconButton>
          <IconButton
            className={classes.operationButton}
            color="inherit"
            title="Difference of the selected sets"
          >
            -
          </IconButton>

          <IconButton
            className={classes.operationButton}
            color="inherit"
            title="Union of the selected sets"
          >
            &cup;
          </IconButton>


          <IconButton
            className={classes.operationButton}
            color="inherit"
            title="Intersection of the selected sets"
          >
            &cap;
          </IconButton>

        {/* </Hidden> */}
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>

  );
};

OperationsBar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default OperationsBar;
