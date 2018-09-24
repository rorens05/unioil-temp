import React, { Component } from "react";
import {  Icon, Avatar, Dropdown, Menu } from "antd";
import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { customAction } from 'actions'
import styled from 'styled-components';
 
const HeaderButton = styled.a`
  /* This renders the buttons above... Edit me! */
  padding: 0 10px;
    display: inline-block;
    vertical-align: top;


    cursor: pointer;
    -webkit-transition: all .3s,padding 0s;
    transition: all .3s,padding 0s;
    
  &:hover {
    background-color: rgb(243, 243, 243);
    color: #fff
  }
`


class HeaderDropdown extends Component {

  handleLogout = () => {
    this.props.customAction({type: 'LOGOUT'});
  }
  
  render() {

    const { history } = this.props;
    
    const menu = (
      <Menu style={{width: 150}} >
          <Menu.Item key="0">
              <a  
                onClick={()=> history.push("/my-profile")}
                role="button" 
                rel="noopener noreferrer" >
                  <Icon type="user" /> My Profile
              </a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item  key="1">
              <a 
                role="button" 
                onClick={this.handleLogout}>
                  <Icon type="logout" /> Logout
              </a>
            </Menu.Item>
          </Menu>
    );
    return (
      <Dropdown overlay={menu}>
        <HeaderButton role="button" style={{marginRight: 16, color: '#8E8E93'}} > 
          <Avatar size="small"  
            style={{ background: '#B8BBC9', marginRight: 5 }} icon="user" 
          />  Francine Narciso <Icon type="down" />
        </HeaderButton>
      </Dropdown>
    );
  }
}

HeaderDropdown = connect(
  state => ({
    //fetchData: state.fetchData
    // put initial values from account reducer
  }),
  { customAction }
)(HeaderDropdown)

export default withRouter(HeaderDropdown);
