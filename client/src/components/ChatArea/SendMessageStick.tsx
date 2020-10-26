import React, { Fragment } from 'react'
import IFriend from '../../interfaces/friend.interface'

function SendMessageStick({ chattingWith: { name } }: { chattingWith: IFriend }) {
  return (
    <div>
      {name && (
        <Fragment>
          <input type="text" name="" id="" />
          <input type="submit" value="" />
        </Fragment>
      )}
    </div>
  )
}

export default SendMessageStick
