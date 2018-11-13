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

class TermAndPrivacyList extends Component {
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
          isDropDown
          title={`Terms & Privacy`}
          actionPrivacy={()=> history.push({ pathname: `${match.url}/create/1` }) }
          actionTerms={()=> history.push({ pathname: `${match.url}/create/2` })}
          actionBtnName="Add User"
        />
        <AdvanceTable 
            updating = { this.state.updating }
            keyValue="tp_uuid"
            url={{ 
              //default: 'admin?page=1&page_size=10&_sort_by=create_dt&_sort_order=desc'
              apiDelete: 'TermsAndPrivacyBatchDelete',
              default: 'TermsAndPrivacy',
              filter: '?page=1&page_size=10&_sort_by=create_dt&_sort_order=desc'
            }}
            filterValues ={["role", "status"]}
            columns={
              [
                {
                  title: 'Title',
                  dataIndex: 'title',
                  key: 'title',
                  sorter: true,
                  filters: [],
                  width: "20%",
                },
                {
                  title: 'Details',
                  dataIndex: 'details',
                  key: 'details',
                  sorter: true,
                  filters:[],
                  render: (text, record) => (
                    <div style={{ width: '490px', whiteSpace: 'noWrap', 
                        overflow: 'hidden',  textOverflow: 'ellipsis'
                    }}>
                      {record && record.details}
                    </div>
                  )
                },
                {
                  title: 'Type',
                  dataIndex: 'type',
                  key: 'type',
                  width: "10%",
                  sorter: true,
                  filters:[],
                  render: (text, record) => (
                    <span >
                      {record && record.type ==  1 ? "Terms": "Privacy"}
                    </span>
                  )
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

TermAndPrivacyList = connect(
  state => ({
    //user: state.viewUser.data,
    //status: state.viewUser.code,
    //responseMsg: state.viewUser.messages
  }),
  { customAction }
)(TermAndPrivacyList);

export default TermAndPrivacyList;