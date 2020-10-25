import React from 'react'
import IFriend from '../../interfaces/friend.interface'

function SendMessageStick({ chattingWith: { name } }: { chattingWith: IFriend }) {
  return (
    <div>
      {name && (
        <input type="text" name="" id="" />
      )}
    </div>
  )
}

export default SendMessageStick
