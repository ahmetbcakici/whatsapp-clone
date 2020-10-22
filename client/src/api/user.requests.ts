import axios from 'axios'

import { API_URL } from '../config'

const token = localStorage.getItem('jwt')

export const sendFriendRequest = (code: number) =>
  axios.post(`${API_URL}/user/send-friend-request`, { code }, {
    headers: { 'Authorization': token }
  })

export const getFriendRequests = () =>
  axios.get(`${API_URL}/user/get-friend-requests`, {
    headers: { 'Authorization': token }
  })

export const setFriendRequests = (requestId: string, requestedUserId: string, type: boolean) =>
  axios.patch(`${API_URL}/user/set-friend-request`, { requestId, requestedUserId, type }, {
    headers: { 'Authorization': token }
  })

export const getFriends = () =>
  axios.get(`${API_URL}/user/get-friends`, {
    headers: { 'Authorization': token }
  })
