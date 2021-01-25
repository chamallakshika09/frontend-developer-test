import React from 'react';
import { mount } from 'enzyme';
import UsersPage from './UsersPage';
import ProjectsPage from './ProjectsPage';
import PageNotFound from './PageNotFound';
import { MemoryRouter } from 'react-router-dom';
import MainRouter from './MainRouter';

jest.mock('./UsersPage');
jest.mock('./ProjectsPage');
jest.mock('./PageNotFound');

let wrapper;

describe('routing', () => {
  test('should render UsersPage on default route', () => {
    UsersPage.mockImplementation(() => <div>Mock Users Page</div>);
    wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <MainRouter />
      </MemoryRouter>
    );
    const page = wrapper.find(UsersPage);
    expect(page.exists()).toBe(true);
    expect(page.text()).toEqual('Mock Users Page');
  });
  test('should render UsersPage on users route', () => {
    UsersPage.mockImplementation(() => <div>Mock Users Page</div>);
    wrapper = mount(
      <MemoryRouter initialEntries={['/users']}>
        <MainRouter />
      </MemoryRouter>
    );
    const page = wrapper.find(UsersPage);
    expect(page.exists()).toBe(true);
    expect(page.text()).toEqual('Mock Users Page');
  });
  test('should render ProjectsPage on projects route', () => {
    ProjectsPage.mockImplementation(() => <div>Mock Projects Page</div>);
    wrapper = mount(
      <MemoryRouter initialEntries={['/projects']}>
        <MainRouter />
      </MemoryRouter>
    );
    const page = wrapper.find(ProjectsPage);
    expect(page.exists()).toBe(true);
    expect(page.text()).toEqual('Mock Projects Page');
  });
  test('should render PageNotFound for invalid route', () => {
    PageNotFound.mockImplementation(() => <div>Mock Page Not Found</div>);
    wrapper = mount(
      <MemoryRouter initialEntries={['/random']}>
        <MainRouter />
      </MemoryRouter>
    );
    const page = wrapper.find(PageNotFound);
    expect(page.exists()).toBe(true);
    expect(page.text()).toEqual('Mock Page Not Found');
  });
});
