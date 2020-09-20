import React, { Dispatch, SetStateAction, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login'
import axios from 'axios'
import * as userActions from '../store/actions/user.actions'

function Login({ setIsLogin }: { setIsLogin: Dispatch<SetStateAction<boolean>> }) {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const responseGoogle = (response: any) => { /* @TODO: replace any with GLoginResponse type after solve error */
    axios
      .post('http://localhost:8080/api/user/google', { token: response.tokenId, type: 'register' })
      .then((res) => {
        console.log(res.data);
      });
  };

  const handleRegister = async (e:any) => {
    e.preventDefault()
    const x = await userActions.register(name, surname, email, password)
    console.log(x)
  }

  return (
    <div>
      <h4> Register </h4>
      <small>or <span className='text-success' onClick={() => setIsLogin(true)}>login to your account</span></small>
      <Form onSubmit={handleRegister}>
        <Row>
          <Col>
            <Form.Group controlId='formBasicName'>
              <Form.Label>First name</Form.Label>
              <Form.Control type='text' placeholder='Your first name' className='bg-transparent border-top-0 border-right-0 border-left-0' />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='formBasicSurname'>
              <Form.Label>Last name</Form.Label>
              <Form.Control type='text' placeholder='Your last name' className='border-top-0' />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Your email' className='border-top-0' />
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
          Register
        </Button>
        <p>or</p>
        <GoogleLogin
          clientId='725921685439-rmdnmh4108aij6vl70fgqrgjbujqlskp.apps.googleusercontent.com'
          buttonText="Sign Up"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </Form>
    </div>
  )
}

export default Login