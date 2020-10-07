import React, { useState, useEffect, SetStateAction, Dispatch } from 'react'

import { socket } from '../../config'
import { sendFriendRequest, getFriendRequests, setFriendRequests } from '../../api/user.requests'

function FriendRequests({ setContent }: { setContent: Dispatch<SetStateAction<string>> }) {
  const [code, setCode] = useState(0)
  const [friendRequests, setFriendRequestsData] = useState([])

  useEffect(() => {
    handleGetFriendRequests()

    socket.on('set-friend-request', () => {
      handleGetFriendRequests()
    })
  }, [])

  const handleGetFriendRequests = async () => {
    try {
      const res = await getFriendRequests()
      setFriendRequestsData(res.data.friendRequests)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const handleSendFriendRequest = async () => {
    try {
      await sendFriendRequest(code)
      handleGetFriendRequests()
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const handleSetFriendRequest = async (requestId: string, requestedUserId: string, type: boolean) => {
    try {
      await setFriendRequests(requestId, requestedUserId, type)
      handleGetFriendRequests()
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <div>
      <span onClick={() => setContent('')}>go back</span>
      friend requests
      <hr />
      <input type="text" onChange={(e) => setCode(parseInt(e.target.value))} />
      <input type="button" value="SUBMIT" onClick={handleSendFriendRequest} />
      <ul>
        {friendRequests.map((request: any) => (
          <li key={request._id} >
            <span>{request.userId.name} {request.userId.surname} </span>
            <span>{request.type} </span>
            {request.type === 'Incoming' && <span onClick={() => handleSetFriendRequest(request._id, request.userId._id, true)}>approve </span>}
            <span onClick={() => handleSetFriendRequest(request._id, request.userId._id, false)}>{request.type === 'Incoming' ? 'Ignore' : 'Cancel'}</span>
          </li>
        )
        )}
      </ul>
    </div>
  )
}

export default FriendRequests