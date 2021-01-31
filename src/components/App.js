import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import DifferenceViewer from './DifferenceViewer';
import api from '../lib/api/';
import { USERS, PROJECTS } from '../utils/types';

export const App = () => {
  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" marginY={16}>
        <DifferenceViewer getData={api.getUsersDiff} type={USERS} data-testid="users" />
      </Box>
      <Box data-testid="app-box" marginY={16}>
        <DifferenceViewer getData={api.getProjectsDiff} type={PROJECTS} data-testid="projects" />
      </Box>
    </Container>
  );
};

export default App;
