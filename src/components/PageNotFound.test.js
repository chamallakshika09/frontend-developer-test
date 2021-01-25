import React from 'react';
import { shallow } from 'enzyme';
import PageNotFound from './PageNotFound';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

describe('render', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PageNotFound />);
  });

  it('renders the Typography', () => {
    expect(wrapper.find(Typography)).toHaveLength(2);
  });
  
  it('renders the Link', () => {
    expect(wrapper.find(Link)).toHaveLength(1);
  });
});
