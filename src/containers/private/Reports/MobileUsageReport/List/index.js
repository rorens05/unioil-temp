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

class MobileList extends Component {
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
          title="Mobile Usage Reports"
        />
        <AdvanceTable 
            updating = { this.state.updating }
            keyValue="payment_uuid"
            url={{ 
              default: 'reportMobileUsage',
              filter: '?page=1&page_size=10&_sort_by=create_dt&_sort_order=desc',
              csv: { path :'/reportMobileUsageExport', fileName: 'MobileUsageReport' }
            }}
            filterValues ={["role", "status"]}
            columns={
              [
                {
                  title: 'Date',
                  dataIndex: 'date',
                  key: 'date',
                  sorter: true,
                  filters: [],
                  width: "17%",
                  render: date => {
                    if(moment(date).format("MM/DD/YYYY") !== "Invalid date")
                      return moment(date).format("MM/DD/YYYY")
                  },
                },
                {
                  title: 'Active Registered Users',
                  dataIndex: 'active',
                  key: 'active',
                  sorter: true,
                  filters:[],
                },
                {
                  title: 'Inactive Registered Users',
                  dataIndex: 'inactive',
                  key: 'inactive',
                  sorter: true,
                  filters:[],
                },
                {
                  title: 'Locked Registered Users',
                  dataIndex: 'locked',
                  key: 'locked',
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

MobileList = connect(
  state => ({
    //user: state.viewUser.data,
    //status: state.viewUser.code,
    //responseMsg: state.viewUser.messages
  }),
  { customAction }
)(MobileList);

export default MobileList;