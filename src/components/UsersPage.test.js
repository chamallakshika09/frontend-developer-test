import React from 'react';
import { shallow } from 'enzyme';
import UsersPage from './UsersPage';
import TableComponent from './TableComponent';

describe('render', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UsersPage />);
  });

  it('renders the TableComponent', () => {
    expect(wrapper.find(TableComponent)).toHaveLength(1);
  });
});
