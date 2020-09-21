import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'

import { API_URL } from '../../config';

export const login = (email: string, password: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user, token },
      }: { data: { user: object, token: string } } = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
      });

      localStorage.setItem('jwt', token);
      return dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
      return reject(error);
    }
  });

export const register = (name: string, surname: string, email: string, password: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        data: { user, token },
      } = await axios.post(`${API_URL}/user/register`, {
        name,
        surname,
        email,
        password,
      });
      localStorage.setItem('jwt', token);
      dispatch({ type: 'SET_USER', payload: user });
      return resolve({ user, token })
    } catch (error) {
      return reject(error);
    }
  });

export const auth = (token: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
  new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`${API_URL}/user/`, {
        headers: {
          'Authorization': token,
        },
      });
      dispatch({ type: 'SET_USER', payload: data });
      return resolve();
    } catch (error) {
      return reject(error);
    }
  });

export const responseGoogle = (token: string, type: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
  new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(`${API_URL}/user/google`, { token, type });
      dispatch({ type: 'SET_USER', payload: data });
      return resolve()
    } catch (error) {
      console.log(error)
      return reject(error);
    }
  });