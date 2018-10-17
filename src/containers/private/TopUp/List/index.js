 // LIBRARIES
import React, { Component } from 'react';
import { Menu, Dropdown, notification, Icon, message } from "antd"
import { connect } from "react-redux";

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

  render() {
    const { match, history } = this.props;

    return (
      <div style={{border:'1px solid #E6ECF5'}}>
        <HeaderForm 
          title="Top-Up"
          action={()=> history.push({ pathname: `${match.url}/create` })}
          actionBtnName="Add"
        />
        <AdvanceTable 
            updating = { this.state.updating }
            keyValue="topup_uuid"
            url={{ 
              apiDelete: 'topUpBatchDelete',
              default: 'topUp',
              filter: '?page=1&page_size=10&_sort_by=create_dt&_sort_order=desc'
            }}
            filterValues ={["role", "status"]}
            columns={
              [
                {
                  title: 'Fee Code',
                  dataIndex: 'fee_code',
                  key: 'fee_code',
                  sorter: true,
                  filters: [],
                  width: "23%",
                },
                {
                  title: 'Name',
                  dataIndex: 'name',
                  key: 'name',
                  sorter: true,
                  filters:[],
                  width: "23%",
                },
                {
                  title: 'Value',
                  dataIndex: 'amount',
                  key: 'amount',
                  sorter: true,
                  filters:[],
                  width: "20%",
                },
                {
                  title: 'Type',
                  dataIndex: 'type',
                  key: 'type',
                  sorter: true,
                  filters:[],
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
                      url: '/top-up/edit'
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
                      url: '/top-up/view'
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