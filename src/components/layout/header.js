import React from 'react';
import { Layout, Avatar, Row, Col } from 'antd';
import './header.css';

const header = () => {
  const { Header } = Layout;
  // eslint-disable-next-line react/prop-types
  const displayAvatar = true;
  const styleLogo = { textAlign: 'center', height: '100%' };
  const styleHeader = {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingLeft: '20%',
    paddingRight: '20%',
  };
  if (displayAvatar) {
    styleHeader.paddingLeft = '0px';
    styleHeader.paddingRight = '0px';
  }

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
          {displayAvatar && <Avatar shape="square" icon="user" />}
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
