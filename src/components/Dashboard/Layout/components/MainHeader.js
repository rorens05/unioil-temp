import React from "react";
import { Layout, Icon } from "antd";
import { connect } from "react-redux";
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import HeaderDropdown from './HeaderDropdown';

const { Header } = Layout;


const HeaderLink = styled(Link)`
  /* This renders the buttons above... Edit me! */
  padding: 0 10px;
    display: inline-block;
    vertical-align: top;


    cursor: pointer;
    -webkit-transition: all .3s,padding 0s;
    transition: all .3s,padding 0s;
    
  &:hover {
    background-color: #1890ff;
    color: #fff
  }
`




const RightHeader = styled.div`
  /* This renders the buttons above... Edit me! */
  float: right;
 

`

const IconTrigger = styled(Icon)`
  /* This renders the buttons above... Edit me! */
    font-size: 20px;
    line-height: 69px;
    cursor: pointer;
    -webkit-transition: all .3s,padding 0s;
    transition: all .3s,padding 0s;
    padding: 0 24px;
    
  &:hover {
  color: #1890ff;
  }
`

function MainHeader(props) {
  const {
    collapsed,
    toggle,
  } = props

  return (
    <Header style={{ background: '#fff', padding: 0, height: '65px', lineHeight: '69px' }}>
      <IconTrigger
        className="trigger"
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={toggle}
      />
      <RightHeader>
        <HeaderDropdown/>
      </RightHeader>
    </Header>
  );
}


MainHeader = connect(
  state => ({

    // pull initial values from account reducer
  }),
  // { customAction }
)(MainHeader);

export default MainHeader;
