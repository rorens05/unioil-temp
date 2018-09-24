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


const navigation = [
  {
    key: 0 ,
    label: "User Management",
    path: "/user-management",
    icon: "team",
    access: true,
  },
  {
    key: 4 ,
    label: "Member Management",
    path: "/member-management",
    icon: "credit-card",
    access: true,
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
    // child: [
    //    {
    //     key: 0.0 ,
    //     label:"Top-Up",
    //     path:"/posts",
    //     icon: "close",
    //     access:true
    //   },
    //   {
    //     key: 1.0 ,
    //     label:"Create",
    //     path:"/posts/create",
    //     icon: "close",
    //     access:true
    //   },
    //   {
    //     key: 2.0 ,
    //     label:"User Role",
    //     path:"/posts/view/12",
    //     icon: "close",
    //     access:true
    //   },
    // ],
  },
 
  {
    key: 2 ,
    label: "Top-Up",
    path: "/topup",
    icon: "plus-circle",
    access: true
  },
  {
    key: 6 ,
    label: "About Us",
    path: "/about",
    icon: "info-circle",
    access: true,
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
    label: "System Preferences",
    path: "/system",
    icon: "setting",
    access: true,
  },
]


function MainSidebar(props) {
  const {
    collapsed,
    match,
    location
  } = props;







let parentRoute = location.pathname.split('/').filter(i => i)

let selectedMenu = ""
if (parentRoute.length > 2) {
  selectedMenu = `/${parentRoute[0]}/${parentRoute[1]}`
} else {
  selectedMenu = match.path
}
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
      defaultSelectedKeys={[match.path, location.pathname]} 
      selectedKeys={[ location.pathname,`${location.pathname}${location.search}`]} 
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

 
