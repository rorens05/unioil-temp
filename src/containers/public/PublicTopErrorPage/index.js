//@flow
import React, { Component } from 'react';


class PublicTopErrorPage extends Component {
  state = {
  }

  render() {

    return (
      <div align="center" style={{position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)'}}>
          <div style={{marginTop: '-40px'}}>
            <div>
              <img src={ require("assets/img/ic_error.svg") } style={{ width: '84vmin'}} />
              <p style={{ lineHeight: '7vmin', fontSize: '6vmin', fontWeight: 'bold', marginTop: '5vmin', color:'#4D4D4D' }}>
                Uh-oh! Your purchase for top-up <br/> is not successful. Please try again.
              </p>
            </div>
          </div>
      </div>
    )
  }
}


export default PublicTopErrorPage;