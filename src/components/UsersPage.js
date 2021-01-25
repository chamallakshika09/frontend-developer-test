import React from 'react';
import api from '../lib/api';
import TableComponent from './TableComponent';

const UsersPage = () => {
  return <TableComponent getData={api.getUsersDiff} />;
};

export default UsersPage;
