 
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
        />
        <AdvanceTable 
            keyValue="lcard_uuid"
            url={{ 
              apiDelete: 'memberBatchDelete',
              default: 'member?_locked=1',
              filter: '?page=1&page_size=10&_sort_by=create_dt&_sort_order=desc'
            }}
            filterValues ={["role", "status"]}
            columns={
              [
                {
                  title: 'Card Number',
                  dataIndex: 'card_number',
                  key: 'card_number',
                  sorter: true,
                  filters: [],
                  width: "15%",
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
                  width: "12%",
                },
                {
                  title: 'Birtday',
                  dataIndex: 'birthdate',
                  key: 'birthdate',
                  sorter: true,
                  width: "15%",
                },
                {
                  title: 'Card Type',
                  dataIndex: 'card_type',
                  key: 'card_type',
                  sorter: true,
                  width: "15%",
                },
                {
                  title: 'Status',
                  dataIndex: 'civil_status',
                  key: 'civil_status',
                  sorter: true,
                  width: "10%",
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