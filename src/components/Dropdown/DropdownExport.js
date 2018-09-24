import React, { PureComponent } from "react";
import { Menu, Dropdown, Button, Icon } from "antd";

export default class DropdownExport extends PureComponent {

  handleExportPDF = () => {
    console.log("export PDF");
  }

  handleExportCSV = () => {
    console.log("export CSV");
  }

  render(){
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={ this.handleExportPDF }>PDF</Menu.Item>
        <Menu.Item key="2" onClick={ this.handleExportCSV }>CSV</Menu.Item>
      </Menu>
    );

    return(
      <Dropdown overlay={menu}>
        <Button>
          Export <Icon type="down" />
        </Button>
      </Dropdown>
    )
  }
}