import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Badge, Hidden, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, InputLabel, Input, TextField, Typography } from '@material-ui/core';
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

const SaveDialog = (props)=> {
  const {open, setOpen, onSave, error, message, title, setTitle} = props;
  const handleClose = () =>{
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={'sm'}
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title">{"Save Session"}</DialogTitle>
      <DialogContent>
        {error && <Typography variant="h4" color='error'>{error}</Typography>}
        {message && <Typography variant="h4" color='primary'>{message}</Typography>}
        <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"            
            fullWidth
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const OperationsBar = props => {
  const { className, onSave, onSidebarOpen, ...rest } = props;
  const [pivotOpen, setPivotOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [title, setTitle] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const classes = useStyles();

  const [notifications] = useState([]);
  
  const handlePivotClick = ()=>{
    
    console.log("Pivot clicked!");
    setPivotOpen(true);
  }

  const handleSaveClick = ()=> {
    setErrorMessage("");
    setMessage("");    
    setSaveOpen(true);
  }

  const onSaveConfirmed = ()=> {
    onSave(title)
    .then(result=>setMessage("Session sucessfully saved!"))
    .catch(error=>setErrorMessage("An error occurred when saving session: "+error));    

  }
  

  return (
      
      <Toolbar>
        <div className={classes.flexGrow} />
        <IconButton color="inherit" title="Save">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
              onClick={handleSaveClick}
              
            >
              <SaveIcon />
            </Badge>
        </IconButton>

        {/* Modals */}
        <SaveDialog open={saveOpen} setOpen={setSaveOpen} title={title} setTitle={setTitle} onSave={onSaveConfirmed} error={errorMessage} message={message}/>

        <PivotDialog open={pivotOpen} setOpen={setPivotOpen} />

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
