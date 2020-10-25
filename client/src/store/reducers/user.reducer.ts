import IAction from '../../interfaces/action.interface'

const user = (state: object = {}, action: IAction) => {
  const { type, payload } = action

  switch (type) {
    case 'SET_USER':
      return payload

    case 'UPDATE_USER':
      return {
        ...state,
        ...payload,
      }

    case 'LOGOUT':
      return null

    default:
      return state
  }
}

export default user