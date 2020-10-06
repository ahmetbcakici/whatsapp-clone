import React, { useEffect, useState, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Welcome from './views/Welcome';
import Homepage from './views/Homepage';
import * as userActions from './store/actions/user.actions'
import * as utils from './utils'
import { socket } from './config';

function App() {
  const dispatch = useDispatch()
  /* @TODO: remove tsignore */
  // @ts-ignore
  const user = useSelector((state) => state.userReducer)

  useEffect(() => {
    const jwt = localStorage.getItem('jwt')

    if (!jwt) return

    (async function () {
      try {
        await dispatch(userActions.auth(jwt))
      } catch (error) {
        console.log(error)
      }
    })()
  }, [userActions.auth, dispatch])

  useEffect(() => {
    console.log('user:%o', user)
    if (user._id)
      socket.emit('user-connect', user._id)

  }, [user])

  // @TODO: rendering pages after spinners
  if (!utils.isEmpty(user)) return <Homepage />

  return <Welcome />
}

export default App;