import React from 'react';
import { Switch, Route } from 'react-router';
import Footer from './components/layout/footer';
import Header from './components/layout/header';

import Login from './components/login';
import HomePage from './components/homepage/index';
import './App.css';

const App = () => {
  // TODO: collapsed la 1 bien thuoc state, bay gio chua lam!!!
  const collapsed = false;
  return (
    <div>
      <Header collapsed={collapsed} />
      <div>
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`}>
            <HomePage collapsed={collapsed} />
          </Route>
          <Route exact path={`${process.env.PUBLIC_URL}/login`}>
            <Login />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
