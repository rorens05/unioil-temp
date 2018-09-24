
import { Icon } from 'antd';

import React from 'react';

const Loading = () => {
  return (
    <div style={{padding: 20}}>
      <Icon type="sync" spin /> Loading Data Please wait...
    </div>
  );
};

export default Loading;