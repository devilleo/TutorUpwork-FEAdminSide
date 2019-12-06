import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Avatar, Row, Col } from 'antd';
import './header.css';

const header = props => {
  const { adminInfo } = props;
  const { Header } = Layout;
  const styleLogo = { textAlign: 'center', height: '100%' };
  const styleHeader = {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingLeft: '20%',
    paddingRight: '20%',
  };
  if (adminInfo.token !== '') {
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
          {adminInfo.token !== '' && <Avatar shape="square" icon="user" />}
        </Col>
      </Row>
    </Header>
  );
};

header.propTypes = {
  adminInfo: PropTypes.objectOf(PropTypes.string, PropTypes.string),
};

header.defaultProps = {
  adminInfo: { token: '', role: '' },
};

export default header;
