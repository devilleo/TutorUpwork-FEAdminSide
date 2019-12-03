import React from 'react';
import '../css/form.css';
import { Layout } from 'antd';
import MyCustomSider from './sider/index';

const HomePage = props => {
  const { Content } = Layout;
  // eslint-disable-next-line react/prop-types
  const { collapsed } = props;
  return (
    <div className="homePage">
      <Layout style={{ opacity: '0.8', backgroundColor: 'transparent' }}>
        <MyCustomSider collapsed={collapsed} />
        <Content>
          <div>nothing</div>
        </Content>
      </Layout>
    </div>
  );
};

export default HomePage;
