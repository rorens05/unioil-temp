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

class RegistrationList extends Component {
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
          title="Registration Report"
        />
        <AdvanceTable 
            updating = { this.state.updating }
            keyValue="payment_uuid"
            url={{ 
              default: 'reportRegistration',
              filter: '?page=1&page_size=10&_sort_by=create_dt&_sort_order=desc',
              csv: { path :'/reportRegistrationExport', fileName: 'RegistrationReport' }
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
                  width: "20%",
                  render: date => {
                    if(moment(date).format("DD-MMM-YYYY") !== "Invalid date")
                      return moment(date).format("DD-MMM-YYYY")
                  },
                },
                {
                  title: 'No. of Activated Cards',
                  dataIndex: 'activated ',
                  key: 'activated',
                  sorter: true,
                  filters:[],
                },
                {
                  title: 'No. of Registered Members',
                  dataIndex: 'registered',
                  key: 'registered',
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

RegistrationList = connect(
  state => ({
    //user: state.viewUser.data,
    //status: state.viewUser.code,
    //responseMsg: state.viewUser.messages
  }),
  { customAction }
)(RegistrationList);

export default RegistrationList;