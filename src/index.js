import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/style.css';
import Header from './components/Header';
import { AuthProvider } from './utils/context';
import routes from './utils/routes';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Header />
        <main>
          <Switch>
            {routes.map((route, index) => {
              return (
                <Route key={`routes-${index}`} exact={route.exact} path={route.path}>
                  <route.Component />
                </Route>
              );
            })}
          </Switch>
        </main>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);