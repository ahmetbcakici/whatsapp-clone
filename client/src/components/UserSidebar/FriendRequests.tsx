import React, { SetStateAction, Dispatch } from 'react'

function FriendRequests({ setContent }: { setContent: Dispatch<SetStateAction<string>> }) {
  return (
    <div>
      <span onClick={() => setContent('')}>geri dön</span>
      friend requests
    </div>
  )
}

export default FriendRequests
