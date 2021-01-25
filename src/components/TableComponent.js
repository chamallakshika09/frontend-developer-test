import React, { useCallback, useEffect, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Grid, TableContainer, TableSortLabel } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { Fragment } from 'react';
import DataReducer from './DataReducer';

const useStyles = makeStyles((theme) => ({
  padding: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
}));

const TableComponent = ({ getData }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [state, dispatch] = React.useReducer(DataReducer, {
    isLoading: false,
    isError: false,
    data: [],
  });

  const sortedData = useMemo(() => {
    if (order === 'asc') {
      return [...state.data].sort((a, b) => a.timestamp - b.timestamp);
    }
    return [...state.data].sort((a, b) => b.timestamp - a.timestamp);
  }, [order, state.data]);

  const fetchData = useCallback(async () => {
    dispatch({ type: 'FETCH_LOADING' });
    try {
      const result = await getData();
      dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
    } catch (error) {
      dispatch({ type: 'FETCH_FAILURE' });
    }
  }, [dispatch, getData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatToTwoDigits = (value) => {
    if (value < 10) {
      return `0${value}`;
    }
    return value;
  };

  const getDateFromTimeStamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = formatToTwoDigits(date.getMonth() + 1);
    const day = formatToTwoDigits(date.getDate());
    return `${year}-${month}-${day}`;
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={true}
                  direction={order}
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">User ID</TableCell>
              <TableCell align="left">Old value</TableCell>
              <TableCell align="left">New value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left">{getDateFromTimeStamp(row.timestamp)}</TableCell>
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.diff[0].oldValue}</TableCell>
                <TableCell align="left">{row.diff[0].newValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {state.isLoading && (
        <Grid container direction="row" justify="center" alignItems="center" className={classes.padding}>
          <CircularProgress />
        </Grid>
      )}
      {state.isError && (
        <Fragment>
          <Grid container direction="row" justify="center" alignItems="center" className={classes.padding}>
            <Typography variant="body1" component="label" color="error">
              We had problems fetching your data. Please try again.
            </Typography>
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center" className={classes.padding}>
            <Button variant="contained" color="primary" onClick={fetchData}>
              Retry
            </Button>
          </Grid>
        </Fragment>
      )}
      {!(state.isError || state.isLoading) && (
        <Grid container direction="row" justify="center" alignItems="center" className={classes.padding}>
          <Button variant="contained" color="primary" onClick={fetchData}>
            Load more
          </Button>
        </Grid>
      )}
    </Paper>
  );
};

export default TableComponent;
