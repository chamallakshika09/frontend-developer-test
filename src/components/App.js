import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import MainRouter from './MainRouter';

export const App = () => {
  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={2}>
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </Box>
    </Container>
  );
};

export default App;
