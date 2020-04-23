import React, { useState } from 'react';
import produce from 'immer';
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
  
} from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Label from '@material-ui/icons/Label';
import Folder from '@material-ui/icons/Folder'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import SetContext from './context';

import mockData from './data';

import Xitem from './Xitem';



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


const GmailTreeView = (props)=> {
  const classes = useStyles();  
  const [nodes, setNodes] = useState([])
  const [expanded, setExpanded] = useState([]);
  const {xitems, setXitems} = props;
  const {xitem, labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;
  console.log("Items from set", xitems);
  
  function fetchChildNodes(id){
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          children: [
            {
              id: '2.3',
              text: 'This is an exploration item mock for the new xplain interface! ',
              node: '2.3',
              set: 'set_1',
              type: 'Xplain::Literal',
              intention: 'This is the expression that generated this set',
              children: []
            },
            {
              id: '2.4',
              text: 'This is an exploration item mock for the new xplain interface! ',
              node: '2.4',
              set: 'set_1',
              type: 'Xplain::Entity',
              intention: 'This is the expression that generated this set',
              children: []
            },
          ]
        })
      })
    })
  };

  const handleChange = (event, nodes) => {
    const expandingNodes = nodes.filter(x => !expanded.includes(x));
    setExpanded(nodes);
    if (expandingNodes[0]) {
      const childId = expandingNodes[0];
    //   setLists(produce(lists, draft => {
    //     const dragged = draft[fromList].cards[from];
    //     draft[fromList].cards.splice(from, 1);
    //     draft[toList].cards.splice(to, 0, dragged);
    // }))

      // fetchChildNodes(childId).then(result =>{
      //   [itemToUpdate] = xitems.splice(childId);


      //   setXitems(
      //     result.children.map(node => (
      //       <MyTreeItem key={node.id} {...node}  />
      //     ))
      //   )        
      // });
    }
  };
 

  function buildTree(xitems){
    const parsedItems = xitems.map((xitem, index)=>{      
      
      return (
        <Xitem 
          key={index} 
          xitem={xitem}
          index = {index}
          nodeId={xitem.node} 
          labelText={xitem.text} 
          labelIcon={Folder}
          children={[<div key="stub" />]}
        />
      );      
    });    
    return parsedItems;
  };
  const parsedNodes = buildTree(xitems);
  
  return (
    <SetContext.Provider value={{xitems, setXitems}}>
      <TreeView
        className={classes.root}
        defaultExpanded={['3']}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        onNodeToggle= {handleChange}
        
      >
        {parsedNodes}

      </TreeView>
    </SetContext.Provider>
  );
}

const Xset = props => {
  const { className, ...rest } = props;
  const xitems = mockData;
  const classes = useStyles();  

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        subtitle={`${xitems.length} in total`}
        title="Items"

        action={
          <Button
            color="primary"
            size="small"
            variant="outlined"
          >
            View
          </Button>
        }
        title="Items"

      />
      <Divider />
      <CardContent className={classes.content}>
        <GmailTreeView xitems={xitems} />
        {/* <List>
          {xitems.map((xitem, i) => (
            <ListItem
              divider={i < xitems.length - 1}
              key={xitem.id}
            >
              <ListItemAvatar>
                <img
                  alt="Item"
                  className={classes.image}
                  src={xitem.imageUrl}
                />
              </ListItemAvatar>
              <ListItemText
                primary={xitem.name}
                secondary={`Updated ${xitem.updatedAt.fromNow()}`}
              />
              <IconButton
                edge="end"
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          ))}
        </List> */}
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
  );
};

Xset.propTypes = {
  className: PropTypes.string
};

export default Xset;
