import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'; 
import { List, Avatar } from 'antd';

import { fetchData } from 'utils/Api';

class ListDataDisplay extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    // const { url } = this.props;
    // const response = await fetchData(url);
    // this.setState({
    //   data: response.data
    // })
  }

  render() {
    const { layout, avatar, viewPath, header, footer } = this.props;

    return (
      <Fragment>
        <List
          header={header}
          footer={footer}
          itemLayout={layout}
          dataSource={this.state && this.state.data.data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={avatar && <Avatar
                  src={item.avatar}
                />}
                title={<Link to={viewPath.replace(':id', item.id)}>{item.first_name}</Link>}
                description={`${item.first_name.toLowerCase()}_${item.last_name.toLowerCase()}@gmail.com`}
              />
            </List.Item>
          )}
        />
      </Fragment>
    )
  }
}


export default ListDataDisplay;