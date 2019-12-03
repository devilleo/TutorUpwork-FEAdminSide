import React from 'react';
import { Layout } from 'antd';
import './footer.css';

const footer = () => {
  const { Footer } = Layout;

  return (
    <Footer
      className="footer"
      style={{
        textAlign: 'center',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      FIT - HCMUS - Phát triển ứng dụng web nâng cao
    </Footer>
  );
};

export default footer;
