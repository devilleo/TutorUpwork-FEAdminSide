import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Avatar, Row, Col } from 'antd';
import './header.css';

const header = props => {
  const { isLogin } = props;
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
          {isLogin && <Avatar shape="square" icon="user" />}
        </Col>
      </Row>
    </Header>
  );
};

header.propTypes = {
  isLogin: PropTypes.bool,
};

header.defaultProps = {
  isLogin: false,
};

export default header;
