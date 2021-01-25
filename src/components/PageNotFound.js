import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography component="p" variant="h4" color="textPrimary">
          Oh No!!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography component="p" variant="subtitle1" color="textSecondary">
          You are either misspelling the URL <br /> or requesting a page that's no longer here.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Link to="/users">Back To Users</Link>
      </Grid>
    </Grid>
  );
};

export default PageNotFound;
