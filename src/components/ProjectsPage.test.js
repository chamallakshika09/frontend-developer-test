import React from 'react';
import { shallow } from 'enzyme';
import TableComponent from './TableComponent';
import ProjectsPage from './ProjectsPage';

describe('render', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProjectsPage />);
  });

  it('renders the TableComponent', () => {
    expect(wrapper.find(TableComponent)).toHaveLength(1);
  });
});
