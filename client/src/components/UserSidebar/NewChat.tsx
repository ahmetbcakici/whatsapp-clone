import { fireEvent } from '@testing-library/react';
import React, { SetStateAction, Dispatch, useEffect, useState } from 'react'

import { getFriends } from '../../api/user.requests'

interface Friend {
  _id: String,
  name: String,
  surname: String,
  about: String,
  avatar: String
}

function Archived({ setContent }: { setContent: Dispatch<SetStateAction<string>> }) {
  const [friends, setFriends] = useState([])

  useEffect(() => {
    (async function(){
      await handleGetFriends();
      console.log(friends)
    })()
  }, [friends])

  const handleGetFriends = async () => {
    try {
      const { data } = await getFriends()
      console.log(data)
      setFriends(data.friends)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <div>
      <span onClick={() => setContent('')}>go back</span>
      <li>
        {friends && friends.map((friend: Friend) => {
          return (
            <ul key={friend._id.toString()}>
              <span>{friend.name} {friend.surname}</span>
              <span>{friend.about}</span>
            </ul>
          )
        })}
      </li>
      <br />

    </div>
  )
}

export default Archived
