import React from 'react';
import '../css/form.css';
import { Layout } from 'antd';

const HomePage = () => {
  const { Content } = Layout;
  // eslint-disable-next-line react/prop-types
  return (
    <div className="homePage">
      <Layout style={{ opacity: '0.8', backgroundColor: 'transparent' }}>
        <Content>
          <div>nothing</div>
        </Content>
      </Layout>
    </div>
  );
};

export default HomePage;
