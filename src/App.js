import React from 'react';
import { Route, Redirect } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import Footer from './components/layout/footer';
import Header from './containers/headerContainer';

import Login from './containers/adminContainer';
import MyCustomSider from './components/sider/index';
import AdminManagement from './containers/adminManagementContainer';
import TutorManagement from './containers/tutorManagementContainer';
import StudentManagement from './containers/studentManagementContainer';
import SkillManagement from './containers/skillManagementContainer';
import ContractManagement from './containers/contractManagementContainer';
import StatisticManagement from './containers/statisticContainer'

import './App.css';

const App = props => {
  const { isLogin, adminRole } = props;
  const { Content } = Layout;
  return (
    <div>
      <Router>
        <Layout style={{ backgroundColor: 'transparent' }}>
          {isLogin && <MyCustomSider adminRole={adminRole} />}

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
                {isLogin ? <TutorManagement /> : <Redirect to="/login" />}
              </Route>
              <Route exact path={`${process.env.PUBLIC_URL}/login`}>
                {isLogin ? <Redirect to="/tutormanagement" /> : <Login />}
              </Route>
              <Route exact path={`${process.env.PUBLIC_URL}/tutormanagement`}>
                {isLogin ? <TutorManagement /> : <Login />}
              </Route>
              <Route exact path={`${process.env.PUBLIC_URL}/studentmanagement`}>
                {isLogin ? <StudentManagement /> : <Login />}
              </Route>
              <Route exact path={`${process.env.PUBLIC_URL}/adminmanagement`}>
                {isLogin ? <AdminManagement /> : <Redirect to="/login" />}
              </Route>
              <Route exact path={`${process.env.PUBLIC_URL}/contractmanagement`}>
                {isLogin ? <ContractManagement /> : <Redirect to="/login" />}
              </Route>
              <Route exact path={`${process.env.PUBLIC_URL}/skillmanagement`}>
                {isLogin ? <SkillManagement /> : <Redirect to="/login" />}
              </Route>
              <Route exact path={`${process.env.PUBLIC_URL}/statisticmanagement`}>
                {isLogin ? <StatisticManagement /> : <Redirect to="/login" />}
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
  adminRole: PropTypes.string,
};

App.defaultProps = {
  isLogin: false,
  adminRole: '',
};

export default App;
