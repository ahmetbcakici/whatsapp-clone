import React, { useState } from 'react'
import { HeaderStick, MessagesList, SearchBar, Archived } from './'

function UserSidebar() {
  const [content, setContent] = useState('')

  switch (content) {
    case 'Archived':
      return <Archived setContent={setContent} />
    default:
      return (
        <div>
          <HeaderStick setContent={setContent} />
          <SearchBar />
          <MessagesList />
        </div>
      )
  }

  return <p onClick={() => console.log(content)}>bas contenti gör</p>
}

export default UserSidebar
