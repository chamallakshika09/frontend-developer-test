import React from 'react';
import { mount } from 'enzyme';
import api from '../../lib/api';
import { act } from 'react-dom/test-utils';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import Footer from './Footer';

let wrapper;

describe('Conditional rendering for useReducer state', () => {
  const mockGetUsersDiff = jest.fn();
  const dispatch = jest.fn();

  beforeEach(() => {
    mockGetUsersDiff.mockClear();
    api.getUsersDiff = mockGetUsersDiff;
  });

  describe('isLoading true', () => {
    beforeEach(async () => {
      await act(async () => {
        wrapper = mount(<Footer isLoading={true} isError={false} dispatch={dispatch} getData={api.getUsersDiff} />);
      });
    });

    it('should render table and loading spinner', () => {
      const spinner = wrapper.find(CircularProgress);
      const button = wrapper.find(Button);
      const text = wrapper.find(Typography);
      expect(spinner.exists()).toBe(true);
      expect(button.exists()).toBe(false);
      expect(text.exists()).toBe(false);
    });
  });

  describe('isError true', () => {
    beforeEach(async () => {
      await act(async () => {
        wrapper = mount(<Footer isLoading={false} isError={true} dispatch={dispatch} getData={api.getUsersDiff} />);
      });
    });

    it('should render table, warning text and retry button', () => {
      const spinner = wrapper.find(CircularProgress);
      const button = wrapper.find(Button);
      const text = wrapper.find(Typography);
      expect(spinner.exists()).toBe(false);
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
        wrapper = mount(<Footer isLoading={false} isError={false} dispatch={dispatch} getData={api.getUsersDiff} />);
      });
    });

    it('should render table and load more button', () => {
      const spinner = wrapper.find(CircularProgress);
      const button = wrapper.find(Button);
      const text = wrapper.find(Typography);
      expect(spinner.exists()).toBe(false);
      expect(button.exists()).toBe(true);
      expect(text.exists()).toBe(false);
      expect(button.text()).toEqual('Load more');
      expect(button.text()).not.toEqual('Retry');
    });
  });
});

describe('fetchData method calls', () => {
  const mockGetUsersDiff = jest.fn();
  const dispatch = jest.fn();

  beforeEach(() => {
    mockGetUsersDiff.mockClear();
    api.getUsersDiff = mockGetUsersDiff;
  });

  it('should call fetchData method when clicked on load more button', () => {
    wrapper = mount(<Footer isLoading={false} isError={false} dispatch={dispatch} getData={api.getUsersDiff} />);

    const button = wrapper.find(Button);
    expect(button.text()).toEqual('Load more');
    button.simulate('click');
    expect(mockGetUsersDiff).toHaveBeenCalledTimes(1);
  });

  it('should call fetchData method when clicked on retry button', () => {
    wrapper = mount(<Footer isLoading={false} isError={true} dispatch={dispatch} getData={api.getUsersDiff} />);

    const button = wrapper.find(Button);
    expect(button.text()).toEqual('Retry');
    button.simulate('click');
    expect(mockGetUsersDiff).toHaveBeenCalledTimes(1);
  });
});
