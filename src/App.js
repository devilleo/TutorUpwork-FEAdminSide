import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import Footer from './components/layout/footer';
import Header from './components/layout/header';

import Login from './components/login';
import HomePage from './components/homepage/index';
import MyCustomSider from './components/sider/index';
import AdminManagement from './components/homepage/adminManagement/index';


import './App.css';

const App = () => {
  const { Content } = Layout;
  return (
    <div>
      <Router>
        <Layout style={{ backgroundColor: 'transparent' }}>
          {/* //TODO: hide sider below if not logged in */}
          <MyCustomSider />

          <Content>
            <Header />
            <div
              style={{
                opacity: '0.8',
                backgroundColor: 'transparent',
                minHeight: '90vh',
                padding: '30px',
              }}
            >
              <Route exact path={`${process.env.PUBLIC_URL}/`} component={HomePage} />
              <Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login} />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/adminmanagement`}
                component={AdminManagement}
              />
            </div>

            <Footer />
          </Content>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
