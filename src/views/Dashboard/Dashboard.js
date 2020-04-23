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
import { loadSession } from "services/api";
import { useEffect } from "react";
import PivotDialog from "views/Pivot/Pivot";


function GridDashboard() {
  const { items, setItems, moveItem } = useContext(GridContext);
  
  const [sets, setSets] = useState([]);
  let [sessionId, setSessionId] = useState(localStorage.getItem('sessionId'));
  

  useEffect(()=>{
    if(sessionId) {
      let sets = loadSession(sessionId).sets
      setSets(sets);
      setItems(sets);
    }
    localStorage.clear()
    debugger  
  }, [sessionId]);

  const addSet = (set)=>{
    let newSets = [...sets];
    newSets.unshift(set);
    setSets(newSets);
    setItems(newSets);
    debugger;
  }

  const handleSave = () => {
    console.log("Saving session ...");
  }  
  return (
    <DashboardContext.Provider value={ {addSet, sessionId} } >
      <div className="App">
      <OperationsBar onSave={handleSave} />      
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
