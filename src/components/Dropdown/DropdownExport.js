import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { Menu, Dropdown, Button, notification } from "antd";
import DownloadFile from "js-file-download";
import queryString from "query-string";
import moment from 'moment';

import { API_UNI_OIL } from "utils/Api";

class DropdownExport extends PureComponent {
  state = {
    loading: false
  }

  handleExportCSV = async() => {
    this.setState({ loading: true });

    let { location } = this.props;
    let { search } = location;
    let params = queryString.parse(search);

    if(this.props.defaultFilter){
      params = {
        ...params,
        ...this.props.defaultFilter
      }
    }

    try {
    
      let response = await API_UNI_OIL.get(this.props.url.path, {
        params,
        responseType: 'blob'
      });
      
      if (response.status === 200 || response.status === 201) {
        let dateNow = moment(new Date()).format('DD-MMM-YYYY')
        DownloadFile(response.data, `${this.props.url.fileName}_${dateNow}.csv`);

        this.setState({ loading: false });
      }

    } catch (error) {
      this.setState({ loading: false });
    }
    
  }

  render() {

    const { loading } = this.state;

    return(
      <Button 
        loading={loading}
        onClick={this.handleExportCSV}
        style={{background: 'rgb(231, 70, 16)', borderColor: 'rgb(231, 70, 16)', color: '#fff'}}
      >
        Export CSV
      </Button>
    )
  }
}

export default withRouter(DropdownExport);