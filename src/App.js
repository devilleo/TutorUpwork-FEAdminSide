import React from 'react';
import { Switch, Route } from 'react-router';
import { Layout } from 'antd';
import Footer from './components/layout/footer';
import Header from './components/layout/header';

import Login from './components/login';
import HomePage from './components/homepage/index';
import MyCustomSider from './components/sider/index';

import './App.css';

const App = () => {
  const { Content } = Layout;
  return (
    <div>
      <Layout style={{ backgroundColor: 'transparent' }}>
        <MyCustomSider />

        <Content>
          <Header />
          <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`}>
              <HomePage />
            </Route>
            <Route exact path={`${process.env.PUBLIC_URL}/login`}>
              <Login />
            </Route>
          </Switch>
          <Footer />
        </Content>
      </Layout>
    </div>
  );
};

export default App;
