import React from "react";
import { Layout } from 'antd';

import MainBreadcrumbs from './MainBreadcrumbs'
const { Content } = Layout;

function MainContent(props) {
  const {
    children,
    pageRoutes,
    root
  } = props;

  return (
    [
    <div key={1} style={{background: '#fff' , borderTop: '1px solid rgb(230, 236, 245)', marginBottom: '75px'}}>
      <MainBreadcrumbs root={root}  pageRoutes={pageRoutes} />
    </div>,
    <Content key={2} style={{ margin: '0 16px', padding: '0', background: '#fff', }}>
      {children}
    </Content>,
    ]
  );
}

export default MainContent;