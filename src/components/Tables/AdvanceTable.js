import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import _ from 'lodash';
import { Table, Button, Row, Col, Input, Icon, Pagination, Tooltip, 
        notification, Popconfirm, message, DatePicker } from 'antd';

import { DropdownExport } from "components/Dropdown/index";
import { fnQueryParams } from "utils/helper";
import { API_UNI_OIL, API_GET, API_DELETE } from "utils/Api";
import "./index.css"

const { RangePicker } = DatePicker;

class AdvanceTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      total: null,
      loading: false,
      selectedRowKeys: [],
      columns: [],
      search_filter: "",
  
      mounted: false,
      test: true,
      updating: false
    };

    this.delayFetchRequest = _.debounce(this.fetch, 500);
    this.handleSearchChangeDebounce = _.debounce(this.handleSearchStateChange, 1000);
  }

  componentDidMount(){
    this.setState({ mounted: true })
    this.handleFilterChange({});
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    
    if(prevState.updating !== prevProps.updating){
      this.setState({ updating: prevProps.updating });
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.updating !== nextState.updating){
      this.handleFilterChange({});
      return true;
    }
    return true
  }

  componentWillMount(){
    this.delayFetchRequest.cancel();
    this.handleSearchChangeDebounce.cancel();
  }
  
  handleTableChange = (pagination, filters, sorter) => {
    let _sort_order;
    if(sorter.order) _sort_order = sorter.order === 'ascend' ? 'asc' : 'desc';

    if(sorter.column) {
      if(sorter.column.sortByValue)
        sorter.field = sorter.column.sortByValue;
    }

    this.handleFilterChange({
      ...filters,
      _sort_by    : sorter.field,
      _sort_order
    })
  }

  handleSearchChange = (e) => {
    this.setState({ search_filter: e.target.value });
    this.handleSearchChangeDebounce(e.target.value);
  }

  handleSearchStateChange = (search_filter) => {
    this.setState({ search_filter });
    this.handleFilterChange({ _search: this.state.search_filter });
  }

  onPaginationChange = (page, page_size) => {
    this.handleFilterChange({page,page_size})
  }

  handleFilterChange = (props, isClearFilter) => {
    this.setState({ loading: true });

    let { history, location } = this.props;
    let { search, pathname } = location;
    let urlParamsObject = isClearFilter ? props : queryString.parse(search);
    urlParamsObject = props ? { ...urlParamsObject, ...props } : {};
    urlParamsObject = fnQueryParams(urlParamsObject);
    urlParamsObject = queryString.parse(urlParamsObject);
    history.push({ pathname, search:fnQueryParams(urlParamsObject) });
    this.delayFetchRequest(urlParamsObject);
  }

  clearFilters = () => {
    let { history, location } = this.props;
    let { search, pathname } = location;
    let urlParamsObject = queryString.parse(search);
    delete urlParamsObject["_search"];
    Object.keys(urlParamsObject).map((key, index) => {
      if(this.props.filterValues.includes(key)) delete urlParamsObject[key];  
    });
    
    history.push({ pathname, search:fnQueryParams(urlParamsObject) });
    this.handleFilterChange(urlParamsObject, true);
  }

  clearAll = () => {
    this.setState({ search_filter: '' })
    this.handleFilterChange();
  }

  fetch = async (params = {}) => {

    let defaulUrl;
    
    if(this.props.defaultFilter){
      params = {
        ...params,
        ...this.props.defaultFilter
      }
    }

    if(this.props.url.defaultWithFilter) {
      defaulUrl = this.props.url.defaultWithFilter
    } else {
      defaulUrl = this.props.url.default
    }
    

    try {
      let response = await API_GET(defaulUrl, params);
      let data = response.data.data.length > 0 ? response.data.data : null;
      let total = response.data.data.length > 0 ? response.data.meta.total : 0
      
      this.setState({ data, total, loading : false });
      if(data == null && this.props.isEmptyMessagePopUp) {
        message.info('No records found.');
      }
    } catch (error) {
      this.setState({ loading : false, total: 0 })
    }
  }

  update = async (params = {}) => {
    notification.success({
      message: 'Success',
      description: `Delete Successful.`,
    })
  }

  remove = async (params={}) => {
    notification.error({
      message: 'Error',
      description: `Error message.`,
    })  
  }

  delete = async (uuid) => {
    try {
      await API_UNI_OIL.delete(`${this.props.url.default}/${uuid}`);
      this.handleFilterChange({});
      message.success('Record was successfully deleted.');
    } catch ({response:error}) {
      this.handleFilterChange({});
      notification.error({ 
        message: "Error", 
        description: <div>
          <div>Something went wrong deleting record.</div>
        - { error && error.data && error.data.message }
        </div> , 
        duration: 20, 
      });
    }
  }

  handleBatchDelete = async() => {
    const data = { [this.props.keyValue]: this.state.selectedRowKeys }
    this.setState({ selectedRowKeys: [] });

    try {
      await API_UNI_OIL.delete(this.props.url.apiDelete, {data});
      this.handleFilterChange({});
      message.success('Record was successfully deleted.');
    } catch ({response:error}) {
      this.handleFilterChange({});
      notification.error({ 
        message: "Error", 
        description: <div>
          <div>Something went wrong deleting records.</div>
        - { error && error.data && error.data.message }
        </div> , 
        duration: 20, 
      });
    }

  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  handleDateRangePicker = async (date, dateString) => {
    this.handleFilterChange({ 
      date_start: dateString[0],
      date_end: dateString[1],
    });
  }

  render(){
    
    if(!this.state.mounted) return null;
    const { loading,selectedRowKeys } = this.state;
    const rowSelection = { 
      selectedRowKeys, 
      onChange: this.onSelectChange ,
      getCheckboxProps: record => ({
        disabled: record.editable == false, // Column configuration not to be checked
        //name: record.name,
      }),
    };
    const hasSelected = selectedRowKeys.length > 0;

    let { history, keyValue, location, url: {apiDelete} } = this.props;


    let { search } = this.props.location;
    let urlParamsObject = queryString.parse(search);
    let { _sort_order } = urlParamsObject;
    if(_sort_order) _sort_order = _sort_order === 'asc' ? 'ascend' : 'descend';
    
      const columns = this.props.columns.map( data => {
        if(data.dataIndex === 'action'){
          return {
            ...data,
            render: (text,record) =>(
              data.buttons.map( action => {
                
                  let actionBtn;

                  if(action.key == "edit") 
                    actionBtn = ()=> history.push({ pathname: `${location.pathname}/edit/${record[keyValue]}` }) 
                  if(action.key == "view") 
                    actionBtn = ()=> history.push({ pathname: `${location.pathname}/view/${record[keyValue]}` })
                  if(action.key == "delete") { 
                    actionBtn = action.action 
                    
                    if(record.editable == false) {
                      return 
                    } else {
                      return (<Popconfirm 
                          placement="bottomRight" 
                          key={action.key}
                          title={'Are you sure you want to delete this record?'}  
                          onConfirm={()=> this.delete(record[keyValue]) }
                          okText="Yes" cancelText="No"
                          icon={ <Icon type="close-circle" /> }
                        >
                        <Tooltip key={action.key} placement="top" title={action.title}>
                            <Icon
                              type={action.icon} 
                              style={{
                                padding: '5px 14px 5px 0',
                                color: 'rgb(231, 70, 16)',
                                cursor: 'pointer'
                              }}
                            />
                        </Tooltip>
                      </Popconfirm> )
                    }
                  }
 
                  return (<Tooltip key={action.key} placement="top" title={action.title}>
                      <Icon
                        type={action.icon} 
                        style={{
                          padding: '5px 14px 5px 0',
                          color: 'rgb(231, 70, 16)',
                          cursor: 'pointer'
                        }}
                        //onClick={ this.update }
                        onClick={actionBtn}
                      />
                  </Tooltip>)
                }
              )
            )
          }
        }
        let filteredValue = null;
        if(Array.isArray(urlParamsObject[data.dataIndex])){
          filteredValue = urlParamsObject[data.dataIndex];
        }else if(urlParamsObject[data.dataIndex]) {
          filteredValue = [urlParamsObject[data.dataIndex]];
        }

        return {
          ...data,
          filteredValue,
          sortOrder : data.sorter
                      ? urlParamsObject._sort_by === data.dataIndex && _sort_order
                      : null
        }
      });

    return(
      <div style={{ margin: '0 24px', padding: '24px 0'}}>
        <Row type="flex" justify="space-between" align="bottom" style={{paddingBottom: 25}}>
          <Col>
            {
              this.props.url.csv ? 
              (
                <RangePicker onChange={this.handleDateRangePicker} />
              ) :
              (
                <Input
                  onChange={ this.handleSearchChange }
                  style={{ width: 300 }}
                  value={ this.state.search_filter }
                  prefix={ <Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="text"
                  placeholder="Search"
                />
              )
            }
          </Col>
          <Col className="table-operations">
            {/* <Button onClick = {this.clearFilters}><b>Clear filters</b></Button>*/}
            <Button onClick = {this.clearAll}>Clear filters and sorters</Button> 
            {
              this.props.url.csv
              && <DropdownExport
                defaultFilter = {this.props.defaultFilter}
                url={this.props.url.csv} />
            }
          </Col>
        </Row>

        <Table
          size          = "middle"
          rowSelection  = {apiDelete && (rowSelection)}
          columns       = {columns}
          dataSource    = {this.state.data ? this.state.data : null}
          pagination    = {false}
          rowKey        = {record => record[this.props.keyValue]}
          onChange      = {this.handleTableChange}
          loading       = {loading}
        />

        <Row type="flex" justify="space-between" style={{ marginTop: 20 }}>
          <Col>
            {
              apiDelete && (
              <div>
                <Popconfirm 
                  placement="top" title={'Are you sure you want to delete this record?'} 
                  onConfirm={this.handleBatchDelete} okText="Yes" cancelText="No"
                  icon={ <Icon type="close-circle" /> }
                >
                  <Button
                      type="danger"
                      disabled={!hasSelected}
                      icon="delete" 
                      loading={loading}
                  >
                      Delete
                  </Button>
                  <span style={{ marginLeft: 8 }}>
                      {hasSelected ? `Selected ${selectedRowKeys.length} item(s)` : ''}
                  </span>
                </Popconfirm>
              </div>
              )
            }
          </Col>

          <Col>
              {   
                  this.state.total > 0 
                  ? 
                  <Pagination 
                      style={{float: 'right'}}
                      showSizeChanger 
                      defaultCurrent={parseInt(urlParamsObject.page, 10) || 1} 
                      defaultPageSize={parseInt(urlParamsObject.page_size, 10) || 10}
                      pageSizeOptions={['10','50','100']}
                      total={this.state.total} 
                      showTotal= {(total, range) => `Showing ${ this.state.total > 0 ? range[0] : 0}-${this.state.total > 0 ? range[1] : 0 } of ${this.state.total > 0 ? total : 0}`}
                      onChange= {this.onPaginationChange}
                      onShowSizeChange = {this.onPaginationChange} 
                  />
                  : null
                }
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(AdvanceTable);