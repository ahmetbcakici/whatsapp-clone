export default [
  {
    message: 'User not found',
    status: 404,
    code: 'USER_NOT_FOUND'
  },
  {
    message: 'Incorrect confirm code',
    status: 403,
    code: 'INCORRECT_CONFIRM_CODE'
  },
  {
    message: 'There is no user with this e-mail address',
    status: 403,
    code: 'NO_USER_WITH_THIS_EMAIL'
  },
  {
    message: 'Incorrect password',
    status: 401,
    code: 'INCORRECT_PASSWORD'
  },
  {
    message: 'This e-mail address already registered',
    status: 403,
    code: 'EMAIL_ALREADY_REGISTERED'
  },
  {
    message: 'A request already exists between you and the user',
    status: 403,
    code: 'REQUEST_ALREADY_EXISTING'
  },
  {
    message: 'Unauthorized',
    status: 401,
    code: 'UNAUTHORIZED'
  },
  {
    message: 'Invalid token',
    status: 403,
    code: 'INVALID_TOKEN'
  },
]