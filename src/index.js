import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ErrorRoute from './pages/ErrorRoute';
import Landing from './pages/Landing';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import './styles/style.css';
import Header from './components/Header';
import { AuthProvider } from './utils/context';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Post from './pages/Post';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Header />
        <main>
          <Switch>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/signin">
              <Signin />
            </Route>
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/post/:postId">
              <Post />
            </Route>
            <Route>
              <ErrorRoute />
            </Route>
          </Switch>
        </main>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);