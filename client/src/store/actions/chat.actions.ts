import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import IFriend from '../../interfaces/friend.interface'

export const setActiveChat = (friend: IFriend) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    return dispatch({ type: 'SET_ACTIVE_CHAT', payload: friend });
}