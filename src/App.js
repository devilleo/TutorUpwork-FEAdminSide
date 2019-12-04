import React from 'react';
import { Route, Redirect } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import Footer from './components/layout/footer';
import Header from './components/layout/header';

import Login from './containers/loginContainer';
import HomePage from './components/homepage/index';
import MyCustomSider from './components/sider/index';
import AdminManagement from './components/homepage/adminManagement/index';

import './App.css';

const App = props => {
  const { isLogin } = props;
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
              }}
            >
              <Route path={`${process.env.PUBLIC_URL}/`}>
                {isLogin ? <AdminManagement /> : <Redirect to="/login" />}
              </Route>
              <Route path={`${process.env.PUBLIC_URL}/login`}>
                {isLogin ? <Redirect to="/adminmanagement" /> : <Login />}
              </Route>
              <Route path={`${process.env.PUBLIC_URL}/adminmanagement`}>
                {isLogin ? <AdminManagement /> : <Redirect to="/login" />}
              </Route>
            </div>
            <Footer />
          </Content>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
