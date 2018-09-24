import React, { Component, Fragment  } from 'react';
import moment from 'moment';
import { Table, Button, Popconfirm, Popover, message, 
         Pagination, Input ,Row, Col , Select, Form, Icon, 
         DatePicker, Collapse, notification  } from 'antd';
import { withRouter } from "react-router-dom";
import queryString from 'query-string';

import { fetchAllItem , jsonServerApi } from 'utils/Api';
import { fnQueryParams } from "utils/helper";
const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;
const Panel = Collapse.Panel;

class TableLayout extends Component {
    state = {
        data: [],
        total: 0,
        loading: false,
        columns: null,
        selectedRowKeys: []
    };

    componentDidMount() {
        this.renderColumns();
        this.fetch();
    }

    onPaginationChange = (page, page_size) => {
        
        let _page = page, _limit = page_size;
        this.fnFilterChange({_page, _limit});
        
        this.fetch({_page, _limit});
    }

    fnFilterChange = (props) => {
        let { location, history } = this.props;
        let { pathname, search } = location;
        let values = queryString.parse(search);
        let params = { ...values, ...props };
        history.push({ pathname, search:fnQueryParams(params) });

    }

    fetch = async (params = {}) => {
        let values = queryString.parse(this.props.location.search); //get parameters
        if(params) {
            if(params._page) values = params;
        }
        const { api } = this.props;
        this.setState({ loading: true });
        let url = api.default;
        let asysnData = await fetchAllItem(url, {
            ...values
        });
        if(asysnData) {
            this.setState({
                loading: false,
                data: asysnData.data,
                total: asysnData.headers['x-total-count'],
                search: values.search
            });
        }
    }

    remove = async (params={}) => {
        let { path, uuid } = params

        try {
            const response = await jsonServerApi.delete(`${path}/${uuid}`);
    
            if(response) {

                this.fetch()

                notification.success({
                    message: 'Success',
                    description: `Delete Successfull.`,
                })
            }
        } catch (error) {
            
            if(error) {
                notification.error({
                    message: 'Error',
                    description: `Error response message here.`,
                })
            }
        
        }
    }

    actionHandler = props => {
        let { path, uuid, action, data } = props;

        let { history, location } = this.props;
        let { search, pathname } = location;
        if(action === 'update') {
            history.push({
                pathname: `${path}/${uuid}`,
                state: {
                    initialValues: data
                }
            });
        }

        if(action === 'delete') {
            //this.remove({path, uuid});
        }

        if(action === 'view') {
            history.push({
                pathname: `${path}/${uuid}`,
                state: {
                    prevPath:`${pathname}${search}`,
                    initialValues: data
                }
            });
        }
    }

    confirm(items,id) {
        this.remove({path: items.path, uuid: id });
    }
      
    cancel(e) {
        message.error('You Click Cancel.');
    }

    onChange = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    }
      
    renderColumns = () => {

        const { headers,actions,keyValue } = this.props;

        let columns = headers;

        headers.map((item, index) => {
            if(item.renderActions) {
                item['render'] = (text, record) => {
                    return item.renderActions.map((itemAction,key) => {
                        if(itemAction.action_name) {
                            return (
                                <span key={key} style={{marginRight: '10px'}}>
                                        {
                                            (itemAction.action || itemAction.action_name == "delete")
                                            ?
                                             <Popconfirm 
                                                title="Are you sure delete this record?" 
                                                content={itemAction.message}
                                                onConfirm={
                                                    ()=> this.confirm(itemAction, record[keyValue]) 
                                                } 
                                                onCancel={()=> this.cancel()} okText="Yes" cancelText="Cancel"
                                            >
                                                <Button 
                                                    icon={itemAction.icon} 
                                                    type="danger"
                                                >
                                                </Button>
                                             </Popconfirm>
                                             :
                                            <Popover 
                                                title={itemAction.action_name} 
                                                content={itemAction.action_message}
                                                trigger="hover"
                                            >
                                                <Button
                                                    onClick={ 
                                                        ()=> this.actionHandler({
                                                                path: itemAction.path,
                                                                uuid: record[keyValue],
                                                                action: itemAction.action_name,
                                                                data: record
                                                        })
                                                    } 
                                                    icon={itemAction.icon} 
                                                    type="primary"
                                                />
                                            </Popover>
                                        }
                                </span>
                            )
                        }
                    })
                }
            }
        })

       return this.setState({ columns: columns }) 
    }

    onDeleteHandler = () => {
        this.setState({ loading: true });
        // ajax request after empty completing

        setTimeout(() => {

          this.setState((prevState, props) => ({
            selectedRowKeys: [],
            loading: false,
          }));

          this.fetch();

        }, 1000);

        
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }

    onFilterSearch = (val) => {
        console.log('Received values of form: ', val);
        this.fnFilterChange(val);
    } 

    render() {
        const { keyValue,scrollbale, advanceFilter:AdvancedSearchForm  } = this.props;
        const { loading,selectedRowKeys } = this.state;

        const rowSelection = { selectedRowKeys, onChange: this.onSelectChange };
        const hasSelected = selectedRowKeys.length > 0;
        // VALUES FROM PARAMS URL
        let values = queryString.parse(this.props.location.search);
        return (

            <Fragment>

                <Collapse style={{marginBottom: 16}}>
                    <Panel header="Advance Filter" key="1">
                        <Collapse defaultActiveKey="1" style={{padding: 16}}>
                            <AdvancedSearchForm onSubmit={this.onFilterSearch}/>
                        </Collapse>
                    </Panel>
                </Collapse>

                <Row gutter={16}>

                    <Col span={8} >
                        <h5>Date Range :</h5>
                        <RangePicker
                            ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                            onChange={this.onChange}
                        />
                    </Col> 
                    <Col span={8} >
                        <h5>Date</h5>
                        <DatePicker onChange={this.onChange} />
                    </Col> 
                   
                   

                    <Col span={8} offset={16} style={{marginBottom: 16}}>
                        <span>Search :</span>
                        <Search
                            defaultValue={values.search}
                            onSearch={(val)=> this.fnFilterChange({search: val})}
                            placeholder="Input search text" 
                            enterButton="Search" 
                            label={'Search'}
                        />
                    </Col>
                </Row>

                <div style={{ marginBottom: 16, marginTop: 16 }}>
                    <Button
                        type="danger"
                        onClick={this.onDeleteHandler}
                        disabled={!hasSelected}
                        icon="delete" 
                        loading={loading}
                    >
                        Delete All
                    </Button>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>

                <Table 
                    columns={this.state.columns}
                    dataSource={this.state.data}
                    rowKey={record => record[keyValue]}
                    pagination={false}
                    loading={this.state.loading}
                    rowSelection={rowSelection}
                    scroll={scrollbale ? scrollbale : {x: 0, y: 0}}
                />

                {   
                    this.state.total > 0 
                    ? 
                    <Pagination 
                        style={{float: 'right' , marginTop: 16}}
                        showSizeChanger 
                        showQuickJumper 
                        defaultCurrent={parseInt(values._page) || 1} 
                        defaultPageSize={parseInt(values._limit) || 10}
                        pageSizeOptions={['5','10','15','20']}
                        total={parseInt(this.state.total)} 
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        onChange={this.onPaginationChange}
                        onShowSizeChange={this.onPaginationChange} 
                    />
                    : null
                }
                
            </Fragment>
        );
    }

   
}


export default withRouter(TableLayout);
 