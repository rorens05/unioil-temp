 
import React, { Component } from 'react';
import { message } from 'antd';
import { connect } from "react-redux";

import { customAction } from 'actions';
import AdvanceTable from "components/Tables/AdvanceTable";
import HeaderForm from "components/Forms/HeaderForm";

class LockedAccountList extends Component {

  componentDidMount() {
   
  }

  componentDidUpdate() {
  }

  render() {
    const { match, history } = this.props;

    return (
      <div style={{border:'1px solid #E6ECF5'}}>
        <HeaderForm 
          title="Locked Accounts"
          action={()=> {console.log('activate account')}}
          actionBtnName="Activate Account"
        />
        <AdvanceTable 
            keyValue="user_uuid"
            url={{ 
              default: 'users'
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
                      key: 'view',
                      title: "View",
                      icon: 'right-circle-o',
                      url: 'member-management/lock-account'
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

LockedAccountList = connect(
  state => ({
    //user: state.viewUser.data,
    //status: state.viewUser.code,
    //responseMsg: state.viewUser.messages
  }),
  { customAction }
)(LockedAccountList);

export default LockedAccountList;