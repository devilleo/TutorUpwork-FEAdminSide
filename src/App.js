import React from 'react';
import { Switch, Route } from 'react-router';
import Footer from './components/layout/footer';
import Header from './components/layout/header';

import Login from './components/login';
import './App.css';

const App = () => {
  return (
    <div>
      <Header />
      <div>
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`}>
            <Login />
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
