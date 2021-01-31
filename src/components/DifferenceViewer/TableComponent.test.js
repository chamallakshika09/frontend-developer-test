import React from 'react';
import moment from 'moment';
import { shallow, mount } from 'enzyme';
import TableComponent from './TableComponent';
import { Table, TableBody, TableCell, TableRow, TableSortLabel } from '@material-ui/core';
import { USERS, DESCENDING, ASCENDING } from '../../utils/types';
import * as sorter from '../../utils/sortData';

describe('render', () => {
  let wrapper;

  const data = [
    {
      id: '8bd0166f-f0c6-48fd-9fcd-a17e76eb1e92',
      timestamp: new Date('2020/2/15').getTime(),
      diff: [{ field: 'name', oldValue: 'Bruce', newValue: 'Nick' }],
    },
    {
      id: 'e28d290a-a2f2-48c2-9001-ff43884e271b',
      timestamp: new Date('2020/2/14').getTime(),
      diff: [{ field: 'name', oldValue: 'John', newValue: 'Bruce' }],
    },
    {
      id: '0a75a2b3-be64-4aeb-ba4c-8ddb913791ac',
      timestamp: new Date('2020/2/16').getTime(),
      diff: [{ field: 'name', oldValue: 'Nick', newValue: 'Michel' }],
    },
  ];

  beforeEach(() => {
    wrapper = shallow(<TableComponent data={data} type={USERS} />);
  });

  it('should sort data in descending order when loads', () => {
    const expectedOutput = [
      {
        id: '0a75a2b3-be64-4aeb-ba4c-8ddb913791ac',
        timestamp: new Date('2020/2/16').getTime(),
        diff: [{ field: 'name', oldValue: 'Nick', newValue: 'Michel' }],
      },
      {
        id: '8bd0166f-f0c6-48fd-9fcd-a17e76eb1e92',
        timestamp: new Date('2020/2/15').getTime(),
        diff: [{ field: 'name', oldValue: 'Bruce', newValue: 'Nick' }],
      },
      {
        id: 'e28d290a-a2f2-48c2-9001-ff43884e271b',
        timestamp: new Date('2020/2/14').getTime(),
        diff: [{ field: 'name', oldValue: 'John', newValue: 'Bruce' }],
      },
    ];

    const rows = wrapper.find(Table).find(TableBody).find(TableRow);
    for (let i = 0; i < rows.length; i++) {
      const row = rows
        .at(i)
        .find(TableCell)
        .map((column) => column.text());
      expect(row[1]).toEqual(expectedOutput[i].id);
      expect(row[0]).toEqual(moment(new Date(expectedOutput[i].timestamp)).format('YYYY-MM-DD'));
      expect(row[2]).toEqual(expectedOutput[i].diff[0].oldValue);
      expect(row[3]).toEqual(expectedOutput[i].diff[0].newValue);
    }
    for (let i = 0; i < rows.length; i++) {
      const row = rows.at(i);
      expect(row.key()).toEqual(expectedOutput[i].id);
    }
  });

  it('should sort data when clicked on date column', () => {
    const sortLabel = wrapper.find(TableSortLabel);
    sortLabel.simulate('click');

    const expectedOutput = [
      {
        id: 'e28d290a-a2f2-48c2-9001-ff43884e271b',
        timestamp: new Date('2020/2/14').getTime(),
        diff: [{ field: 'name', oldValue: 'John', newValue: 'Bruce' }],
      },
      {
        id: '8bd0166f-f0c6-48fd-9fcd-a17e76eb1e92',
        timestamp: new Date('2020/2/15').getTime(),
        diff: [{ field: 'name', oldValue: 'Bruce', newValue: 'Nick' }],
      },
      {
        id: '0a75a2b3-be64-4aeb-ba4c-8ddb913791ac',
        timestamp: new Date('2020/2/16').getTime(),
        diff: [{ field: 'name', oldValue: 'Nick', newValue: 'Michel' }],
      },
    ];

    const rows = wrapper.find(Table).find(TableBody).find(TableRow);
    for (let i = 0; i < rows.length; i++) {
      const row = rows
        .at(i)
        .find(TableCell)
        .map((column) => column.text());
      expect(row[1]).toEqual(expectedOutput[i].id);
      expect(row[0]).toEqual(moment(new Date(expectedOutput[i].timestamp)).format('YYYY-MM-DD'));
      expect(row[2]).toEqual(expectedOutput[i].diff[0].oldValue);
      expect(row[3]).toEqual(expectedOutput[i].diff[0].newValue);
    }
    for (let i = 0; i < rows.length; i++) {
      const row = rows.at(i);
      expect(row.key()).toEqual(expectedOutput[i].id);
    }
  });

  it('should render correct column name for ID', () => {
    expect(wrapper.find({ 'data-testid': 'id' }).text()).toEqual(USERS);
  });
});

describe('sortData', () => {
  let wrapper;

  const data = [
    {
      id: '8bd0166f-f0c6-48fd-9fcd-a17e76eb1e92',
      timestamp: new Date('2020/2/15').getTime(),
      diff: [{ field: 'name', oldValue: 'Bruce', newValue: 'Nick' }],
    },
    {
      id: 'e28d290a-a2f2-48c2-9001-ff43884e271b',
      timestamp: new Date('2020/2/14').getTime(),
      diff: [{ field: 'name', oldValue: 'John', newValue: 'Bruce' }],
    },
    {
      id: '0a75a2b3-be64-4aeb-ba4c-8ddb913791ac',
      timestamp: new Date('2020/2/16').getTime(),
      diff: [{ field: 'name', oldValue: 'Nick', newValue: 'Michel' }],
    },
  ];

  const sortData = jest.spyOn(sorter, 'sortData');

  beforeEach(() => {
    wrapper = mount(<TableComponent data={data} type={USERS} />);
  });

  it('should run sortData on load', () => {
    expect(sortData).toHaveBeenCalledTimes(1);
    expect(sortData).toHaveBeenCalledWith(data, DESCENDING);
  });

  it('should run sortData when clicked on date column', () => {
    expect(sortData).toHaveBeenCalledTimes(1);
    expect(sortData).toHaveBeenCalledWith(data, DESCENDING);
    const sortLabel = wrapper.find(TableSortLabel);
    sortLabel.simulate('click');
    expect(sortData).toHaveBeenCalledTimes(2);
    expect(sortData).toHaveBeenCalledWith(data, ASCENDING);
  });
});
