import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import MainRouter from './MainRouter';

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  describe('render()', () => {
    it('renders the Box', () => {
      expect(wrapper.find({ 'data-testid': 'app-box' })).toHaveLength(1);
    });
    it('renders the MainRouter', () => {
      expect(wrapper.find(MainRouter)).toHaveLength(1);
    });
  });
});
