import React, { useState, useEffect, SetStateAction, Dispatch } from 'react'

import { socket } from '../../config'
import { sendFriendRequest, getFriendRequests, setFriendRequestsState } from '../../api/user.requests'

function FriendRequests({ setContent }: { setContent: Dispatch<SetStateAction<string>> }) {
  const [code, setCode] = useState(0)
  const [friendRequests, setFriendRequestsData] = useState([])

  useEffect(() => {
    handleGetFriendRequests()

    socket.on('set-friend-request-state', () => {
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

  const handleSetFriendRequestState = async (requestId: string, requestedUserId: string, isApproved: boolean) => {
    try {
      await setFriendRequestsState(requestId, requestedUserId, isApproved)
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
        {friendRequests.map((request: any/*TODO: any???*/) => (
          <li key={request._id} >
            <span>{request.userId.name} </span>
            <span>{request.type} </span>
            {request.type === 'Incoming' && <span onClick={() => handleSetFriendRequestState(request._id, request.userId._id, true)}>approve </span>}
            <span onClick={() => handleSetFriendRequestState(request._id, request.userId._id, false)}>{request.type === 'Incoming' ? 'Ignore' : 'Cancel'}</span>
          </li>
        )
        )}
      </ul>
    </div>
  )
}

export default FriendRequests