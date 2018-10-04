 
// LIBRARIES
import React, { Component } from 'react';
import { Menu, Dropdown, notification, Icon, message } from "antd"
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

// COMPONENTS
import AdvanceTable from "components/Tables/AdvanceTable";
import HeaderForm from "components/Forms/HeaderForm";

// HELPER FUNCTIONS
import { API_UNI_OIL } from "utils/Api";
import { customAction } from 'actions';

class TopUpList extends Component {
  state= {
    updating: false,
  }

  delete =(admin_uuid)=> {
    
  }

  updateDropDown = async(e) => {
    let params = e.item.props.record;
    params = { admin_uuid : params.admin_uuid , status: params.status}
    try {
      const response = await API_UNI_OIL.post(`adminChangeStatus`,params);
      message.success("User Successfuly update status" );
      this.setState({ updating: !this.state.updating });
    } catch (error) {
      message.error("Something went wrong updating status.")
    }
  }

  render() {
    const { match, history } = this.props;

    return (
      <div style={{border:'1px solid #E6ECF5'}}>
        <HeaderForm 
          title="User Management"
          action={()=> history.push({ pathname: `${match.url}/create` })}
          actionBtnName="Add User"
        />
        <AdvanceTable 
            updating = { this.state.updating }
            keyValue="admin_uuid"
            url={{ 
              //default: 'admin?page=1&page_size=10&_sort_by=create_dt&_sort_order=desc'
              apiDelete: 'adminBatchDelete',
              default: 'admin',
              filter: '?page=1&page_size=10&_sort_by=create_dt&_sort_order=desc'
            }}
            filterValues ={["role", "status"]}
            columns={
              [
                {
                  title: 'Username',
                  dataIndex: 'username',
                  key: 'username',
                  sorter: true,
                  filters: [],
                  width: "13%",
                },
                {
                  title: 'First Name',
                  dataIndex: 'firstname',
                  key: 'firstname',
                  sorter: true,
                  filters:[],
                  width: "12%",
                },
                {
                  title: 'Last Name',
                  dataIndex: 'lastname',
                  key: 'lastname',
                  sorter: true,
                  filters:[],
                  width: 150,
                  width: "12%",
                },
                {
                  title: 'User Role',
                  dataIndex: 'role',
                  key: 'role',
                  sorter: true,
                  width: "13%",
                  filters: [
                    { text: 'Administrator', value: 'Administrator' }
                  ],
                  render: (text, record) => (
                    <span className={record.status === "Active" ? "dark-gray" : "inactive-label"}>
                      {record && record.role ==  1 ? "Admin": "Marketing Personnel"}
                    </span>
                  )
                },
                {
                  title: 'Email',
                  dataIndex: 'email',
                  key: 'email',
                  sorter: true,
                  width: "20%",
                  filters: [
                    { text: 'Active', value: 'Active' },
                    { text: 'Inactive', value: 'Inactive' },
                  ]
                },
                {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                  sorter: true,
                  filters: [
                    { text: 'Active', value: 'active' },
                    { text: 'Inactive', value: 'inactive' },
                  ],
                  width: "10%",
                  render: (text, record) => {
                    const menu = (
                      <Menu>
                        <Menu.Item key="active" onClick={this.updateDropDown} record={record}>Active</Menu.Item>
                        <Menu.Item key="inactive" onClick={this.updateDropDown} record={record}>Inactive</Menu.Item>
                      </Menu>
                    );
                    return(
                      <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                          {text} <Icon type="caret-down" theme="outlined"
                          style={{ position: "relative", top: -4, fontSize: 7 }} />
                        </a>
                      </Dropdown>
                    )
                  },
                },
                {
                  title: 'Action',
                  dataIndex: 'action',
                  key: 'action',
                  width: 150,
                  buttons: [
                    {
                      key: 'edit',
                      title: "Edit",
                      icon: 'edit',
                      url: '/user-management/edit'
                    },
                    {
                      key: 'delete',
                      title: "Delete",
                      icon: 'delete',
                      url: '',
                      action: this.delete
                    },
                    {
                      key: 'view',
                      title: "View",
                      icon: 'right-circle-o',
                      url: '/user-management/view'
                    }
                  ]
                },
              ]
            }
          />
      </div>
    );
  }
}

TopUpList = connect(
  state => ({
    //user: state.viewUser.data,
    //status: state.viewUser.code,
    //responseMsg: state.viewUser.messages
  }),
  { customAction }
)(TopUpList);

export default TopUpList;