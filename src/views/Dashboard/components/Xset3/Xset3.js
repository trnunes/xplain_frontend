import React, { useState, useContext, useEffect } from 'react';
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { loadSet, loadChildren, filterSetByKeyword } from '../../../../services/api';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import GraphIcon from '../../../../icons/Graph';
import SetContext from './context';
import cloneDeep from 'lodash/cloneDeep';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  Typography,
  IconButton,
  Checkbox,
} from '@material-ui/core';


import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import Folder from '@material-ui/icons/Folder'
import { SearchInput } from 'components';


const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  image: {
    height: 48,
    width: 48
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const menuOptions = {
  'general': [
    'Select',
    'Select Branch',
    'Delete',
  ],
  "Xplain::Type": [
    'Items of this type',
    'Applied Relations',
    'Related Types',
  ],

  "Xplain::Entity": [
    'Incoming Connections',
    'Outcoming Connections',
  ],

  "Xplain::SchemaRelation": [
    'Subjects',
    'Objects'
  ],

  "Xplain::PathRelation": [
    'Single Relations',
  ],

  "Xplain::Literal": [
    'Associated Entities',
  ],

  "Xplain::Session: ": [
    'TODO',
  ],

  "Xplain::ResultSet": [
    'TODO',
  ]
}



const ITEM_HEIGHT = 48;

const ActionsMenu = ({ itemType }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const buildMenu = () => {

    return menuOptions['general'].concat(menuOptions[itemType]);

  }

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {buildMenu().map((option) => (
          <MenuItem key={option} selected={option === 'Select'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

const CustomTreeItem = (props) => {
  const classes = useTreeItemStyles();

  const { set, xitem, labelInfo, color, bgColor, ...other } = props;
  // const [xitem, setXitem] = useState(props.xitem);
  const {addChildrenCheck} = useContext(SetContext);
  
  
  
  const [childNodes, setChildNodes] = useState(null);
  const [expanded, setExpanded] = useState([]);
  
  const ItemIcons = {
    "Xplain::SchemaRelation": <GraphIcon color="inherit" className={classes.labelIcon} viewBox="0 0 485 485" />,
    "Xplain::PathRelation": <GraphIcon color="inherit" className={classes.labelIcon} viewBox="0 0 485 485" />,
    "Xplain::Entity": <Folder className={classes.labelIcon} />,
    "Xplain::Session": <Folder className={classes.labelIcon} />,
    "Xplain::ResultSet": <Folder className={classes.labelIcon} />,
  }

  function fetchChildNodes(id) {
    console.log("Fetch child of ", id);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          children: loadChildren(set.id, id)
          // children:[]
        });
      }, 1);
    });
  }

  const handleCheck = (event, checked)=>{
    // xitem.checked = checked;
    // debugger;
    // xitem.children.forEach(child=>child.checked=checked);
    // setXitem(xitem);
  }

  const handleChange = (event, nodes) => {
    const expandingNodes = nodes.filter(x => !expanded.includes(x));
    setExpanded(nodes);
    if (expandingNodes[0]) {
      const childId = expandingNodes[0];
      if (!childNodes){
        fetchChildNodes(childId).then(result =>{
          addChildrenCheck(xitem, result.children, xitem.checked);
          
          setChildNodes(
            xitem.children.map(child => {                           
              console.log("Adding Child: ", xitem, "=>", child);
              return <CustomTreeItem set={set} key={child.node} xitem={child} />
            })
          );
        });  
      }
    }
  };
  

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      onNodeToggle={handleChange}
      disableSelection={true}
    >
      <TreeItem
        key={xitem.node}
        xitem={xitem}

        nodeId={xitem.node}

        label={
          <div className={classes.labelRoot}>
            <Checkbox
              id={`checkbox-${xitem.node}`}              
              onChange={(event, checked) => 
                handleCheck(event, checked)
              }
              color="primary"
              checked = {xitem.checked}
            />
            {ItemIcons[xitem.type]}
            <Typography variant="body2" className={classes.labelText}>
              {xitem.text}
            </Typography>
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
            <ActionsMenu itemType={xitem.type} />
          </div>
        }

        style={{
          '--tree-view-color': color,
          '--tree-view-bg-color': bgColor,
        }}

        classes={{
          root: classes.root,
          content: classes.content,
          expanded: classes.expanded,
          selected: classes.selected,
          group: classes.group,
          label: classes.label,
        }}

        {...other}
      >
        {childNodes || [<div key="stub" />]}
      </TreeItem>


    </TreeView>
  );
}


const Xset2 = props => {

  const { gridId, setId, className, ...rest } = props;  
  const classes = useStyles();
  const [xset, setXset] = useState(loadSet(setId));
  useEffect(()=>{
    if (!('checked' in xset)){

      setXset(prevSet=>({...prevSet, checked: false}));
      debugger;
    }
  }, []);
  
  
  function handleSearchInputChange(event) {
    if (event.target.value.length === 0) {
      setXset(loadSet(setId));
    }

    if (event.target.value.length > 3) {
      
      debugger;  
      setXset(prevState=>({...xset, children:[]}));
      // setXset(prevSet=>({
      //   ...prevSet,
      //     text: "Updated",
      //     children: filterSetByKeyword(setId, event.target.value),
      //   })
      // );     
    }
  }


  // const handleCheck = (event, checked, xitemCheck) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   xitemCheck.isChecked = event.target.checked;
  //   Object.keys(xitemCheck.children).forEach(childKey=>xitemCheck.children[childKey].isChecked = checked);
  //   setChildrenChecks(childrenChecks);
  //   debugger;
  // }

  function search(rootItem, itemId){
    if (rootItem.node === itemId){
      return rootItem;
    }
    let result = null;
    rootItem.children.every(child=>{
      result = search(child, itemId);
      return !result;
    });
    debugger;
    return result;
  }

  const addChildrenCheck = (parent, children, isChecked, setParent) => {
    if ((JSON.stringify(parent.children) != JSON.stringify(children)) && (parent.checked == isChecked)){
      return parent;
    }
    let updatedXset = cloneDeep(xset);
    
    let parentToUpdate = search(updatedXset, parent.node);
    debugger;
    parentToUpdate.children = children.map(child=>{
        child.checked=parent.checked;
        return child;
      });

    setXset(updatedXset);
    return updatedXset;
  }

  // addChildrenCheck(null, xset.node, false);

  return (
    
    <SetContext.Provider value={{addChildrenCheck}}>

      <Card
        {...rest}
        key={gridId}
        className={clsx(classes.root, className)}
      >
        <CardHeader
          subtitle={`${xset.total} in total`}
          title={xset.text}

          action={

            <CardActions className={classes.actions}>
              <SearchInput
                onChange={handleSearchInputChange}
                className={classes.searchInput}
                placeholder="Search Item"
              />

              <ActionsMenu />

            </CardActions>

          }

        >

        </CardHeader>

        <Divider />
        <CardContent className={classes.content}>
        <CustomTreeItem set={xset} key={xset.id} xitem={xset} />
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button
            color="primary"
            size="small"
            variant="text"
          >
            View all <ArrowRightIcon />
          </Button>
        </CardActions>
      </Card>
    </SetContext.Provider>
      
  );
};

Xset2.propTypes = {
  className: PropTypes.string
};

export default Xset2;
