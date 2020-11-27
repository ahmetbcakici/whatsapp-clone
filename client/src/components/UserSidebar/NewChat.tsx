import { fireEvent } from '@testing-library/react';
import React, { SetStateAction, Dispatch, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { getFriends } from '../../api/user.requests'
import IFriend from '../../interfaces/friend.interface'
import * as chatActions from '../../store/actions/chat.actions'

function Archived({ setContent }: { setContent: Dispatch<SetStateAction<string>> }) {
  const [friends, setFriends] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    handleGetFriends();
  }, [])

  const handleGetFriends = async () => {
    try {
      const { data } = await getFriends()
      console.log(data)
      setFriends(data.friends)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const handleX = (friend : IFriend) => {
    dispatch(chatActions.setActiveChat(friend))
  }

  return (
    <div>
      <span onClick={() => setContent('')}>go back</span>
      <li>
        {friends && friends.map((friend: IFriend, index: number) => {
          return (
            <ul key={index} style={{ background: '#ececec' }} onClick={() => handleX(friend)}>
              <span>{friend.name}</span>
              <br />
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
