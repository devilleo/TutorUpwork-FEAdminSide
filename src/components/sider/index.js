import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import './sider.css';

const MyCustomSider = ({ adminRole }) => {
  // eslint-disable-next-line react/prop-types
  const { Sider } = Layout;
  return (
    <Sider collapsible className="myCustomSider">
      <Menu
        style={{ backgroundColor: 'transparent' }}
        className="myCustomSider"
        theme="dark"
        defaultSelectedKeys={['2']}
        mode="inline"
      >
        {adminRole && (
          <Menu.Item key="1">
            <Icon type="team" />
            <span>Danh sách Admin</span>
            <Link to="/adminmanagement" />
          </Menu.Item>
        )}

        <Menu.Item key="2">
          <Icon type="desktop" />
          <span>Danh sách Giáo viên</span>
          <Link to="/tutormanagement" />
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="desktop" />
          <span>Danh sách học viên</span>
          <Link to="/studentmanagement" />
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="desktop" />
          <span>Danh sách hợp đồng</span>
          <Link to="/contractmanagement" />
        </Menu.Item>
        <Menu.Item key="5">
          <Icon type="pie-chart" />
          <span>Danh sách Skill</span>
          <Link to="/skillmanagement" />
        </Menu.Item>
        <Menu.Item key="6">
          <Icon type="pie-chart" />
          <span>Thống kê</span>
          <Link to="/statisticmanagement" />
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

MyCustomSider.propTypes = {
  adminRole: PropTypes.string,
};

MyCustomSider.defaultProps = {
  adminRole: '',
};

export default MyCustomSider;
