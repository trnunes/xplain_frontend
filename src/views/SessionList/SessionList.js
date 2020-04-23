import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';

import { SessionToolbar, SessionTable } from './components';
import mockData from './data';

import { listSessions } from "../../services/api";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const SessionList = () => {
  const classes = useStyles();

  const [sessions] = useState(listSessions);
  const [selectedSessions, setSelectedSessions] = useState([]);
  let history = useHistory();
  const loadHandler = async () => {
    if (selectedSessions.length){
      let sessionId = selectedSessions[selectedSessions.length - 1];
      console.log(sessionId);
      localStorage.setItem('sessionId', sessionId);
      history.push('/dashboard');
    }
  }

  return (
    <div className={classes.root}>
      
      <SessionToolbar onLoad={loadHandler} />
      <div className={classes.content}>
        <SessionTable selectedSessions={selectedSessions} setSelectedSessions={setSelectedSessions} sessions={sessions} />
      </div>
    </div>
  );
};

export default SessionList;
