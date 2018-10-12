// LIBRARIES
import React, { Component } from 'react';
import { message } from 'antd';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

// COMPONENTS
import AdvanceTable from "components/Tables/AdvanceTable";
import HeaderForm from "components/Forms/HeaderForm";

// HELPER FUNCTIONS
import { customAction } from 'actions';



class PhotoSliderList extends Component {

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
          title="Photo Slider"
          action={()=> history.push({ pathname: `${match.url}/create` })}
          actionBtnName="Add Content"
        />
        <AdvanceTable 
            keyValue="photoslider_uuid"
            url={{ 
              //default: 'admin?page=1&page_size=10&_sort_by=create_dt&_sort_order=desc'
              apiDelete: 'photoSliderBatchDelete',
              default: 'photoSlider',
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
                  dataIndex: 'type',
                  key: 'email',
                  sortByValue: 'promotion_id',
                  sorter: true,
                  filters:[]
                },
                {
                  title: 'Start Date',
                  dataIndex: 'date_start',
                  key: 'date_start',
                  sorter: true,
                  filters:[],
                  width: 150
                },
                {
                  title: 'End Date',
                  dataIndex: 'end_start',
                  key: 'end_start',
                  sortByValue: 'date_end',
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

PhotoSliderList = connect(
  state => ({
    //user: state.viewUser.data,
    //status: state.viewUser.code,
    //responseMsg: state.viewUser.messages
  }),
  { customAction }
)(PhotoSliderList);

export default PhotoSliderList;