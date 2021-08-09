import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
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
      {links.map((lien, index) => {
        return (
          <React.Fragment key={`liens-${index}`}>
            <Link to={lien.path}>{lien.label}</Link>
            <br />
            <br />
          </React.Fragment>
        );
      })}
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
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);