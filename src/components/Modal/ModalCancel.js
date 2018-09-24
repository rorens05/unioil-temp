import React, { Component } from "react";

import { Modal, Button } from "antd";
import { Link } from 'react-router-dom';
class ModalCancel extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);


    this.setState({
      visible: false
    });


  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {

    const {
      path,
      title,
      message,
      id,
      dirty,
      name,
      loading
    } = this.props
 
    if (dirty) {
      return [
        <Button 
        key="button" 
        disabled={loading}
        onClick={this.showModal}>
          {name}
        </Button>,
        <Modal
          getContainer={() => document.getElementById(id)}
          key="modal"
          width={300}
          title={title ? title : "Your Title"}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key={1}  type="primary"  onClick={this.handleCancel}>No</Button>,
            <Link key={2} to={path} style={{marginLeft: 10}}>
              <Button >
                Yes
              </Button>
            </Link>
          ]}
        >
          {message ? message : "Your Message"}
        </Modal>
      ];
    } else {
      return <Link to={path}   disabled={loading}>
        <Button key="back"  disabled={loading}>
        {name}
      </Button>
      </Link>
    }


  }
}

export default ModalCancel;
