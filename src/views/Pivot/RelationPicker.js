import React, { useState, } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  TextField,
} from '@material-ui/core';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { Tree  } from 'react-lazy-paginated-tree';
import { loadSet, listRelations, loadImage, filterSetByKeyword, fetchNestedRelations } from 'services/api';
import clsx from 'clsx';
import { SearchInput } from 'components';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(() => ({
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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const parseNodes = (items = []) => {
    
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
  
  
  
export default function RelationPicker(props){
    const { setId, onRelationSelectedCallback, sampleAmount, className, ...rest } = props;    

    const [treeNodes, setTreeNodes] = useState(parseNodes(listRelations(setId)));
    
    const [relatedItemsPreview, setRelatedItemsPreview] = useState([]);
    
    const classes = useStyles();

    let currentPathSelected = null;
    
    
    const findPathTo = (targetNode) => {
      function findParents(itemId, root, parents = []){
        
        if (itemId === root.id) { return root}

        parents.push(root);
        let result = null
        for (let i in root.children) {
            let child = root.children[i];
            
              result = findParents(itemId, child, parents);
            if (result){ 
                break;
            }
        }
        if (result) {
            return result;
        }

        parents.splice(parents.length - 1, 1);

        return null;
      }

      let path = [];
        
      treeNodes.every((node)=>{
          path = [];
          findParents(targetNode.id, node, path);
          
          return !path.length;
      });
      path.push(targetNode);
      console.log("Relation Path: ", path);
      return path;
    };

    const handleSearchInputChange = (event) => {
        if (event.target.value.length === 0) {
          setTreeNodes(parseNodes(loadSet(setId).children));
          debugger;
        }
    
        if (event.target.value.length > 3) {      
          setTreeNodes(
            parseNodes(
              filterSetByKeyword(setId, event.target.value).children)
              .map(n=>{n.expanded=true; return n})
          );
        }
    };

    const handleRelationSelected = (event, node) => {
        let path = findPathTo(node);        
        node.selected = event.target.checked;
        onRelationSelectedCallback && onRelationSelectedCallback(path);
        //TODO remove selection of the other relations
        currentPathSelected = path;
        return path;
    };

    const onItemsSelectOpen = ()=> {
      setRelatedItemsPreview(loadImage(setId, currentPathSelected, sampleAmount));
    }
    
    const handleRelationExpanded = async (relationNode: Node, pageLimit: number = 5) =>{
        console.log("Load children relations for: ", relationNode);
        
        let path = findPathTo(relationNode);
        
        relationNode.children = parseNodes(fetchNestedRelations(setId, path));

        relationNode.expanded = !relationNode.expanded;
        
        return relationNode.children;
    };
  
    
    return(
    <Card        
        key={1}
        className={clsx(classes.root, className)}
      >
        
        <CardHeader
          subtitle={'test title'}
          title={"Relations"}
        
          action={

            <CardActions className={classes.actions}>
              
              <SearchInput
                onChange={handleSearchInputChange}
                className={classes.searchInput}
                placeholder="Search Item"
              />

            </CardActions>
          }
        >


        </CardHeader>

        <Divider />
        <CardContent className={classes.content}>
          <Tree nodes={treeNodes} selectCallback={handleRelationSelected} loadChildren={handleRelationExpanded} />
        </CardContent>
        
        <Autocomplete
            id="combo-box-preview"
            options={relatedItemsPreview}
            getOptionLabel={(item) => item.text}
            style={{ width: 300 }}
            onOpen={onItemsSelectOpen}
            renderInput={(params) => <TextField {...params} label="Related Items" variant="outlined" />}
        />

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
}