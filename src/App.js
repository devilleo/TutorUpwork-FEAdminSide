import React from 'react';
import { Route, Redirect } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import Footer from './components/layout/footer';
import Header from './containers/headerContainer';

import Login from './containers/adminContainer';
import MyCustomSider from './components/sider/index';
import AdminManagement from './components/homepage/adminManagement/index';
import TutorManagement from './components/homepage/tutorManagement/index';

import './App.css';

const App = props => {
  const { isLogin } = props;
  const { Content } = Layout;
  return (
    <div>
      <Router>
        <Layout style={{ backgroundColor: 'transparent' }}>
          {isLogin && <MyCustomSider />}

          <Content>
            <Header />
            <div
              style={{
                opacity: '0.8',
                backgroundColor: 'transparent',
                minHeight: '90vh',
              }}
            >
              <Route exact path={`${process.env.PUBLIC_URL}/`}>
                {isLogin ? <AdminManagement /> : <Redirect to="/login" />}
              </Route>
              <Route exact path={`${process.env.PUBLIC_URL}/login`}>
                {isLogin ? <Redirect to="/adminmanagement" /> : <Login />}
              </Route>
              <Route exact path={`${process.env.PUBLIC_URL}/tutormanagement`}>
                {isLogin ? <TutorManagement /> : <Login />}
              </Route>
              <Route exact path={`${process.env.PUBLIC_URL}/adminmanagement`}>
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

App.propTypes = {
  isLogin: PropTypes.bool,
};

App.defaultProps = {
  isLogin: false,
};

export default App;
