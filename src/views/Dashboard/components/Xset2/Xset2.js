import React, { useState, useContext, useEffect } from 'react';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { loadSet, fetchChildren, filterSetByKeyword } from '../../../../services/api';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import GraphIcon from '../../../../icons/Graph';
import SetContext from './context';

import clsx from 'clsx';
import PropTypes, { node } from 'prop-types';
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
import { Tree, SampleTree, minimalTheme } from 'react-lazy-paginated-tree';
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
    'Select All',
    'Clear selection',
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

const ActionsMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const itemType = props.itemType;
  const { setSelected, setXset, xset } = props;
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

  const handleSelectAll = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let selected = {};
    xset.children.forEach(item=>selected[item.node]=true);
    setSelected(selected);
    setAnchorEl(null);
  };

  const handleClear = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let selected = {};
    xset.children.forEach(item=>selected[item.node]=false);
    setSelected(selected);
    setAnchorEl(null);
  }

  const handlers = {    
    'Select All': handleSelectAll,
    'Clear selection': handleClear,
    'Select': handleClose,
    'Select Branch': handleClose,
    'Delete': handleClose,
  }


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
          <MenuItem key={option} selected={option === 'Select All'} onClick={handlers[option]}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


const loadChildrenPaginated = async (node: Node, pageLimit: number = 5) => {
  await sleep(500);
  const children = [];
  for (let i = 0; i < pageLimit; i += 1) {
    children.push({
      id: i * node.page,
      name: `${node.name}${i + (node.page - 1) * pageLimit}`,
      description: '',
      children: [],
      numChildren: pageLimit * 3,
      page: 0,
      expanded: false,
      selected: false,
    });
  }
  return children;
};

const filterTreeByKeyword = async (keyword) => {

}

const parseNodes = (items) => {
    
  let mapped = items.map((item)=>(
    {
      id: item.node,
      name: item.text,
      description: 'Stub desc',
      children: parseNodes(item.children),
      page: 0,
      numChildren: 5,
      expanded: false,
      selected: false
    
    }));
    
    return mapped;
}


const Xset2 = props => {

  console.log(props)
  const { text, gridId, setId, className, ...rest } = props;
  console.log("Key: ", gridId);
  
  
  const [xset, setXset] = useState(loadSet(setId));

  const [treeNodes, setTreeNodes] = useState(parseNodes(xset.children));
  
  const [selected, setSelected] = useState({});

  const classes = useStyles();
  
  const ItemIcons = {
    "Xplain::SchemaRelation": <GraphIcon color="inherit" className={classes.labelIcon} viewBox="0 0 485 485" />,
    "Xplain::PathRelation": <GraphIcon color="inherit" className={classes.labelIcon} viewBox="0 0 485 485" />,
    "Xplain::Entity": <Folder className={classes.labelIcon} />,
    "Xplain::Session": <Folder className={classes.labelIcon} />,
    "Xplain::ResultSet": <Folder className={classes.labelIcon} />,
  }     

  const handleSearchInputChange = (event) => {
    if (event.target.value.length === 0) {
      setTreeNodes(parseNodes(loadSet(setId).children));
      debugger;
    }

    if (event.target.value.length > 3) {      
      setTreeNodes(
        parseNodes(
          filterSetByKeyword(setId, event.target.value).children)
          .map(n=>{n.expanded=true; return n}
        )
      );
    }
  }

  const onSelect = (event, node) => {
    console.log("SELECT EVENT: ", node);
    node.selected = event.target.checked;
  }

  const loadChildren = async (node: Node, pageLimit: number = 5) => {
    await sleep(500);
     node.children = parseNodes(fetchChildren(node.id));
     node.expanded = !node.expanded;
    return node.children
  };
  
  const onCheckAll = (event) => {
    setTreeNodes(prevNodes=>(
      prevNodes.map(node=>({...node, selected: event.target.checked}))
    ));    
  }

  return (
    // <SetContext.Provider value={{ addCheckedState, checkedState }}>

      <Card
        {...rest}
        key={gridId}
        className={clsx(classes.root, className)}
      >
        
        <CardHeader
          subtitle={`${xset.total} in total`}
          title={<>{xset.text} <Checkbox onChange={onCheckAll}/> </>}
        
          action={

            <CardActions className={classes.actions}>
              
              <SearchInput
                onChange={handleSearchInputChange}
                className={classes.searchInput}
                placeholder="Search Item"
              />

              <ActionsMenu setSelected = {setSelected} setXset={setXset} xset={xset}/>

            </CardActions>

          }

        >


        </CardHeader>

        <Divider />
        <CardContent className={classes.content}>
          <Tree nodes={treeNodes} selectCallback={onSelect} loadChildren={loadChildren} />
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
