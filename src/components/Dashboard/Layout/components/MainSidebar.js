import React from "react";
import { Layout, Icon , Menu} from "antd";
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
 
const { SubMenu } = Menu;
const {  Sider } = Layout;



const LogoPlaceholder = styled.div`
  height: 32px;
  margin: 16px;
  background-image: url(${require("assets/img/logo_unioil.png")});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`


function MainSidebar(props) {

  const { collapsed, match, location, userInfo } = props;

  const navigation = [
    {
      key: 0 ,
      label: "User Management",
      path: "/user-management",
      icon: "team",
      access: userInfo && userInfo.role == 1 ? true : false,
    },
    {
      key: 4 ,
      label: "Member Management",
      path: "/member-management",
      icon: "credit-card",
      access: userInfo && userInfo.role == 1 ? true : false,
      child: [
        {
         key: 0.0 ,
         label:"Card Member",
         path:"/member-management/card-member",
         access:true
        },
        {
          key: 0.1 ,
          label:"Locked Accounts",
          path:"/member-management/lock-account",
          access:true
        },
      ],
    },
    {
      key: 8 ,
      label: "Home Page",
      path: "/home-page",
      icon: "home",
      access: true,
      child: [
        {
         key: 0.0 ,
         label:"Photo Slider",
         path:"/home-page/photo-slider",
         access:true
       },
     ],
    },
    {
      key: 3 ,
      label: "Promotions",
      path: "/promotions",
      icon: "tags",
      access: true,
    },
   
    {
      key: 2 ,
      label: "Top-Up",
      path: "/topup",
      icon: "plus-circle",
      access: userInfo && userInfo.role == 1 ? true : false
    },
    {
      key: 6 ,
      label: "About Us",
      path: "/about",
      icon: "info-circle",
      access: userInfo && userInfo.role == 1 ? true : false,
      child: [
        {
         key: 0.6 ,
         label:"Card Types",
         path:"/about/card-types",
         access:true
        },
        {
          key: 0.5 ,
          label:"Term & Privacy",
          path:"/about/term-privacy",
          access:true
        },
     ],
    },
    {
      key: 7 ,
      label: "Reports",
      path: "/reports",
      icon: "file-text",
      access: true,
      child: [
        {
         key: 0.7,
         label:"Registration Report",
         path:"/reports/registration-report",
         access:true
       },
       {
        key: 0.8 ,
        label:"Top-Up Usage Report",
        path:"/reports/top-up",
        access:true
       },
       {
        key: 0.9 ,
        label:"Mobile Usage Report",
        path:"/reports/mobile-report",
        access:true
       },
       {
        key: 0.10,
        label:"Station Rating Report",
        path:"/reports/station-rating",
        access:true
       },
     ],
    },
    {
      key: 8 ,
      label: "System Parameters",
      path: "/system-parameters",
      icon: "setting",
      access: true,
    },
  ]

  

  let newURL = location.pathname.split( '/' );
  let appendedUrl = newURL[2]
  if(appendedUrl == 'create' || appendedUrl == 'view' || appendedUrl == 'edit' ) appendedUrl = null
  let isSeondDaryPathExist = appendedUrl ? `/${appendedUrl}` : ''
  let secondaryURL = `${match.path}${isSeondDaryPathExist}`

  return (
    <Sider
      trigger={null}
      collapsible
      width={295} 
      collapsed={collapsed}
      style={{ background: '#fff', border: "solid 1px #e6ecf5" }}
    >
    {
      !collapsed 
      ? <div style={{padding: '12px 0', textAlign: 'center', borderBottom: '1px solid #e6ecf5'}}>
          <img
            src={ require("assets/img/logo_unioil.png") }
            style={{ height: 40 }}
          />
        </div> 
      : <LogoPlaceholder className="logo" />
    }
    
    <Menu 
      style={{ borderRight: !collapsed ? 0 : null, height: '560px', overflow: 'hidden auto', paddingTop: '17px'}}
      //inlineIndent={10}
      defaultOpenKeys={[match.path]}
      selectedKeys={[secondaryURL]}  
      mode="inline">
      {
        navigation.map((item) => { 
          if (item.access) {
              if (item.child) {
                return (
                  <SubMenu
                      key={item.path}
                      title={<span><Icon type={item.icon} /><span>{item.label}</span></span>}>
                    {
                      item.child.map((subItem) => { 
                          if (subItem.access) {
                            return (
                              <Menu.Item key={subItem.path} >
                                <Link to={subItem.path} style={{paddingLeft: '15px'}}>
                                  {subItem.icon && <Icon type={subItem.icon} /> }
                                  {subItem.label}
                                </Link>
                              </Menu.Item>
                            )
                          } else {
                            return null
                          }
                        })
                    }
                  </SubMenu>
                )
              } else {
                return (
                  <Menu.Item key={item.path}>
                  <Link to={item.path}>
                    {item.icon && <Icon type={item.icon} />}
                    <span>{item.label}</span>
                  </Link>
                </Menu.Item>
                )
              }
          } else {
            return null
          }
        })
      }
 
    </Menu>
  </Sider>
  );
}



export default withRouter(MainSidebar);

 
