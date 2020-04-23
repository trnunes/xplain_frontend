import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  IconButton
  
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Folder from '@material-ui/icons/Folder';

import GraphIcon from '../../../../../icons/Graph';
import TreeItem from '@material-ui/lab/TreeItem';
import { useContext } from 'react';
import SetContext from '../context';
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
  
  const Xitem = (props)=> {
    const classes = useTreeItemStyles();
    
    const {xitem, labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

    const pickIcon = () => {
        if(xitem.type === "Xplain::SchemaRelation" || xitem.type === "Xplain::PathRelation") {
            return <GraphIcon color="inherit" className={classes.labelIcon} viewBox="0 0 485 485"/>
        } else if(xitem.type === "Xplain::Entity") {
            return <Folder color="inherit" className={classes.labelIcon} />;
        } 
    }
    
    
    
    return (
      <TreeItem
        label={
          <div className={classes.labelRoot}>
            {pickIcon()}
            <Typography variant="body2" className={classes.labelText}>
              {xitem.text}
            </Typography>
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
            <IconButton
                edge="end"
                size="small"
              >
            <MoreVertIcon />
            </IconButton>

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
      />
    );
  }
  
  Xitem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
  };

  export default Xitem;