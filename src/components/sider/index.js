import React from 'react';
import { Link } from 'react-router-dom';
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
          <Icon type="desktop" />
          <span>Option 1</span>
          <Link to="/option1" />
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="team" />
          <span>Danh sách Admin</span>
          <Link to="/adminmanagement" />
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="desktop" />
          <span>Option 3</span>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="pie-chart" />
          <span>Option 4</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default MyCustomSider;
