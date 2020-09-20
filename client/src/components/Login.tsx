import React, { Dispatch, SetStateAction } from 'react'
import { Form, Button } from 'react-bootstrap'
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login'
import axios from 'axios'
import { responseGoogle as x } from '../store/actions/user.actions'

function Login({ setIsLogin }: { setIsLogin: Dispatch<SetStateAction<boolean>> }) {

  /* const responseGoogle = (response: any) => { // @TODO: replace any with GLoginResponse type after solve error
    axios
      .post('http://localhost:8080/api/user/google', { token: response.tokenId, type: 'login' })
      .then((res) => {
        console.log(res.data);
      });
  }; */

  const responseGoogle = async (response: any) => {
    const y = await x(response)
    console.log('y:',y)
  }

  return (
    <div>
      <h4> Log in to your account </h4>
      <small>or <span className='text-success' onClick={() => setIsLogin(false)}>generate account</span></small>
      <Form>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' className='border-top-0' />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Control type='password' placeholder='Password' className='border-top-0' />
        </Form.Group>
        <Form.Group controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='Remember me' />
        </Form.Group>
        <Form.Group controlId='formBasicCheckbox'>
          <Form.Label>Forgot Password?</Form.Label>
        </Form.Group>
        <Button variant='success' type='submit' style={{ borderRadius: '50%' }}>
          Login
        </Button>
        <p>or</p>
        <GoogleLogin
          clientId='725921685439-rmdnmh4108aij6vl70fgqrgjbujqlskp.apps.googleusercontent.com'
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </Form>
    </div>
  )
}

export default Login