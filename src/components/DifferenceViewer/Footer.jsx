import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { fetchData } from './actions';

const Footer = ({ isLoading, isError, dispatch, getData }) => {
  return (
    <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
      {isLoading && (
        <Grid item>
          <CircularProgress data-testid="spinner" />
        </Grid>
      )}
      {isError && (
        <Grid item>
          <Typography variant="body1" color="error" data-testid="warning-text">
            We had problems fetching your data. Please try again.
          </Typography>
        </Grid>
      )}
      {!isLoading && (
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => fetchData(dispatch, getData)}
            data-testid="fetch-button"
          >
            {isError ? 'Retry' : 'Load more'}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default Footer;
