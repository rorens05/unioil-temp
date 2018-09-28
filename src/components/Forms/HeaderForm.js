
import React, { Component } from 'react';
import { Button } from 'antd';


class HeaderForm extends Component {

  render() {
    const { action, cancel, deleteAction , title , actionBtnName, cancelBtnName,
            deleteBtnName, loading } = this.props;

    return (
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E6ECF5', background: '#fff', position: 'absolute',width: '100%', left: 0,top:'40px',padding: '0px 24px 5px' }}>
          <h1 style={{fontSize: '24px'}}>{title}</h1>
          <div style={{display: 'flex'}}>
            {   
              action && 
                <Button  
                  loading={loading} 
                  onClick={action}
                  style={{ margin: '0 4px', width: '135px', display: 'block', background: '#E74610', borderColor:'#E74610', color: '#fff' }}
                >
                  {actionBtnName}
                </Button>
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
                <Button  
                  loading={loading} 
                  onClick={deleteAction}
                  style={{ margin: '0 4px', width: '135px', display: 'block', background: 'white', borderColor:'#b8bbc9', color: '#65697f' }}
                >
                  {deleteBtnName}
                </Button>
            }
          </div>
        </div>
    );
  }
}

export default HeaderForm;