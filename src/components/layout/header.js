import React from 'react';
import { Layout, Avatar, Row, Col } from 'antd';
import './header.css';

const header = props => {
  const { Header } = Layout;
  // eslint-disable-next-line react/prop-types
  let { collapsed } = props;
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
    styleLogo.textAlign = 'left';
  }
  const clickLogo = () => {
    collapsed = !collapsed;
    console.log(collapsed);
  };
  return (
    <Header className="header" style={styleHeader}>
      <Row type="flex" justify="space-around" align="middle" style={{ height: '100%' }}>
        <Col id="divLogo" span={22} style={styleLogo}>
          <input
            type="image"
            alt=""
            src="/img/logo.png"
            style={{ height: '100%' }}
            onClick={clickLogo}
          />
        </Col>
        {displayAvatar && (
          <Col id="buttonUser" span={2} style={{ height: '100%', textAlign: 'center' }}>
            <Avatar shape="square" icon="user" />
          </Col>
        )}
      </Row>
    </Header>
  );
};

export default header;
