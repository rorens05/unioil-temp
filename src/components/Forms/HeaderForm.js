
import React, { Component } from 'react';
import { Button,Popconfirm, Icon, Dropdown, Menu } from 'antd';


class HeaderForm extends Component {


  confirm(action) {
    action();
   // message.success('Click on Yes');
  }
  
  cancel(e) {
    // console.log(e);
    // message.error('Click on No');
  }
  

  render() {
    const { action, cancel, deleteAction , title , actionBtnName, cancelBtnName,
            deleteBtnName, loading, withConfirm, styleBtn, isDropDown , actionPrivacy, 
            actionTerms } = this.props;

    const menu = (
      <Menu className="terms-management" 
        //onClick={handleMenuClick}
      >
        <Menu.Item key="1" onClick={actionPrivacy}>{`Terms & Condition`}</Menu.Item>
        <Menu.Item key="2" onClick={actionTerms}>Privacy Policy</Menu.Item>
      </Menu>
    );

    return (
      <div style={{display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: '1px solid #E6ECF5', 
        background: '#fff', 
        position: 'fixed', width: '100%', 
        padding: '0px 24px 5px', zIndex: 99,
        marginTop: '-71px', marginLeft: '-17px' }}
      >
          <h1 style={{fontSize: '24px'}}>{title}</h1>
          <div style={{display: 'flex', position: 'fixed', right: '24px'}}>
            {   
              action && 
              <div>
              { 
                withConfirm 
                  ? 
                  (
                    <Popconfirm 
                        placement="bottom"
                        onConfirm={()=>this.confirm(action)} 
                        onCancel={this.cancel} okText="Yes" cancelText="No"
                        title={withConfirm && withConfirm.message} 
                    >
                      <Button  
                        loading={loading} 
                        style={{ margin: '0 4px', width: '135px', display: 'block', background: '#E74610', borderColor:'#E74610', color: '#fff' }}
                        >
                          {actionBtnName}
                      </Button>
                    </Popconfirm>
                  ) :  
                  !isDropDown && (
                      <Button  
                        loading={loading} 
                        onClick={action}
                        style={{ 
                          margin: '0 4px', width: '135px', display: 'block', 
                          background: styleBtn ? styleBtn.background : '#E74610', borderColor: styleBtn ? styleBtn.borderColor : '#E74610', color: styleBtn ? styleBtn.color : '#fff' }}
                        >
                          {actionBtnName}
                      </Button>
                  )
                  }
              </div>
               
            }
            {
              cancel && 
                <Button  
                  loading={loading} 
                  onClick={cancel}
                  style={{ margin: '0 4px', width: '135px', display: 'block', background: 'white', borderColor:'#b8bbc9', color: '#65697f' }}
                >
                  {cancelBtnName}
                </Button>
            }
            {
              deleteAction && 
                (
                  <Popconfirm 
                    placement="bottom" title={'Are you sure you want to delete this record?'} 
                    onConfirm={deleteAction} okText="Yes" cancelText="No"
                    icon={ <Icon type="close-circle" /> }
                  >
                    <Button  
                        type="danger"
                        loading={loading} 
                        style={{ margin: '0 4px', width: '135px', display: 'block', background: 'white', borderColor:'#b8bbc9', color: '#65697f' }}
                      >
                      {deleteBtnName}
                    </Button>
                  </Popconfirm>
                )
            }
            {
              isDropDown && (
                <div style={{position: 'relative'}} className="terms-management-parent">
                  <Dropdown overlay={menu} className="terms-management">
                    <Button>
                      Add <Icon type="down" />
                    </Button>
                  </Dropdown>
                </div>
              )
            }
          </div>
      </div>
    );
  }
}

export default HeaderForm;