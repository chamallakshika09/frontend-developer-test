import React, { useEffect } from 'react';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableContainer, TableSortLabel } from '@material-ui/core';
import { sortData } from '../../utils/sortData';
import { USERS, PROJECTS, ASCENDING, DESCENDING } from '../../utils/types';

const TableComponent = ({ data, type }) => {
  const [order, setOrder] = React.useState(DESCENDING);
  const [sortedData, setSortedData] = React.useState([]);

  useEffect(() => {
    setSortedData(sortData(data, order));
  }, [data, order]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={true}
                direction={order}
                onClick={() => setOrder(order === ASCENDING ? DESCENDING : ASCENDING)}
              >
                Date
              </TableSortLabel>
            </TableCell>
            <TableCell data-testid="id" align="left">
              {type === USERS ? USERS : PROJECTS}
            </TableCell>
            <TableCell align="left">Old value</TableCell>
            <TableCell align="left">New value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData &&
            sortedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left">{moment(new Date(row.timestamp)).format('YYYY-MM-DD')}</TableCell>
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.diff[0].oldValue}</TableCell>
                <TableCell align="left">{row.diff[0].newValue}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
