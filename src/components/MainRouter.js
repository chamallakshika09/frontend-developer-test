import React from 'react';
import { Route, Switch } from 'react-router-dom';

import UsersPage from './UsersPage';
import ProjectsPage from './ProjectsPage';
import PageNotFound from './PageNotFound';

const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/">
        <UsersPage />
      </Route>
      <Route exact path="/users">
        <UsersPage />
      </Route>
      <Route exact path="/projects">
        <ProjectsPage />
      </Route>
      <Route>
        <PageNotFound />
      </Route>
    </Switch>
  );
};

export default MainRouter;
