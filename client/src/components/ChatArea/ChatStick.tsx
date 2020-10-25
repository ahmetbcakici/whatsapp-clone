import React from 'react'

import IFriend from '../../interfaces/friend.interface'

function ChatStick({ chattingWith:{name} }: { chattingWith: IFriend }) {
    return (
        <div>
            <p>{name} </p>
        </div>
    )
}

export default ChatStick
