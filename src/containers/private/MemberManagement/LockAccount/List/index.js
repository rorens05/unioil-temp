// LIBRARIES
import React, { Component } from 'react';
import { message } from 'antd';
import { connect } from "react-redux";
import moment from 'moment'

// COMPONENTS
import AdvanceTable from "components/Tables/AdvanceTable";
import HeaderForm from "components/Forms/HeaderForm";

// HELPER FUNCTIONS
import { customAction } from 'actions';



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
              default: 'member?_locked=1&_sort_by=card_number&_sort_order=asc',
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
                  width: "18%",
                },
                {
                  title: 'First Name',
                  dataIndex: 'firstname',
                  key: 'firstname',
                  sorter: true,
                  filters:[],
                  width: "15%",
                },
                {
                  title: 'Last Name',
                  dataIndex: 'lastname',
                  key: 'lastname',
                  sorter: true,
                  filters:[],
                  width: "15%",
                },
                {
                  title: 'Birthday',
                  dataIndex: 'birthdate',
                  key: 'birthdate',
                  sorter: true,
                  width: "18%",
                  render: date => {
                    if(moment(date).format("DD-MMM-YYYY") !== "Invalid date")
                      return moment(date).format("DD-MMM-YYYY")
                  },
                },
                {
                  title: 'Card Type',
                  dataIndex: 'card_type',
                  key: 'card_type',
                  sorter: true,
                  width: "18%",
                },
                {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                  //sorter: true,
                  width: "10%",
                  render: (text, record) => (
                    <span>
                      {record && record.status ==  "locked" ? "Locked" : "Locked"}
                    </span>
                  )
                },
                {
                  title: 'Action',
                  dataIndex: 'action',
                  key: 'action',
                  width: 100,
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