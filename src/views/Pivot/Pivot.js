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


export default function PivotDialog(props) {
  const {open, setOpen, setId} = props
  const classes = useStyles();
  const [preview, setPreview] = useState([]);
  const [relationPathSelected, setRelationPathSelected] = useState([]);
  const [keepSourceItems, setKeepSourceItems] = useState(false);
  const [filterDuplicates, setFilterDuplicates] = useState(true);
  let history = useHistory();
  const { sessionId, addSet } = useContext(DashboardContext);
  
  const handleClose = () => {
    console.log("Closing");
    setOpen(false);
  };

  const handleRelationPathSelected = (path) => {
    console.log("PIVOT RELATION PATH SELECTED: ", path);
    setRelationPathSelected(path);
  }

  const handleGo = () => {
    debugger;
    pivot(setId, relationPathSelected, filterDuplicates, keepSourceItems)
    .then(resultSet=>{
      console.log("Result set: ", resultSet);
      console.log("addSet: ", addSet);
      addSet(resultSet);
      history.push('/dashboard');
      setOpen(false);
    });
 }

  return (
    <div>
      <Dialog fullScreen={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Pivot</DialogTitle>
        <DialogContent>
            
            <DialogContentText>
                This operation allows you to navigate to a related set of items.
            </DialogContentText>

            <FormGroup row>
                <FormControl className={classes.formControl}>
                    <InputLabel id="label_result_set_preview">Select a level</InputLabel>
                    <Select
                        labelId="label_result_set_preview"
                        id="select_result_set_preview"
                        onChange={()=>{}}
                    >
                        <MenuItem value={1}>Level 1</MenuItem>
                        <MenuItem value={2}>Level 2</MenuItem>
                        <MenuItem value={3}>Level 3</MenuItem>
                    </Select>
                </FormControl>
            </FormGroup>


            <RelationPicker setId="set1" onRelationSelectedCallback={handleRelationPathSelected}/>
            
            <FormGroup row>
                <FormControlLabel
                    control={
                    <Switch
                        checked={keepSourceItems}
                        onChange={(e)=>setKeepSourceItems(e.target.checked)}
                        name="keepSourceItems"
                        color="primary"
                    />
                    }
                    label="Keep source items?"
                />
                <FormControlLabel
                    control={
                    <Switch
                        checked={filterDuplicates}
                        onChange={(e)=>setFilterDuplicates(e.target.checked)}
                        name="filterDuplicates"
                        color="primary"
                    />
                    }
                    label="Filter repeated values?"
                />
            </FormGroup>
            
            <FormGroup row>
                <Autocomplete
                    id="combo-box-preview"
                    options={preview}
                    getOptionLabel={(item) => item.text}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Results preview" variant="outlined" />}
                />
            </FormGroup>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleGo} color="primary">
            Go
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
