 
// LIBRARIES
import React, { Component } from 'react';
import { notification, Icon, message } from "antd"
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

// COMPONENTS
import AdvanceTable from "components/Tables/AdvanceTable";
import HeaderForm from "components/Forms/HeaderForm";

// HELPER FUNCTIONS
import { API_UNI_OIL } from "utils/Api";
import { customAction } from 'actions';

class UserManagementList extends Component {


  delete =(admin_uuid)=> {
    const { history } = this.props;
    API_UNI_OIL.delete(`admin/${admin_uuid}`)        
    .then((response) => {
      history.push({ pathname: '/' })
      message.info('Succesfully delete record.');
    })
    .catch(({response: error}) => {
      notification.error({ message: "Error", description: error.data.message , duration: 20, });
    }); 
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
            keyValue="admin_uuid"
            url={{ 
              //default: 'admin?page=1&page_size=10&_sort_by=create_dt&_sort_order=desc'
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
                  filters: []
                },
                {
                  title: 'First Name',
                  dataIndex: 'firstname',
                  key: 'firstname',
                  sorter: true,
                  filters:[]
                },
                {
                  title: 'Last Name',
                  dataIndex: 'lastname',
                  key: 'lastname',
                  sorter: true,
                  filters:[],
                  width: 150
                },
                {
                  title: 'User Role',
                  dataIndex: 'role',
                  key: 'role',
                  sorter: true,
                  filters: [
                    { text: 'Administrator', value: 'Administrator' }
                  ]
                },
                {
                  title: 'Email',
                  dataIndex: 'email',
                  key: 'email',
                  sorter: true,
                  width: 110,
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
                  width: 110,
                  filters: [
                    { text: 'Active', value: 1 },
                    { text: 'Inactive', value: 2 },
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

UserManagementList = connect(
  state => ({
    //user: state.viewUser.data,
    //status: state.viewUser.code,
    //responseMsg: state.viewUser.messages
  }),
  { customAction }
)(UserManagementList);

export default UserManagementList;