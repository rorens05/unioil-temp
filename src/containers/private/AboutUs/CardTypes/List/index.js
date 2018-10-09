 // LIBRARIES
import React, { Component } from 'react';
import { Menu, Dropdown, notification, Icon, message } from "antd"
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

// COMPONENTS
import AdvanceTable from "components/Tables/AdvanceTable";
import HeaderForm from "components/Forms/HeaderForm";

// HELPER FUNCTIONS
import { API_UNI_OIL } from "utils/Api";
import { customAction } from 'actions';

class CardTypeList extends Component {
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
          title="Card Types"
          action={()=> history.push({ pathname: `${match.url}/create` })}
          actionBtnName="Add Card"
        />
        <AdvanceTable 
            updating = { this.state.updating }
            keyValue="cardtype_uuid"
            url={{ 
              //default: 'admin?page=1&page_size=10&_sort_by=create_dt&_sort_order=desc'
              apiDelete: 'cardTypeBatchDelete',
              default: 'cardType',
              filter: '?page=1&page_size=10&_sort_by=create_dt&_sort_order=desc'
            }}
            filterValues ={["role", "status"]}
            columns={
              [
                {
                  title: 'Card Code',
                  dataIndex: 'code',
                  key: 'code',
                  sorter: true,
                  filters: [],
                  width: "14%",
                },
                {
                  title: 'Card Type Description',
                  dataIndex: 'description',
                  key: 'description',
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
                      url: 'about-us/card-types/edit'
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
                      url: 'about-us/card-types/view'
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

CardTypeList = connect(
  state => ({
    //user: state.viewUser.data,
    //status: state.viewUser.code,
    //responseMsg: state.viewUser.messages
  }),
  { customAction }
)(CardTypeList);

export default CardTypeList;