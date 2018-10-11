// LIBRARIES
import React, { Component } from 'react';
import { message } from 'antd';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import moment from 'moment'
 
// COMPONENTS
import AdvanceTable from "components/Tables/AdvanceTable";
import HeaderForm from "components/Forms/HeaderForm";
 
// HELPER FUNCTIONS
import { customAction } from 'actions';


class DashboardList extends Component {

  componentDidMount() {
   
  }

  componentDidUpdate() {
  }

  delete =()=> {
    let success = true;
    if(success)
      message.info('Clicked on Yes.');
  }

  render() {
    const { match, history } = this.props;

    return (
      <div style={{border:'1px solid #E6ECF5'}}>
        <HeaderForm 
          title="Promotions"
          action={()=> history.push({ pathname: `${match.url}/create` })}
          actionBtnName="Add Content"
        />
        <AdvanceTable 
            keyValue="promotion_uuid"
            url={{ 
              apiDelete: 'promotionBatchDelete',
              default: 'promotion',
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
                  filters: []
                },
                {
                  title: 'Type',
                  dataIndex: 'promo_type',
                  key: 'promo_type',
                  sorter: true,
                  render: promo=> `${promo.name}`,
                  filters:[],
                  width: 150
                },
                {
                  title: 'Start Date',
                  dataIndex: 'date_start',
                  key: 'date_start',
                  sorter: true,
                  render: date => {
                    if(moment(date).format("DD-MMM-YYYY") !== "Invalid date")
                      return moment(date).format("DD-MMM-YYYY")
                  },
                  filters:[],
                  width: 150
                },
                {
                  title: 'End Date',
                  dataIndex: 'date_end',
                  key: 'date_end',
                  sorter: true,
                  render: date => {
                    if(moment(date).format("DD-MMM-YYYY") !== "Invalid date")
                      return moment(date).format("DD-MMM-YYYY")
                  },
                  filters:[],
                  width: 150
                },
                {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                  sorter: false,
                  width: 110,
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

DashboardList = connect(
  state => ({
    //user: state.viewUser.data,
    //status: state.viewUser.code,
    //responseMsg: state.viewUser.messages
  }),
  { customAction }
)(DashboardList);

export default DashboardList;