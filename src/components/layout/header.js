import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Avatar, Row, Col, Menu, Dropdown } from 'antd';
import './header.css';

const header = props => {
  const { isLogin, logout } = props;
  const { Header } = Layout;
  const styleLogo = { textAlign: 'center', height: '100%' };
  const styleHeader = {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingLeft: '20%',
    paddingRight: '20%',
  };
  if (isLogin) {
    styleHeader.paddingLeft = '0px';
    styleHeader.paddingRight = '0px';
  }
  const menu = (
    <Menu>
      <Menu.Item>Xin chào Lê Xuân Kha!</Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={logout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Header className="header" style={styleHeader}>
      <Row type="flex" justify="space-around" align="middle" style={{ height: '100%' }}>
        <Col span={2}>
          <div />
        </Col>
        <Col span={20} style={styleLogo}>
          <img alt="" src="/img/logo.png" style={{ height: '100%' }} />
        </Col>
        <Col
          span={2}
          style={{
            // height: '100%',
            textAlign: 'center',
            // display: 'table-cell',
            // verticalAlign: 'middle',
          }}
        >
          {isLogin && (
            <Dropdown overlay={menu}>
              <Avatar shape="square" icon="user" />
            </Dropdown>
          )}
        </Col>
      </Row>
    </Header>
  );
};

header.propTypes = {
  isLogin: PropTypes.bool,
  logout: PropTypes.func,
};

header.defaultProps = {
  isLogin: false,
  logout: () => {},
};

export default header;
