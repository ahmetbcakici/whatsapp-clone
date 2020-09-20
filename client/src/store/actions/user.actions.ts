import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

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
      return resolve({user,token})
    } catch (error) {
      return reject(error);
    }
  });

export const auth = (token: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
  new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`${API_URL}/user`, {
        headers: {
          'Authorization': token,
        },
      });
      return dispatch({ type: 'SET_USER', payload: data });
    } catch (error) {
      return reject(error);
    }
  });

export const responseGoogle = (response: any) => {
  console.log('balo')
  return (dispatch: any) => {
    console.log('alo')
    return new Promise(async (resolve, reject) => {

      const { data } = await axios
        .post(`${API_URL}/user/google`, { token: response.tokenId, type: 'login' })
      console.log(data)
      return resolve(data)
    })
  }
}



export const google = (response: any, type: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
  new Promise(async (resolve, reject) => {
    console.log('hiır')
    try {
      const { data } = await axios.post(`${API_URL}/user/google`, { token: response.tokenId, type });
      console.log(data)
      return dispatch({ type: 'SET_USER', payload: data });
    } catch (error) {
      console.log(error)
      return reject(error);
    }
  });