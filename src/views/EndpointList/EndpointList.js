import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import { EndpointToolbar, EndpointTable } from './components';
import { listEndpoints, addEndpoint } from '../../services/api'

import FormControl from '@material-ui/core/FormControl';
import { InputLabel, Input, FormHelperText, Button, FormGroup, Switch, FormControlLabel, TextField, Typography } from '@material-ui/core';
import MainContext from 'layouts/Main/MainContext';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const AddForm = (props) => {
  

  const id = localStorage.getItem('id');
  const [url, setUrl] = useState(localStorage.getItem('url'));
  const [graph, setGraph] = useState(localStorage.getItem('graph'));
  const [title, setTitle] = useState(localStorage.getItem('title'));
  const [itemsLimit, setItemsLimit] = useState(localStorage.getItem('itemsLimit') || 5000);
  const [resultsLimit, setResultsLimit] = useState(localStorage.getItem('resultsLimit') || 10000);
  const [useInvertedIndex, setUseInvertedIndex] = useState(localStorage.getItem('useInvertedIndex'));
  const { setEndpoints, setRenderAdd } = props


  const  handleSaveEndpoint  = async (e) => {
    e.preventDefault();
    let endpointData = {id, url, graph, title, itemsLimit, resultsLimit, useInvertedIndex};
    let response = await addEndpoint(endpointData);
    if (response) {

      setEndpoints(endpoints=>{
        let newEndpointList = [...endpoints];
        
        if (id){
          let endpointToUpdate = newEndpointList.filter(e=>e.id === id);
          debugger;
          if (!endpointToUpdate.length){throw "Cannot update the endpoint. Endpoint was not found!"}
          
          newEndpointList.splice(newEndpointList.indexOf(endpointToUpdate[0]), 1);
        }

        newEndpointList.unshift(endpointData);
        
        return newEndpointList;
      });      
      setRenderAdd(false);
      
    }
    else {
      throw "Cannot add endpoint! Is the server online?";
    }
    localStorage.clear();
  }

  return (
    <section className="form">
      <form onSubmit={handleSaveEndpoint}>        
      <FormGroup row>
          <FormControl>
            <InputLabel htmlFor="url">URL</InputLabel>
            <Input onChange={(e) => setUrl(e.target.value)} id="url-input" aria-describedby="url-helper-text" value={url}/>
            <FormHelperText id="url-helper-text">The URL of the data endpoint</FormHelperText>
          </FormControl>
      </FormGroup>
      <FormGroup row>
          <FormControl>
            <InputLabel htmlFor="url">Graph</InputLabel>
            <Input onChange={(e) => setGraph(e.target.value)} id="graph-input" aria-describedby="graph-helper-text" value={graph}/>
            <FormHelperText id="url-helper-text">The endpoint graph (optional)</FormHelperText>
          </FormControl>
      </FormGroup>

      <FormGroup row>
          <FormControl>
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input onChange={(e) => setTitle(e.target.value)} id="title-input" aria-describedby="title-helper-text" value={title}/>            
          </FormControl>
      </FormGroup>
      <FormGroup row>
          <FormControl>
          
            <TextField
              id="outlined-number"
              label="Limit of items by query"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
          
              value={itemsLimit}
              onChange={(e) => setItemsLimit(e.target.value)}
            />
          </FormControl>
      </FormGroup>
      <FormGroup row>
          <FormControl>
          <TextField
              id="outlined-number"
              label="Limit of results by query"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
          
              value={resultsLimit}
              onChange={(e) => setResultsLimit(e.target.value)}
            />
        </FormControl>
      </FormGroup>

      <FormControlLabel
        control={
          <Switch 
            checked={eval(useInvertedIndex)}
            onChange={(e)=>setUseInvertedIndex(e.target.checked)}
            name="useInvertedIndex"
            color="primary"
          />
        }
        label="Use search index?"
      />
      <FormGroup row>
        <Button
              color="primary"
              variant="contained"
              type="submit"
            >
              Salvar
        </Button>
      </FormGroup>

      </form>
    </section>

  );

};

const EndpointList = () => {
  const classes = useStyles();
  const [renderAdd, setRenderAdd] = useState(false);
  const [endpoints, setEndpoints] = useState(listEndpoints());
  const [selectedEndpoints, setSelectedEndpoints] = useState([]);
  const { activeEndpoints, setActiveEndpoints } = useContext(MainContext);

  const handleAdd = () => {

    setRenderAdd(true);
  }

  const handleEnableEndpoint = () => {
    debugger;
    setActiveEndpoints(selectedEndpoints.map(endpointId=>endpoints.filter(e=>e.id === endpointId)[0]));
  }


  const handleDoubleClick = (event, i) => {
    localStorage.clear();
    localStorage.setItem("id", endpoints[i].id);
    localStorage.setItem("url", endpoints[i].url);
    localStorage.setItem("graph", endpoints[i].graph);
    localStorage.setItem("title", endpoints[i].title);
    localStorage.setItem("itemsLimit", endpoints[i].itemsLimit);
    localStorage.setItem("resultsLimit", endpoints[i].resultsLimit);
    localStorage.setItem("useInvertedIndex", endpoints[i].useInvertedIndex?true:false);
    
    setRenderAdd(true);
    console.log("Endpoint: ",endpoints[i]);
  }

  return (
    <div className={classes.root}>
      <div style={{display: 'flex'}}>
        <Typography variant='h4'>Active Endpoints: </Typography>
        {activeEndpoints.map(endpoint=><Typography style={{margin: '3px'}}color="inherit" key={endpoint.id}> {endpoint.title} | </Typography>)}
      </div>
      <EndpointToolbar onAdd={handleAdd} onEnable={handleEnableEndpoint}/>
      
      <div className={classes.content}>
        <EndpointTable endpoints={endpoints} onDoubleClick={handleDoubleClick} setSelectedEndpoints={setSelectedEndpoints} selectedEndpoints={selectedEndpoints}/>
      </div>
    </div>
  );
};

export default EndpointList;
