 
import React, { Component } from 'react';
import { message } from 'antd';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

import { customAction } from 'actions';
import AdvanceTable from "components/Tables/AdvanceTable";
import HeaderForm from "components/Forms/HeaderForm";

class DashboardList extends Component {

  componentDidMount() {
   
  }

  componentDidUpdate() {
  }

  delete =()=> {
    let success = true;
    if(success)
      message.info('Clicked on Yes.');
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
            keyValue="user_uuid"
            url={{ 
              default: 'admin?page=1&page_size=10&_sort_by=create_dt&_sort_order=desc'
            }}
            filterValues ={["role", "status"]}
            columns={
              [
                {
                  title: 'Name',
                  dataIndex: 'name',
                  key: 'name',
                  sorter: true,
                  filters: []
                },
                {
                  title: 'Username',
                  dataIndex: 'email',
                  key: 'email',
                  sorter: true,
                  filters:[]
                },
                {
                  title: 'Date Registered',
                  dataIndex: 'created_at',
                  key: 'created_at',
                  sorter: true,
                  filters:[],
                  width: 150
                },
                {
                  title: 'Role',
                  dataIndex: 'role_name',
                  key: 'role',
                  sorter: true,
                  filters: [
                    { text: 'Administrator', value: 'Administrator' }
                  ]
                },
                {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                  sorter: true,
                  width: 110,
                  filters: [
                    { text: 'Active', value: 'Active' },
                    { text: 'Inactive', value: 'Inactive' },
                  ]
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

DashboardList = connect(
  state => ({
    //user: state.viewUser.data,
    //status: state.viewUser.code,
    //responseMsg: state.viewUser.messages
  }),
  { customAction }
)(DashboardList);

export default DashboardList;