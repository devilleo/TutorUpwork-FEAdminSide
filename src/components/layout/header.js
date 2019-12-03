import React from 'react';
import { Layout, Avatar, Row, Col } from 'antd';
import './header.css';

const header = () => {
  const { Header } = Layout;
  const displayAvatar = false;
  const styleLogo = { textAlign: 'center', height: '100%' };
  if (displayAvatar) {
    styleLogo.textAlign = 'left';
  }
  return (
    <Header
      className="header"
      style={{
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        paddingLeft: '20%',
        paddingRight: '20%',
      }}
    >
      <Row type="flex" justify="space-around" align="middle" style={{ height: '100%' }}>
        <Col id="divLogo" span={16} style={styleLogo}>
          <img alt="" src="/img/logo.png" style={{ height: '100%' }} />
        </Col>
        {displayAvatar && (
          <Col id="buttonUser" span={4} style={{ height: '100%', textAlign: 'right' }}>
            <Avatar shape="square" icon="user" />
          </Col>
        )}
      </Row>
    </Header>
  );
};

export default header;
