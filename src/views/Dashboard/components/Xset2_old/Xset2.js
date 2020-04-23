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
  AppBar,
  Toolbar,
  Checkbox,

} from '@material-ui/core';


import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import Folder from '@material-ui/icons/Folder'
import { SearchInput } from 'components';
import useCustom from './customHook';

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

  
  const [childNodes, setChildNodes] = useState(null);
  const [expanded, setExpanded] = useState([]);
  const { addCheckedState, checkedState } = useContext(SetContext);
  const [globalChecked, setGlobalChecked] = useCustom();


    
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
        });
      }, 1);
    });
  }

  const handleChange = (event, nodes) => {
    const expandingNodes = nodes.filter(x => !expanded.includes(x));
    setExpanded(nodes);
    if (expandingNodes[0]) {
      const childId = expandingNodes[0];
      
      fetchChildNodes(childId).then(result =>{
        // let newCheckedState = {...checkedState};
        // result.children.forEach(child=>newCheckedState[child.node] = {checked: newCheckedState[xitem.node]});
        // setCheckedState(newCheckedState);
        result.children.forEach((child)=>{
          globalChecked[child.node] = {checked: globalChecked[xitem.node].checked}
        });
        
        setGlobalChecked(globalChecked);
        setChildNodes(
          result.children.map((node, i) => {              
            
            return <CustomTreeItem set={set} key={node.node} xitem={node}/>;
          })
        );
      });
    }
  };
  // const handleSelection = (event, selectedNodes) => {
    
    
    
  //   [selectedNodes].forEach((nodeId)=>{
      
  //     if(selectedList.indexOf(nodeId) >= 0) {

  //       setSelectedList(
  //         selectedList.splice(selectedList.indexOf(nodeId))
  //       );
  //       console.log("Splicing: ", nodeId)
        
  //     } else {
  //       selectedList.push(nodeId);
  //       setSelectedList(selectedList);
  //     }

  //   });
  //   console.log("SelectedList: ", selectedList);
  //   console.log("SelectedNodes: ", selectedNodes);


  // }

  function handleCheck(event, checked){
    console.log("Check: ", xitem, checked);
    let newState = {[xitem.node]:{checked: checked}};
    xitem.children.forEach((child)=>{
      newState[child.node] = {checked: checked};
    });
    setGlobalChecked(newState);    
  }
  debugger;
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      onNodeToggle={handleChange}
      
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
              checked = {globalChecked[xitem.node].checked}
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

  console.log(props)
  const { gridId, setId, className, ...rest } = props;
  console.log("Key: ", gridId);
  const [xset, setXset] = useState(loadSet(setId));
  const [state, setGlobalState] = useCustom();
  const [xitems, setXitems] = useState(xset.children);
  const classes = useStyles();
  const nodes = [];

  // xset.children.forEach((child)=>{
  //   setGlobalState({[child.node]:{checked:false}});
  // })
  
  function buildNodesTree(item) {
    let node = {value:item.node, label:item.text, children: item.children.map(child=>buildNodesTree(child))};
    return node;
  }

  nodes = buildNodesTree(xset).children;
  

  function handleSearchInputChange(event) {
    if (event.target.value.length === 0) {
      setXitems(loadSet(setId).children);
    }

    if (event.target.value.length > 3) {
      setXitems(filterSetByKeyword(setId, event.target.value));
    }
  }

  // const addCheckedState = (nodeId, isChecked, setChecked) => {
  //   checkedState[nodeId] = {checked: isChecked, setChecked: setChecked};

  //   debugger;
  // }
  
  return (
    // <SetContext.Provider value={{ addCheckedState, checkedState }}>

      <Card
        {...rest}
        key={gridId}
        className={clsx(classes.root, className)}
      >
        <CardHeader
          subtitle={`${xset.total} in total`}
          title={xset.title}

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
          {xitems.map((xitem) => <CustomTreeItem set={xset} key={xitem.node} xitem={xitem} />)}
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
      // </SetContext.Provider>
  );
};

Xset2.propTypes = {
  className: PropTypes.string
};

export default Xset2;
