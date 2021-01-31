import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  describe('render()', () => {
    it('renders the Box', () => {
      expect(wrapper.find({ 'data-testid': 'app-box' })).toHaveLength(1);
    });
    it('renders the Users DifferenceViewer', () => {
      expect(wrapper.find({ 'data-testid': 'users' })).toHaveLength(1);
    });
    it('renders the Projects DifferenceViewer', () => {
      expect(wrapper.find({ 'data-testid': 'projects' })).toHaveLength(1);
    });
  });
});
