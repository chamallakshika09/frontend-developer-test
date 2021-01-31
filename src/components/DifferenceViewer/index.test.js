import React from 'react';
import { mount } from 'enzyme';
import api from '../../lib/api';
import DifferenceViewer from './';
import { USERS } from '../../utils/types';
import { act } from 'react-dom/test-utils';

let wrapper;

describe('render', () => {
  beforeEach(() => {
    wrapper = mount(<DifferenceViewer getData={api.getUsersDiff} type={USERS} />);
  });

  it('should render table component', () => {
    expect(wrapper.find({ 'data-testid': 'table' })).toHaveLength(1);
  });

  it('should render footer', () => {
    expect(wrapper.find({ 'data-testid': 'footer' })).toHaveLength(1);
  });
});

describe('fetchData method calls', () => {
  const mockGetUsersDiff = jest.fn();

  beforeEach(async () => {
    mockGetUsersDiff.mockClear();
    api.getUsersDiff = mockGetUsersDiff;
    await act(async () => {
      wrapper = mount(<DifferenceViewer getData={api.getUsersDiff} type={USERS} />);
    });
  });

  it('should call fetchData method on mount', () => {
    expect(mockGetUsersDiff).toHaveBeenCalledTimes(1);
  });
});
