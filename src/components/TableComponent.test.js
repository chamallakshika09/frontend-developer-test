import React from 'react';
import { mount } from 'enzyme';
import api from '../lib/api';
import TableComponent from './TableComponent';
import { act } from 'react-dom/test-utils';
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableSortLabel,
  Typography,
} from '@material-ui/core';

let wrapper;

describe('getProjectsDiff calls', () => {
  const mockGetProjectsDiff = jest.fn();

  beforeEach(async () => {
    mockGetProjectsDiff.mockClear();
    api.getProjectsDiff = mockGetProjectsDiff;
    await act(async () => {
      wrapper = mount(<TableComponent getData={api.getProjectsDiff} />);
    });
  });

  it('should call getProjectsDiff on app mount', () => {
    expect(mockGetProjectsDiff).toHaveBeenCalled();
  });
});

describe('getUsersDiff calls', () => {
  const mockGetUsersDiff = jest.fn();

  beforeEach(async () => {
    mockGetUsersDiff.mockClear();
    api.getUsersDiff = mockGetUsersDiff;
    await act(async () => {
      wrapper = mount(<TableComponent getData={api.getUsersDiff} />);
    });
  });

  it('should call getUsersDiff on app mount', () => {
    expect(mockGetUsersDiff).toHaveBeenCalled();
  });
});

describe('Conditional rendering for useReducer state', () => {
  const mockGetUsersDiff = jest.fn();

  beforeEach(() => {
    mockGetUsersDiff.mockClear();
    api.getUsersDiff = mockGetUsersDiff;
  });

  describe('isLoading true', () => {
    beforeEach(async () => {
      await act(async () => {
        const mockUseReducer = jest.fn().mockReturnValue([{ isLoading: true, isError: false, data: [] }, jest.fn()]);
        React.useReducer = mockUseReducer;
        wrapper = mount(<TableComponent getData={api.getUsersDiff} />);
      });
    });

    it('should render table and loading spinner', () => {
      const spinner = wrapper.find(CircularProgress);
      const button = wrapper.find(Button);
      const table = wrapper.find(Table);
      const text = wrapper.find(Typography);
      expect(spinner.exists()).toBe(true);
      expect(table.exists()).toBe(true);
      expect(button.exists()).toBe(false);
      expect(text.exists()).toBe(false);
    });
  });

  describe('isError true', () => {
    beforeEach(async () => {
      await act(async () => {
        const mockUseReducer = jest.fn().mockReturnValue([{ isLoading: false, isError: true, data: [] }, jest.fn()]);
        React.useReducer = mockUseReducer;
        wrapper = mount(<TableComponent getData={api.getUsersDiff} />);
      });
    });

    it('should render table, warning text and retry button', () => {
      const spinner = wrapper.find(CircularProgress);
      const button = wrapper.find(Button);
      const table = wrapper.find(Table);
      const text = wrapper.find(Typography);
      expect(spinner.exists()).toBe(false);
      expect(table.exists()).toBe(true);
      expect(button.exists()).toBe(true);
      expect(text.exists()).toBe(true);
      expect(button.text()).not.toEqual('Load more');
      expect(button.text()).toEqual('Retry');
      expect(text.text()).toEqual('We had problems fetching your data. Please try again.');
    });
  });

  describe('isLoading and isError are both false', () => {
    beforeEach(async () => {
      await act(async () => {
        const mockUseReducer = jest.fn().mockReturnValue([{ isLoading: false, isError: false, data: [] }, jest.fn()]);
        React.useReducer = mockUseReducer;
        wrapper = mount(<TableComponent getData={api.getUsersDiff} />);
      });
    });

    it('should render table and load more button', () => {
      const spinner = wrapper.find(CircularProgress);
      const button = wrapper.find(Button);
      const table = wrapper.find(Table);
      const text = wrapper.find(Typography);
      expect(spinner.exists()).toBe(false);
      expect(table.exists()).toBe(true);
      expect(button.exists()).toBe(true);
      expect(text.exists()).toBe(false);
      expect(button.text()).toEqual('Load more');
      expect(button.text()).not.toEqual('Retry');
    });
  });
});

describe('Table data', () => {
  const mockGetUsersDiff = jest.fn();

  beforeEach(() => {
    mockGetUsersDiff.mockClear();
    api.getUsersDiff = mockGetUsersDiff;

    const mockUseReducer = jest.fn().mockReturnValue([
      {
        isLoading: false,
        isError: false,
        data: [
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
        ],
      },
      jest.fn(),
    ]);
    React.useReducer = mockUseReducer;
  });

  it('should sort data in descending order at load', async () => {
    await act(async () => {
      wrapper = mount(<TableComponent getData={api.getUsersDiff} />);
    });

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
    }
  });

  it('should sort data in ascending order when order state is asc', async () => {
    await act(async () => {
      const setOrder = jest.fn();
      React.useState = jest.fn(() => ['asc', setOrder]);
      wrapper = mount(<TableComponent getData={api.getUsersDiff} />);
    });

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
    }
  });
});

describe('setOrder function', () => {
  const mockGetUsersDiff = jest.fn();

  beforeEach(() => {
    mockGetUsersDiff.mockClear();
    api.getUsersDiff = mockGetUsersDiff;

    const mockUseReducer = jest.fn().mockReturnValue([
      {
        isLoading: false,
        isError: false,
        data: [
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
        ],
      },
      jest.fn(),
    ]);
    React.useReducer = mockUseReducer;
  });

  it('should update order state to asc when value of order is desc, after clicking on date header', async () => {
    let setOrder;

    await act(async () => {
      setOrder = jest.fn();
      React.useState = jest.fn(() => ['desc', setOrder]);
      wrapper = mount(<TableComponent getData={api.getUsersDiff} />);
    });

    const sortLabel = wrapper.find(TableSortLabel);
    sortLabel.simulate('click');
    expect(setOrder).toHaveBeenCalledTimes(1);
    expect(setOrder).toHaveBeenCalledWith('asc');
  });

  it('should update order state to desc when value of order is asc, after clicking on date header', async () => {
    let setOrder;

    await act(async () => {
      setOrder = jest.fn();
      React.useState = jest.fn(() => ['asc', setOrder]);
      wrapper = mount(<TableComponent getData={api.getUsersDiff} />);
    });

    const sortLabel = wrapper.find(TableSortLabel);
    sortLabel.simulate('click');
    expect(setOrder).toHaveBeenCalledTimes(1);
    expect(setOrder).toHaveBeenCalledWith('desc');
  });
});

describe('fetchData method calls', () => {
  const mockGetUsersDiff = jest.fn();

  beforeEach(() => {
    mockGetUsersDiff.mockClear();
    api.getUsersDiff = mockGetUsersDiff;
  });

  it('should call fetchData method when clicked on load more button', async () => {
    await act(async () => {
      const mockUseReducer = jest.fn().mockReturnValue([{ isLoading: false, isError: false, data: [] }, jest.fn()]);
      React.useReducer = mockUseReducer;
      wrapper = mount(<TableComponent getData={api.getUsersDiff} />);
    });

    expect(mockGetUsersDiff).toHaveBeenCalledTimes(1);
    const button = wrapper.find(Button);
    expect(button.text()).toEqual('Load more');
    button.simulate('click');
    expect(mockGetUsersDiff).toHaveBeenCalledTimes(2);
  });

  it('should call fetchData method when clicked on retry button', async () => {
    await act(async () => {
      const mockUseReducer = jest.fn().mockReturnValue([{ isLoading: false, isError: true, data: [] }, jest.fn()]);
      React.useReducer = mockUseReducer;
      wrapper = mount(<TableComponent getData={api.getUsersDiff} />);
    });

    expect(mockGetUsersDiff).toHaveBeenCalledTimes(1);
    const button = wrapper.find(Button);
    expect(button.text()).toEqual('Retry');
    button.simulate('click');
    expect(mockGetUsersDiff).toHaveBeenCalledTimes(2);
  });
});
