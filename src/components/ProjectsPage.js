import React from 'react';
import api from '../lib/api';
import TableComponent from './TableComponent';

const ProjectsPage = () => {
  return <TableComponent getData={api.getProjectsDiff} />;
};

export default ProjectsPage;
