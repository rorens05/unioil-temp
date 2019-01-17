// LIBRARIES
import React, { Component } from 'react';
import { notification, Menu , Dropdown, Icon } from 'antd';
import { connect } from "react-redux";
import moment from 'moment'

// COMPONENTS
import AdvanceTable from "components/Tables/AdvanceTable";
import HeaderForm from "components/Forms/HeaderForm";

// HELPER FUNCTIONS
import { customAction } from 'actions';
import { API_GET, API_POST, API_UNI_OIL } from "utils/Api"



class PhotoSliderList extends Component {

  state = {
    loading: false,
    mounted: false,
    photoSliderLimit: false
  }

  async componentDidMount () {

    try {
      let photoSlider = await API_UNI_OIL('photoSliderCount');
      if(photoSlider)
        this.setState({photoSliderLimit: false})
    } catch ({response:error}) {
      this.setState({photoSliderLimit: true})
    }


    try {

      let response = await API_GET('photoSlider');

      if(response.status == 200) {
        if(response.data && response.data.data) {
          this.setState({
            mounted: true
          })
        }
      }

    } catch ({response:error}) {
      notification.error({ 
        message: "Error", 
        description: <div>
          <div>Something went wrong loading data.</div>
        - {error && error.data && error.data.message}
        </div> , 
        duration: 3, 
      });

      this.setState({ mounted: false })
    }

  }

  delete =()=> {
    let success = true;
    // if(success)
    //   message.info('Clicked on Yes.');
  }

  dataResponse =(val)=> {
    if(val) {
      if(val < 10) {
        this.setState({photoSliderLimit: false})
      } else {
        this.setState({photoSliderLimit: true})
      }
    }
  }

  // updateDropDown = async(e) => {
  //   let params = e.item.props.record;
  //   //console.log(e.item.props.eventKey,' eventKey')
  // }

  render() {

    if(!this.state.mounted) return null;
    
    const { photoSliderLimit } = this.state;
    const { match, history } = this.props;

    return (
      <div style={{border:'1px solid #E6ECF5'}}>
        <HeaderForm 
          title="Photo Slider"
          action={()=> history.push({ pathname: `${match.url}/create` })}
          disabled={photoSliderLimit}
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
            dataResponse={this.dataResponse}
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
                  width: 150,
                  render: date_start => {
                    if(moment(date_start).format("DD-MMM-YYYY") !== "Invalid date")
                      return moment(date_start).format("DD-MMM-YYYY")
                  },
                },
                {
                  title: 'End Date',
                  dataIndex: 'date_end',
                  key: 'date_end',
                  sortByValue: 'date_end',
                  sorter: true,
                  filters:[],
                  render: date_end => {
                    if(moment(date_end).format("DD-MMM-YYYY") !== "Invalid date")
                      return moment(date_end).format("DD-MMM-YYYY")
                  },
                },
                // {
                //   title: 'Slider Arrangement',
                //   dataIndex: 'status',
                //   key: 'status',
                //   sorter: true,
                //   width: "17%",
                //   render: (text, record) => {
                //     const menu = (
                //       <Menu>
                //         <Menu.Item key="1" 
                //           onClick={this.updateDropDown} 
                //           record={record}>1 - First</Menu.Item>
                //         <Menu.Item key="2" 
                //           //onClick={this.updateDropDown} 
                //           record={record}>2 - Second</Menu.Item>
                //         <Menu.Item key="3" 
                //           //onClick={this.updateDropDown} 
                //           record={record}>3 - Third</Menu.Item>
                //         <Menu.Item key="4" 
                //           //onClick={this.updateDropDown} 
                //           record={record}>4 - Fourth</Menu.Item>
                //         <Menu.Item key="5" 
                //           //onClick={this.updateDropDown} 
                //           record={record}>5 - Fifth</Menu.Item>
                //       </Menu>
                //     );
                //     return(
                //       <Dropdown overlay={menu} trigger={['click']}>
                //         <a className="ant-dropdown-link" href="#">
                //           Choose Number<Icon type="caret-down" theme="outlined"
                //           style={{ position: "relative", top: -4, fontSize: 7 }} />
                //         </a>
                //       </Dropdown>
                //     )
                //   },
                // },
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