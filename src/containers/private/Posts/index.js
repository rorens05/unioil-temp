//@flow
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PostsList from './List';
import PostsCreate from './Create';
import PostsView from './View';
import PostsEdit from './Edit';


import MainContent from 'components/Dashboard/Layout/components/MainContent';


class Posts extends Component {
  state = {
    pageRoutes: [
      {
        path: `${this.props.match.url}`,
        name: "Posts",
        component: PostsList,        
      },
      {
        path: `${this.props.match.url}/create`,
        name: "Create User",
        component: PostsCreate,
      },
      {
        path: `${this.props.match.url}/view`,
        params: ':id',
        name: "View User",
        component: PostsView,
      },
      {
        path: `${this.props.match.url}/edit`,
        params: ':id',
        name: "Edit User",
        component: PostsEdit,
      }
    ]
  }


  render() {
    const { location } = this.props;
    const { pageRoutes } = this.state;

    return (


      <MainContent pageRoutes={pageRoutes}>
        <Switch>
          {
            pageRoutes.map((route) => {
                if (route.params) {
                  return <Route key={route.path} exact path={`${route.path}/${route.params}`} component={route.component} />
                } else {
                  return <Route key={route.path} exact path={`${route.path}`} component={route.component} />
                }
              }
            )
          }
          <Redirect to={{
            pathname: `${location.pathname}`,
            state: { pageNotFound: true }
          }} />
        </Switch>
      </MainContent>

    );
  }
}

export default Posts;