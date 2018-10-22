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

class StationList extends Component {
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
          title="Station Rating Report"
        />
        <AdvanceTable 
            updating = { this.state.updating }
            keyValue="payment_uuid"
            url={{ 
              default: 'reportStationRatings',
              filter: '?page=1&page_size=10&_sort_by=create_dt&_sort_order=desc',
              defaultWithFilter: 'reportStationRatings?_sort_by=created_at&_sort_order=desc',
              csv: { path :'/reportStationRatingsExport', fileName: 'StationRatingReport' }
            }}
            isEmptyMessagePopUp
            filterValues ={["role", "status"]}
            columns={
              [
                {
                  title: 'Transaction Date & Time',
                  dataIndex: 'date',
                  key: 'date',
                  sortByValue: 'created_at',
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
                  title: 'Sales Invoice',
                  dataIndex: 'invoice',
                  key: 'invoice',
                  sorter: true,
                  filters:[],
                  width: "20%",
                },
                {
                  title: 'Station',
                  dataIndex: 'station',
                  key: 'station',
                  sorter: true,
                  filters:[],
                },
                {
                  title: 'Ratings',
                  dataIndex: 'rate',
                  key: 'rate',
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

StationList = connect(
  state => ({
    //user: state.viewUser.data,
    //status: state.viewUser.code,
    //responseMsg: state.viewUser.messages
  }),
  { customAction }
)(StationList);

export default StationList;