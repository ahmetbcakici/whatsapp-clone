import React, { useEffect, useState, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Homepage } from './views';
import * as userActions from './store/actions/user.actions'

function App() {
  const dispatch = useDispatch();
  /* @TODO: remove tsignore */
  // @ts-ignore
  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) return;

    (async function () {
      try {
        await dispatch(userActions.auth(jwt));
      } catch (error) {
        console.log(error)
      }
    })()
  }, [userActions.auth, dispatch]);

  useEffect(() => {
    console.log('user:%o', user)
  }, [user])

  return (
    <Router>
      <Switch>
        <Route path="/" component={Homepage} exact />
        {/* <Route path="/*" component={404page} exact /> */}
      </Switch>
    </Router>
  );
}

export default App;
