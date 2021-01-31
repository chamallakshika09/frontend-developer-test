import { Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { fetchData } from './actions';
import DataReducer from './reducer';
import Footer from './Footer';
import TableComponent from './TableComponent';

const DifferenceViewer = ({ getData, type }) => {
  const [state, dispatch] = React.useReducer(DataReducer, {
    isLoading: false,
    isError: false,
    data: [],
  });

  useEffect(() => {
    fetchData(dispatch, getData);
  }, [getData]);

  return (
    <Paper>
      <TableComponent data={state.data} type={type} data-testid="table" />
      <Footer
        isLoading={state.isLoading}
        isError={state.isError}
        dispatch={dispatch}
        getData={getData}
        data-testid="footer"
      />
    </Paper>
  );
};

export default DifferenceViewer;
