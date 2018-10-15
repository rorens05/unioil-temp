import React from "react";
import { Breadcrumb, Icon } from 'antd';

// import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';


function MainBreadcrumbs(props) {
  const {
    pageRoutes,
    // match,
    location,
    root
  } = props;

  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((route, index) => {
  const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
  const routeCompare = pageRoutes.find((myRoute) => myRoute.path === url)
  const paramsId = pathSnippets[pathSnippets.length - 1]
 
    if (routeCompare) {
      if (routeCompare.params) {
        return (
          <Breadcrumb.Item key={index}>
            <Link to={`${url}/${paramsId}`}>
              {routeCompare.name}
            </Link>
          </Breadcrumb.Item>
        );
      } else {
        return (
          <Breadcrumb.Item key={index}>
            <Link to={url}>
              {routeCompare.name}
            </Link>
          </Breadcrumb.Item>
        );
      }
    }

    // return <Breadcrumb.Item key={index}></Breadcrumb.Item>;
  })
  if (root) {
    return (
      <Breadcrumb 
        separator={<Icon type="right" style={{fontSize: '10px', opacity: 0.6}} />} 
        routeComparestyle={{ padding: '11px 24px 9px', fontSize: '12px' }}
      >
        <Breadcrumb.Item>
          <Link to='/my-profile'>
            <Icon type="home" /> {` Home`}
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  } else {
    return (
      <Breadcrumb 
        separator={<Icon type="right" style={{fontSize: '10px', opacity: 0.6}} />} 
        style={{ padding: '11px 24px 9px', fontSize: '12px' }}
      >
        <Breadcrumb.Item>
          <Link to='/my-profile'>
            <Icon type="home" /> {` Home`}
          </Link>
        </Breadcrumb.Item>
        {extraBreadcrumbItems}
      </Breadcrumb>
    );
  }

}

export default withRouter(MainBreadcrumbs);