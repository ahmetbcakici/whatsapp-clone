import React, { useState, useEffect, SetStateAction, Dispatch } from 'react'

import { socket } from '../../config'
import { sendFriendRequest, getFriendRequests } from '../../api/user.requests'

function FriendRequests({ setContent }: { setContent: Dispatch<SetStateAction<string>> }) {
  const [code, setCode] = useState(0)
  const [friendRequests, setFriendRequests] = useState([])

  useEffect(() => {
    handleGetFriendRequests()

    socket.on('new-friend-request', () => {
      handleGetFriendRequests()
    })
  }, [])

  const handleGetFriendRequests = async () => {
    try {
      const res = await getFriendRequests()
      setFriendRequests(res.data.friendRequests)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const handleSendFriendRequest = async () => {
    try {
      const res = await sendFriendRequest(code)
      handleGetFriendRequests()
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <div>
      <span onClick={() => setContent('')}>geri dön</span>
      friend requests
      <hr />
      <input type="text" onChange={(e) => setCode(parseInt(e.target.value))} />
      <input type="button" value="SUBMIT" onClick={handleSendFriendRequest} />
      <ul>
        {friendRequests.map((request: any) => (
          <li>
            {request.userId.name}
            {request.type}
          </li>
        )
        )}
      </ul>

    </div>
  )
}

export default FriendRequests
