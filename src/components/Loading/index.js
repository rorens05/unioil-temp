
import { Icon } from 'antd';

import React from 'react';

const Loading = () => {
  return (
    <div style={{padding: 20, display: 'flex' , justifyContent: 'center' , marginLeft: '-144px'}}>
      <div>
        <Icon type="sync" spin /> Loading Data Please wait...
      </div>
    </div>
  );
};

export default Loading;