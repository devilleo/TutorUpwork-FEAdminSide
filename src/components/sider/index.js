import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import './sider.css';

const MyCustomSider = () => {
  // eslint-disable-next-line react/prop-types
  const { Sider } = Layout;
  return (
    <Sider collapsible className="myCustomSider">
      <Menu
        style={{ backgroundColor: 'transparent' }}
        className="myCustomSider"
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
      >
        <Menu.Item key="1">
          <Icon type="pie-chart" />
          <span>Option 1</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="desktop" />
          <span>Option 2</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="pie-chart" />
          <span>Option 3</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default MyCustomSider;
