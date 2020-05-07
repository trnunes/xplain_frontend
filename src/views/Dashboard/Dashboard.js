import React, { useContext } from "react";
import DragItem from "./DragItem";
import { Grid, GridImage, GridItem } from "./Grid";
import GridContext from "./GridContext";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { GridProvider } from "./GridContext";
import DashboardContext from './DashboardContext';
import OperationsBar from './OperationsBar'

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders,
  Xset2,
} from './components';
import { useState } from "react";
import { loadSession, sessionSave, addSetTo, keywordSearch, query } from "services/api";
import { useEffect } from "react";
import { Typography, TextareaAutosize, IconButton } from "@material-ui/core";
import MainContext from "layouts/Main/MainContext";
import { makeStyles } from '@material-ui/core/styles';

import Server from '../../services/sparql/Server';
const { do_query } = Server;
const useStyles = makeStyles(theme => ({
  
  operationButton: {
    marginLeft: theme.spacing(1)
  },
} ));


function GridDashboard() {
  const classes = useStyles();
  const { items, setItems, moveItem } = useContext(GridContext);
  const {keyword, activeEndpoints} = useContext(MainContext);
  
  const [sets, setSets] = useState([]);
  const [endpoints, setEndpoints] = useState([]);
  let [sessionId, setSessionId] = useState(localStorage.getItem('sessionId'));
  let [sessionTitle, setSessionTitle] = useState(localStorage.getItem('sessionTitle'));
  
  const updateDashboard = (setsToAdd, atBeginning=false) => {
    let updatedSets = [];
    if (atBeginning) {
      updatedSets = setsToAdd.concat([...sets]);
    } else {
      updatedSets = [...sets].concat(setsToAdd);
    }
    setSets(updatedSets);
    setItems(updatedSets);
  }

  useEffect(()=>{
    if(sessionId) {
      debugger;
      let sets = loadSession(sessionId).sets
      updateDashboard(sets);
    }
    localStorage.clear();
  }, [sessionId, activeEndpoints]);

  useEffect(()=>{
    if(keyword) {
      keywordSearch(keyword, endpoints)
      .then(resultSet=>updateDashboard([resultSet], true));
    }
  }, [keyword]);

    
  const addSet = (set)=>{
    
    updateDashboard([set], true);
    addSetTo(set, sessionId);
  }

  
  const handleSave = (title) => {
    console.log("Saving session " + title + "...");
    return sessionSave(title, sets, []);
  }
  
  const executeQuery = () => {
    query("", [], (resultSet)=>addSet(resultSet));
  }
  return (
    <DashboardContext.Provider value={ {addSet, sessionId} } >
      <div className="App">
        {sessionTitle && <Typography variant="h3" color="inherit">{sessionTitle}</Typography>}
        <div style={{display: 'flex'}}>
          <Typography variant='h4'>Active Endpoints: </Typography>
          {activeEndpoints.map(endpoint=><Typography style={{margin: '3px'}}color="inherit" key={endpoint.id}> {endpoint.title} | </Typography>)}
        </div>
        <OperationsBar onSave={handleSave} />
        {/* <div>
          <TextareaAutosize
            rowsMax={50}
            rowsMin= {20}
            
            aria-label="Query"
            placeholder="Type your query here"
            defaultValue="select * where {?s ?p ?o} limit 10"
          />        

          <IconButton
              className={classes.operationButton}
              color="inherit"
              title="Execute query"
              onClick={executeQuery}
            >
              Go
          </IconButton>
        </div> */}
        <Grid>
          {items.map(set => (
            <DragItem key={set.id} id={set.id} onMoveItem={moveItem}>
              <GridItem>
                <Xset2 setId={set.id} />
              </GridItem>
            </DragItem>
          ))}
        </Grid>    
      </div>
    </DashboardContext.Provider>
  );
}

function Dashboard(){
  return (
    
       
    <DndProvider backend={HTML5Backend}>
      <GridProvider>
        
        <GridDashboard />
      </GridProvider>
    </DndProvider>
    
  )
}

export default Dashboard;
