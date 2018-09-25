import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import _ from 'lodash';
import { Table, Button, Row, Col, Input, Icon, Pagination, Tooltip, 
        notification, Popconfirm } from 'antd';

import { DropdownExport } from "components/Dropdown/index";
import { fnQueryParams } from "utils/helper";
import { API_GET } from "utils/Api";
import "./index.css"

class AdvanceTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      total: null,
      loading: false,
      selectedRowKeys: [],
      columns: [],
  
      mounted: false,
      test: true
    };

    this.delayFetchRequest = _.debounce(this.fetch, 500);
  }

  componentDidMount(){
    this.setState({ mounted: true })
    this.handleFilterChange({});
  }

  handleTableChange = (pagination, filters, sorter) => {
    let _sort_order;
    if(sorter.order) _sort_order = sorter.order === 'ascend' ? 'asc' : 'desc';

    this.handleFilterChange({
      ...filters,
      _sort_by    : sorter.field,
      _sort_order
    })
  }

  onPaginationChange = (page, page_size) => {
    this.handleFilterChange({page})
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
     
    Object.keys(urlParamsObject).map((key, index) => {
      if(this.props.filterValues.includes(key)) delete urlParamsObject[key];  
    });
  
    history.push({ pathname, search:fnQueryParams(urlParamsObject) });
    this.handleFilterChange(urlParamsObject, true);
  }

  clearAll = () => {
    this.handleFilterChange();
  }

  fetch = async (params = {}) => {
    console.log(params,'defaultdefault', this.props.url.default);
    try {
      let response = await API_GET(this.props.url.default, params);
      let data = response.data.data.length > 0 ? response.data.data : null;
      let total = response.data.data.length > 0 ? response.data.meta.total : 0
      
      this.setState({ data, total, loading : false });
    } catch (error) {
      this.setState({ loading : false, total: 0 })
    }
  }

  update = async (params = {}) => {
    notification.success({
      message: 'Success',
      description: `Delete Successfull.`,
    })
  }

  remove = async (params={}) => {
    notification.error({
      message: 'Error',
      description: `Error message.`,
    })  
  }

  render(){
    let { history, keyValue, location } = this.props;
    if(!this.state.mounted) return null;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      }
    };

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
                    
                    return (<Popconfirm placement="top" key={action.key}
                              title={'Are you sure want to delete.'} 
                              onConfirm={actionBtn} okText="Yes" cancelText="No"
                            >
                                <Icon
                                  type={action.icon} 
                                  style={{
                                    padding: '5px 14px 5px 0',
                                    color: 'rgb(231, 70, 16)',
                                    cursor: 'pointer'
                                  }}
                                />
                      </Popconfirm>
                    )
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
          <Input
            style={{ width: 300 }}
            prefix={
              <Icon type="search"
                style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="text"
                placeholder="Search"
              />
          </Col>
          <Col className="table-operations">
            <Button onClick = {this.clearFilters}>Clear filters</Button>
            <Button onClick = {this.clearAll}>Clear filters and sorters</Button>
            {/* <DropdownExport /> */}
          </Col>
        </Row>

        <Table
          size          = "middle"
          rowSelection  = {rowSelection}
          columns       = {columns}
          dataSource    = {this.state.data}
          pagination    = {false}
          rowKey        = {record => record[this.props.keyValue]}
          onChange      = {this.handleTableChange}
          loading       = {this.state.loading}
        />

        <div align="right" style={{ paddingTop: 25 }}>
          <Pagination
            defaultCurrent    = {parseInt(urlParamsObject.page, 10) || 1} 
            defaultPageSize   = {parseInt(urlParamsObject.page_size, 10) || 10}
            total             = {this.state.total} 
            showTotal         = {(total, range) => `${ this.state.total > 0 ? range[0] : 0}-${range[1] } of ${total}`}
            onChange          = {this.onPaginationChange}
            onShowSizeChange  = {this.onPaginationChange} 
          />
        </div>
      </div>
    )
  }
}

export default withRouter(AdvanceTable);