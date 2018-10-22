 // LIBRARIES
import React, { Component } from 'react';
import { Menu, Dropdown, notification, Icon, message } from "antd"
import { connect } from "react-redux";
import moment from 'moment'

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
    
  }

  render() {
    const { match, history } = this.props;

    return (
      <div style={{border:'1px solid #E6ECF5'}}>
        <HeaderForm 
          title="Top-Up Usage Report"
        />
        <AdvanceTable 
            updating = { this.state.updating }
            keyValue="payment_uuid"
            url={{ 
              default: 'reportTopUp',
              filter: '?page=1&page_size=10&_sort_by=create_dt&_sort_order=desc',
              csv: { path :'/reportTopUpExport', fileName: 'TopUpUsageReport' }
            }}
            isEmptyMessagePopUp
            filterValues ={["role", "status"]}
            columns={
              [
                {
                  title: 'Transaction Date & Time',
                  dataIndex: 'date',
                  key: 'date',
                  sortByValue: 'paid_at',
                  sorter: true,
                  filters: [],
                  width: "20%",
                },
                {
                  title: 'Card Number',
                  dataIndex: 'card_number',
                  key: 'card_number',
                  sorter: true,
                  filters:[],
                },
                {
                  title: 'Top-up Amount',
                  dataIndex: 'amount',
                  key: 'amount',
                  sorter: true,
                  filters:[],
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