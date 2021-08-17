import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ErrorRoute from './pages/ErrorRoute';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import './styles/style.css';
import Header from './components/Header';

const links = [
  {
    path: '/',
    label: 'Accueil'
  },
  {
    path: '/signin',
    label: 'Se connecter'
  },
  {
    path: '/signup',
    label: 'S\'inscrire'
  }
];

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header links={links} />
      <main>
        <Switch>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/signin">
            <Signin />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            <ErrorRoute />
          </Route>
        </Switch>
      </main>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);