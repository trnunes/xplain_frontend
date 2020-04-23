import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

import Delete from '@material-ui/icons/Delete'

import { getInitials } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const SessionTable = props => {
  const { className, selectedSessions, setSelectedSessions, sessions, ...rest } = props;

  const classes = useStyles();

  
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { sessions } = props;

    let selectedSessions;

    if (event.target.checked) {
      selectedSessions = sessions.map(session => session.id);
    } else {
      selectedSessions = [];
    }

    setSelectedSessions(selectedSessions);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedSessions.indexOf(id);
    let newSelectedSessions = [];

    if (selectedIndex === -1) {
      newSelectedSessions = newSelectedSessions.concat(selectedSessions, id);
    } else if (selectedIndex === 0) {
      newSelectedSessions = newSelectedSessions.concat(selectedSessions.slice(1));
    } else if (selectedIndex === selectedSessions.length - 1) {
      newSelectedSessions = newSelectedSessions.concat(selectedSessions.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedSessions = newSelectedSessions.concat(
        selectedSessions.slice(0, selectedIndex),
        selectedSessions.slice(selectedIndex + 1)
      );
    }

    setSelectedSessions(newSelectedSessions);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedSessions.length === sessions.length}
                      color="primary"
                      indeterminate={
                        selectedSessions.length > 0 &&
                        selectedSessions.length < sessions.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>URL</TableCell>
                  <TableCell>Sets Count</TableCell>
                  <TableCell>Endpoints</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sessions.slice(0, rowsPerPage).map(session => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={session.id}
                    selected={selectedSessions.indexOf(session.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedSessions.indexOf(session.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, session.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Typography variant="body1">{session.title}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{session.url}</TableCell>                    
                    <TableCell>{session.count}</TableCell>
                    <TableCell> {session.endpoints.toString()}</TableCell>
                    <TableCell> <IconButton> <Delete /> </IconButton> </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={sessions.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

SessionTable.propTypes = {
  className: PropTypes.string,
  sessions: PropTypes.array.isRequired
};

export default SessionTable;
