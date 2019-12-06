import React from 'react';
import { Route, Redirect } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import Footer from './components/layout/footer';
import Header from './containers/headerContainer';

import Login from './containers/loginContainer';
import MyCustomSider from './components/sider/index';
import AdminManagement from './components/homepage/adminManagement/index';

import './App.css';

const App = props => {
  const { adminInfo } = props;
  const { Content } = Layout;
  return (
    <div>
      <Router>
        <Layout style={{ backgroundColor: 'transparent' }}>
          {adminInfo.token !== '' && <MyCustomSider />}

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
                {adminInfo.token !== '' ? <AdminManagement /> : <Redirect to="/login" />}
              </Route>
              <Route path={`${process.env.PUBLIC_URL}/login`}>
                {adminInfo.token !== '' ? <Redirect to="/adminmanagement" /> : <Login />}
              </Route>
              <Route path={`${process.env.PUBLIC_URL}/adminmanagement`}>
                {adminInfo.token !== '' ? <AdminManagement /> : <Redirect to="/login" />}
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
  adminInfo: PropTypes.objectOf(PropTypes.string, PropTypes.string),
};

App.defaultProps = {
  adminInfo: { token: '', role: '' },
};

export default App;
