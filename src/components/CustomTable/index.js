import React from "react";
import {
  Table,
  Input,
  Icon,
  Divider,
  Tooltip,
  Popconfirm,
  message,
  Button,
  Pagination,
  Row, 
  Col 
} from "antd";
//import { callApi } from "utils/Api";
import { Link, withRouter } from "react-router-dom";
import querystring from "querystring";
import { encrypt, decrypt } from 'utils/encrypto'
// const querystring = require("querystring");
const { Column, ColumnGroup } = Table;
const Search = Input.Search;

class CustomTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      filteredInfo: null,
      sortedInfo: null,
      pageName: '_page',
      currentPage: 1, 
      sizeName: '_limit',
      pageSize: 10,
      totalData: 100,
      searchValue: null,
      headerColumns: props.columns.map(column => {
        if (column.sorter) {
          column.sorter = (a, b) => a[column.dataIndex] - b[column.dataIndex];
          column.sortOrder = null;
        }
        return column;
      })
    };
  }

  componentDidMount() {
    this.handleInitialLoad()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { currentPage, pageSize, pageName } = this.state;

    if (prevProps.location.search !== this.props.location.search) {

      if (this.props.location.search === "") {
        this.handleclearAll();
        
      }
    }

    if (prevState.sortedInfo !== this.state.sortedInfo) {
      //Sort Columns Function
      this.setState({
        headerColumns: this.state.headerColumns.map(column => {
          if (
            this.state.sortedInfo &&
            this.state.sortedInfo.columnKey === column.dataIndex
          ) {
            column.sortOrder = this.state.sortedInfo.order;
          }
          return column;
        })
      });
    }
  }


  handleInitialLoad = () => {
    const { search } = this.props.location;
    const { currentPage, pageSize, pageName, sizeName } = this.state;

    if (search) {
      let parsed = querystring.parse(search.substring(1));
      console.log('====================================');
      console.log(parsed,pageName, sizeName,parsed[pageName], parsed[sizeName], "&&&&&&SEARCH!!");
      console.log('====================================');

      if (parsed) {
        if (parsed[pageName] && parsed[sizeName] && parsed.q && parsed._sort && parsed._order ) {
          this.handleUpdateData({
            page: parseInt(parsed[pageName]),
            size: parseInt(parsed[sizeName]), 
            search: parsed.q
          });
        } else if (parsed[pageName] && parsed[sizeName] && parsed.q) {
          alert("Search")
          this.handleUpdateData({
            page: parseInt(parsed[pageName]),
            size: parseInt(parsed[sizeName]), 
            search: parsed.q
          });
        } else if (parsed[pageName] && parsed[sizeName]) { 
          this.handleUpdateData({
            page: parseInt(parsed[pageName]),
            size: parseInt(parsed[sizeName]), 
          });
        }
        // this.fetch({
        //   ...parsed
        // });
      }
    } else {
        this.handleUpdateData({
          page: currentPage,
          size: pageSize, 
        });
   
    }
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { currentPage, pageSize, searchValue } = this.state;
    console.log("====================================");
    console.log(filters, sorter, "tesadasdas");
    console.log("====================================");
    // this.setState({
    //   filteredInfo: filters,
    //   sortedInfo: sorter
    // });
    if (Object.keys(sorter).length !== 0) {
      // this.fetch({
      //   _page: currentPage,
      //   _limit: pageSize,
      //   _sort: sorter.field,
      //   _order: sorter.order === "ascend" ? "asc" : "desc",

      //   ...filters
      // });

      if (searchValue) {
        this.handleUpdateData({
          sort: sorter,
          filter: filters,
          search: searchValue
        });
      } else {
        this.handleUpdateData({ sort: sorter, filter: filters });
      }
    } else {
      if (searchValue) {
        this.handleUpdateData({ filter: filters, search: searchValue });
      } else {
        this.handleUpdateData({ filter: filters });
      }
      // this.fetch({
      //   _page: currentPage,
      //   _limit: pageSize,
      //   ...filters
      // });
    }
  };

  fetch = async (params = {}) => {
    let { url, history } = this.props;
    const stringified = querystring.stringify(params);

    console.log("GGGGG3333", url.default, stringified, params, window.location);
    this.setState({ loading: true });
    // history.push(`${url.default}?${stringified}`);
    history.push({
      pathname: url.default,
      search: stringified
    });
    try {
      // let response = await callApi({
      //   url: url.default,
      //   params: {
      //     _page: params._page,
      //     _limit: params._limit,
      //     ...params
      //   }
      // });

      // if (response.status === 200) {
      //   this.setState({
      //     loading: false,
      //     data: response.data,
      //     totalData: response.data.total ? response.data.total : 100
      //   });
      // }
    } catch (error) {}
  };

  handleUpdateData = ({ search, sort, page, size, filter }) => {
    const {
      currentPage,
      pageSize,
      filteredInfo,
      sortedInfo,
      searchValue
    } = this.state;

    console.log("====================================");
    console.log(
     search, sort, page, size, filter,
      "WWOOOPS!!"
    );
    console.log("====================================");

    if (search && sort && filter) {

      this.setState({
        filteredInfo: filter,
        sortedInfo: sort,
        searchValue: search,
      })

      this.fetch({
        _page: currentPage,
        _limit: pageSize,
        q: search,
        _sort: sort.field,
        _order: sort.order === "ascend" ? "asc" : "desc",
        ...filter
      });

      //filteredInfo value
    } else if (filter) {
      if (sort) {

        this.setState({
          filteredInfo: filter,
          sortedInfo: sort,
        }) 

        this.fetch({
          _page: currentPage,
          _limit: pageSize,
          _sort: sort.field,
          _order: sort.order === "ascend" ? "asc" : "desc",
          ...filter
        });
      } else if (search) {

        this.setState({
          filteredInfo: filter,
          searchValue: search,
        })

        this.fetch({
          _page: currentPage,
          _limit: pageSize,
          q: search,
          ...filter
        });
      } else {

        this.setState({
          filteredInfo: filter,
        })

        this.fetch({
          _page: currentPage,
          _limit: pageSize,
          ...filter
        });
      }
      //sortedInfo value
    } else if (sort) {
      if (filter) {
        this.setState({
          filteredInfo: filter,
          sortedInfo: sort, 
        })

        this.fetch({
          _page: currentPage,
          _limit: pageSize,
          _sort: sort.field,
          _order: sort.order === "ascend" ? "asc" : "desc",
          ...filter
        });
      } else if (search) {

        this.setState({ 
        sortedInfo: sort,
        searchValue: search,
      })

        this.fetch({
          _page: currentPage,
          _limit: pageSize,
          q: search,
          _sort: sort.field,
          _order: sort.order === "ascend" ? "asc" : "desc"
        });
      } else {
        this.setState({ 
          sortedInfo: sort, 
        })
      
        this.fetch({
          _page: currentPage,
          _limit: pageSize,
          _sort: sort.field,
          _order: sort.order === "ascend" ? "asc" : "desc"
        });
      }

      //search Value
    } else if (search) {
      if (filter) {

        this.setState({
          filteredInfo: filter, 
          searchValue: search,
        })
        
        this.fetch({
          _page: currentPage,
          _limit: pageSize,
          q: search,
          ...filter
        });
      } else if (sort) {

        this.setState({
          sortedInfo: sort,
          searchValue: search,
        })
        
        this.fetch({
          _page: currentPage,
          _limit: pageSize,
          q: search,
          _sort: sort.field,
          _order: sort.order === "ascend" ? "asc" : "desc"
        });
      } else if (page && size) {
        alert(page, size, "OOOPS@")
        this.setState({
          currentPage: page,
          pageSize: size,
          searchValue: search,
        })
        this.fetch({
          _page: page,
          _limit: size,
          q: search
        });
      } else if (page) {

        this.setState({
          currentPage: page, 
          searchValue: search,
        })

        this.fetch({
          _page: page,
          _limit: pageSize,
          q: search
        });
      }  else if (size) {

        this.setState({ 
          pageSize: size,
          searchValue: search,
        })

        this.fetch({
          _page: currentPage,
          _limit: size,
          q: search
        });
      } else {
        
        this.setState({ 
          searchValue: search,
        })

        this.fetch({
          _page: currentPage,
          _limit: pageSize,
          q: search
        });
      }
    } else {
      if (page && size) {
        this.setState({
          currentPage: page,
          pageSize: size,
        })


        this.fetch({
          _page: page,
          _limit: size
        });
      } else if (page) {

        this.setState({
          currentPage: page, 
        })

        this.fetch({
          _page: page,
          _limit: pageSize
        });
      } else if (size) {

        this.setState({
          pageSize: size,
        })

        this.fetch({
          _page: currentPage,
          _limit: size
        });
      } else {
        this.fetch({
          _page: currentPage,
          _limit: pageSize
        });
      }
    }
  };

  handleSearch = e => {
    const { currentPage, pageSize, filteredInfo, sortedInfo } = this.state;
    console.log("====================================");
    console.log(e);
    console.log("====================================");
    // this.setState({
    //   searchValue: e
    // });
    if (e) {
      this.handleUpdateData({ search: e, page: 1 });
    } else {
      this.handleUpdateData({ search: null, page: 1 });
    }
  };

    handleSearchChange = e => {
    const { currentPage, pageSize, filteredInfo, sortedInfo } = this.state;

    // this.setState({
    //   searchValue: e
    // });
    if (e) {
      this.setState({
        searchValue: e.target.value
      })
    } else {
      this.setState({
        searchValue: null
      })
    }
  };

  handleDeleteConfirmYes = e => {
    console.log(e);
    message.success("Click on Yes");
  };

  handleDeleteConfirmNo = e => {
    console.log(e);
    message.error("Click on No");
  };
  handleclearAll = () => {
    console.log("====================================");
    console.log("reset");
    console.log("====================================");
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
      searchValue: null,
      // currentPage: 1,
      // pageSize: 10
    });

    this.handleUpdateData({
      page: 1,
      size: 10, 
    });
    // this.fetch({
    //   _page: 1,
    //   _limit: 10
    // });
  };
  handlePagination = page => {
    const { pageSize, searchValue } = this.state;

    // this.fetch({
    //   _page: page,
    //   _limit: pageSize
    // });

    if (searchValue) {
      this.handleUpdateData({ page, search: searchValue });
    } else {
      this.handleUpdateData({ page });
    }

    // this.setState({
    //   currentPage: page
    // });
  };

  handleSizeChange = (current, pageSize) => {
    console.log("TEST!", current, pageSize, searchValue);
    const { searchValue } = this.state;
    // this.fetch({
    //   _page: current,
    //   _limit: pageSize
    // });

    if (searchValue) {
      this.handleUpdateData({
        page: current,
        size: pageSize,
        search: searchValue
      });
    } else {
      this.handleUpdateData({ page: current, size: pageSize });
    }

    // this.setState({
    //   currentPage: current,
    //   pageSize
    // });
  };


  handleRenderActionButton = ({action, item}) => {
    let {keyValue} = this.props

    let idValue = item[keyValue].toString()
        console.log('====================================');
   
    console.log('====================================');
    switch (action.type) {
      case 'edit':
        return <Tooltip key={action.key} placement="top" title={action.name}>
            <Link to={`${action.path}/1`} style={{padding: '5px 8px'}}>
              <Icon type='edit' />
            </Link>
          </Tooltip> 
       
        break;
      case 'view':
        return <Tooltip key={action.key} placement="top" title={action.name}>
            <Link to={`${action.path}/2`} style={{padding: '5px 8px'}}>
              <Icon type='right-circle-o' />
            </Link>
          </Tooltip> 
       
        break;
      
      case 'delete':
        return <Tooltip key={action.key} placement="top"  title={action.name}>
            <Popconfirm
              title="Are you sure delete this item?"
              onConfirm={() => this.handleDeleteConfirmYes(item)}
              onCancel={() => this.handleDeleteConfirmNo(item)}
              okText="Yes"
              cancelText="No" >
              <a href="javascript:;" style={{padding: '5px 8px'}}>
                <Icon type='delete' />
              </a>
            </Popconfirm>
          </Tooltip> 
        break;
    
      default:
        return null
        break;
    }

  }

  render() {
    
    let { columns, keyValue, actions } = this.props;
    let {
      sortedInfo,
      filteredInfo,
      headerColumns,
      currentPage,
      pageSize,
      totalData,
      data,
      searchValue
    } = this.state;

    // let headerColumns = columns.map(column => {
    //   if (column.sorter) {
    //     column.sorter = (a, b) => a[column.dataIndex] - b[column.dataIndex];
    //     column.sortOrder =
    //       sortedInfo &&
    //       sortedInfo.columnKey === column.dataIndex &&
    //       sortedInfo.order;
    //   }
    //   return column;
    // });
 
    console.log("====================================");
    console.log(currentPage, pageSize, "TESTASDASD");
    console.log("====================================");

    return (
      <div>
        <div className="table-operations">
          <Button onClick={this.handleclearAll}>
            Clear filters and sorters
          </Button>
        </div>
        <Search
          value={searchValue}
          placeholder="input search text"
          onSearch={this.handleSearch}
          onChange={this.handleSearchChange}
          enterButton
        />
        <Table
          rowKey={keyValue}
          dataSource={data}
          loading={this.state.loading}
          onChange={this.handleTableChange}
          pagination={false}
        >
          {columns &&
            columns.map(column => (
              <Column
                key={column.dataIndex ? column.dataIndex : column.key}
                {...column}
              />
            ))}
            {
              actions && actions.length > 0 && <Column
                title="Action"
                align="center"
                key="action"
                width={130}
                render={(text, record) => (

                      actions.map(item => {
                        return item.access === true && this.handleRenderActionButton({action: item, item: record})
                      })
                    
                  )}


                />
                   
                
            }

            
        
        </Table>
        <Row style={{paddingTop: 20}}>
          <Col span={8}>col-12</Col>
          <Col span={16} style={{textAlign: 'right'}}>
            <Pagination
              // size="small"
              current={currentPage}
              pageSize={pageSize}
              showSizeChanger
              onChange={this.handlePagination}
              onShowSizeChange={this.handleSizeChange}
              // defaultCurrent={currentPage}
              total={totalData}
            />
          </Col>
         </Row>
        
      </div>
    );
  }
}

export default withRouter(CustomTable);
