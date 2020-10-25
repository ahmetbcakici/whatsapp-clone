import React, { Fragment, useState } from 'react'
import { Header, MessagesList, SearchBar, Archived, FriendRequests, NewChat } from './'
function UserSidebar() {

  const [content, setContent] = useState('')

  switch (content) {
    case 'Friend Requests':
      return <FriendRequests setContent={setContent} />
    case 'Archived':
      return <Archived setContent={setContent} />
    case 'N':
      return <NewChat setContent={setContent} />
    default:
      return (
        <Fragment>
          <Header setContent={setContent} />
          <SearchBar />
          <MessagesList />
        </Fragment>
      )
  }

  return <p onClick={() => console.log(content)}>bas contenti gör</p>
}

export default UserSidebar