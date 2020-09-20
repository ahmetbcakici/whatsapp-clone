interface Action {
  type: string;
  payload: object;
};

const user = (state: object = {}, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_USER':
      return payload;

    case 'UPDATE_USER':
      return {
        ...state,
        ...payload,
      };

    case 'LOGOUT':
      return null;

    default:
      return state;
  }
};

export default user;