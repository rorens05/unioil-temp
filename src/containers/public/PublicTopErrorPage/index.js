//@flow
import React, { Component } from 'react';
import { Button } from 'antd';


class PublicTopErrorPage extends Component {
  state = {
  }

  render() {

    return (
      <div align="center" id="1" style={{position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)'}}>
          <div style={{marginTop: '-40px'}}>
            <div>
              <img src={ require("assets/img/ic_error.svg") } style={{ width: '84vmin'}} />
              <p style={{ lineHeight: '7vmin', fontSize: '6vmin', fontWeight: 'bold', marginTop: '5vmin', color:'#4D4D4D' }}>
                Uh-oh! Your purchase for top-up <br/> is not successful. Please try again.
              </p>
              <Button type="primary" href="?id=3" size="large" style={{backgroundColor: '#e74610', borderColor: '#e74610'}}>
                Return to Top-Up Page
              </Button>
            </div>
          </div>
      </div>
    )
  }
}


export default PublicTopErrorPage;