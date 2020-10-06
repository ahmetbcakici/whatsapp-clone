import axios from 'axios'

import { API_URL } from '../config'

const token = localStorage.getItem('jwt')

export const sendFriendRequest = (code: number) =>
  axios.post(`${API_URL}/user/send-friend-request`, { code }, {
    headers: { 'Authorization': token }
  })