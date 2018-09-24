import React, { Component } from 'react'
import { encrypt, decrypt } from 'utils/encrypto'
export default class PostsView extends Component {
    componentDidMount() {
   
 
    const { params } = this.props.match;
    let selectId = params.id
    console.log('====================================');
    
    console.log('====================================');

    // customAction({type: USERS_VIEW, payload: { url: `/users/${match.params.id}` }})
  }


  render() {
    return (
      <div>
      <h1>PostsView</h1>
      </div>
    )
  }
}
