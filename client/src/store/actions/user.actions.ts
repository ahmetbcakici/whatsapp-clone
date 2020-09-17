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