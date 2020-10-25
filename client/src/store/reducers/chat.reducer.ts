import IAction from '../../interfaces/action.interface'
  
  const chat = (state: object = {}, action: IAction) => {
    const { type, payload } = action
  
    switch (type) {
      case 'SET_ACTIVE_CHAT':
        return payload
  
      default:
        return state
    }
  }
  
  export default chat