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

const EndpointTable = props => {
  const { onDoubleClick, className, endpoints, ...rest } = props;

  const classes = useStyles();

  const [selectedEndpoints, setSelectedEndpoints] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  

  const handleSelectAll = event => {
    const { endpoints } = props;

    let selectedEndpoints;

    if (event.target.checked) {
      selectedEndpoints = endpoints.map(endpoint => endpoint.id);
    } else {
      selectedEndpoints = [];
    }

    setSelectedEndpoints(selectedEndpoints);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedEndpoints.indexOf(id);
    let newSelectedEndpoints = [];

    if (selectedIndex === -1) {
      newSelectedEndpoints = newSelectedEndpoints.concat(selectedEndpoints, id);
    } else if (selectedIndex === 0) {
      newSelectedEndpoints = newSelectedEndpoints.concat(selectedEndpoints.slice(1));
    } else if (selectedIndex === selectedEndpoints.length - 1) {
      newSelectedEndpoints = newSelectedEndpoints.concat(selectedEndpoints.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedEndpoints = newSelectedEndpoints.concat(
        selectedEndpoints.slice(0, selectedIndex),
        selectedEndpoints.slice(selectedIndex + 1)
      );
    }

    setSelectedEndpoints(newSelectedEndpoints);
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
                      checked={selectedEndpoints.length === endpoints.length}
                      color="primary"
                      indeterminate={
                        selectedEndpoints.length > 0 &&
                        selectedEndpoints.length < endpoints.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>URL</TableCell>
                  <TableCell>Graph</TableCell>
                  <TableCell>Limit of Items by Query</TableCell>
                  <TableCell>Results Limit</TableCell>
                  <TableCell>Use endpoint search index?</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {endpoints.slice(0, rowsPerPage).map((endpoint, i) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={endpoint.id}
                    selected={selectedEndpoints.indexOf(endpoint.id) !== -1}
                    onDoubleClick={(event)=>onDoubleClick(event, i)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedEndpoints.indexOf(endpoint.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, endpoint.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Typography variant="body1">{endpoint.title}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{endpoint.url}</TableCell>
                    <TableCell>{endpoint.graph}</TableCell> 
                    <TableCell>{endpoint.itemsLimit}</TableCell>
                    <TableCell> {endpoint.resultsLimit}</TableCell>
                    <TableCell> {endpoint.useInvertedIndex ? "true":"false"}</TableCell>
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
          count={endpoints.length}
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

EndpointTable.propTypes = {
  className: PropTypes.string,
  endpoints: PropTypes.array.isRequired
};

export default EndpointTable;
