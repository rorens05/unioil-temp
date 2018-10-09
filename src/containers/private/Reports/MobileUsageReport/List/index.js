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
          title="Card Types"
        />
        <AdvanceTable 
            updating = { this.state.updating }
            keyValue="payment_uuid"
            url={{ 
              default: 'reportTopUp',
              filter: '?page=1&page_size=10&_sort_by=create_dt&_sort_order=desc',
              csv: { path :'/reportTopUpExport', fileName: 'TopUpUsageReport' }
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
                    if(moment(date).format("DD-MMM-YYYY") !== "Invalid date")
                      return moment(date).format("DD-MMM-YYYY")
                  },
                },
                {
                  title: 'Active Registered Users',
                  dataIndex: 'time',
                  key: 'time',
                  sorter: true,
                  filters:[],
                },
                {
                  title: 'Inactive Registered Users',
                  dataIndex: 'card_number',
                  key: 'card_number',
                  sorter: true,
                  filters:[],
                },
                {
                  title: 'Locked Registered Users',
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

MobileList = connect(
  state => ({
    //user: state.viewUser.data,
    //status: state.viewUser.code,
    //responseMsg: state.viewUser.messages
  }),
  { customAction }
)(MobileList);

export default MobileList;