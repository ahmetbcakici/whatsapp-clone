import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { ChatStick, InfoSidebar, Messages, SendMessageStick } from './'

function ChatArea() {
  /* @TODO: remove tsignore */
  // @ts-ignore
  const chattingWith = useSelector((state) => state.chatReducer)

  useEffect(() => {
    console.log("chat : %o", chattingWith)
  }, [chattingWith])

  return (
    <Fragment>
      <ChatStick chattingWith={chattingWith} />
      <Messages chattingWith={chattingWith} />
      <SendMessageStick chattingWith={chattingWith} />
    </Fragment>
  )
}

export default ChatArea