import React, {useState, useContext} from 'react';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import RelationPicker from './RelationPicker'
import { TextField, FormGroup, FormControlLabel, FormControl, Switch, Select, MenuItem, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { pivot } from 'services/api';
import { useHistory } from 'react-router-dom';
import DashboardContext from '../Dashboard/DashboardContext';
import MainContext from 'layouts/Main/MainContext';

const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 400,
    },
}));


export default function XsetDialog(props) {
  const {open, setOpen, setId} = props
  const classes = useStyles();

  const handleClose = () => {
    console.log("Closing");
    setOpen(false);
  };

  return (
    <div>
      <Dialog fullScreen={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

        <DialogContent>
            <Xset2 setId={setId}/>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
