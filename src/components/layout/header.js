import React from 'react';
import { Layout, Input, Avatar, Row, Col } from 'antd';
import './header.css';

const footer = () => {
  const { Header } = Layout;
  const { Search } = Input;
  return (
    <Header className="header" style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
      <Row
        type="flex"
        justify="space-around"
        align="middle"
        style={{ width: '90%', height: '100%' }}
      >
        <Col span={16} style={{ height: '100%' }}>
          <img alt="" src="/img/logo.png" style={{ height: '80%' }} />
          <Search
            onSearch={value => console.log(value)}
            style={{ width: '50%' }}
            className="searchHeader"
          />
        </Col>

        <Col span={4}>
          <Avatar shape="square" size={40} icon="user" />
        </Col>
      </Row>
    </Header>
  );
};

export default footer;
