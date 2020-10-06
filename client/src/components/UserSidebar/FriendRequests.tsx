import React, { useState, useEffect, SetStateAction, Dispatch } from 'react'

import { socket } from '../../config'
import { sendFriendRequest } from '../../api/user.requests'

function FriendRequests({ setContent }: { setContent: Dispatch<SetStateAction<string>> }) {
  const [code, setCode] = useState(0)

  useEffect(() => {
    console.log('hia')
    socket.on('x', () => {
      console.log('x socket on')
    })
  },[])

  const handleSendFriendRequest = async () => {
    try {
      const res = await sendFriendRequest(code)
      console.log(res)
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
    </div>
  )
}

export default FriendRequests
