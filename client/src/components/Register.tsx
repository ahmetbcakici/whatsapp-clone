import React, { Dispatch, SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap'
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import axios from 'axios'
import * as userActions from '../store/actions/user.actions'

function Login({ setIsLogin }: { setIsLogin: Dispatch<SetStateAction<boolean>> }) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleResponseGoogle = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    try {
      //@ts-ignore @TODO: remove ts-ignore
      const res = await dispatch(userActions.responseGoogle(response.tokenId, 'register'))
    } catch (error) {
      console.log(error)
    }
  }

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const res = await dispatch(userActions.register(name, email, password))
      console.log(res)
    } catch (error) {
      console.log(error)
    }
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
              <Form.Control type='text' placeholder='Your first name' className='bg-transparent border-top-0 border-right-0 border-left-0' onChange={(e) => setName(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Your email' className='border-top-0' onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Control type='password' placeholder='Password' className='border-top-0' onChange={(e) => setPassword(e.target.value)} />
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
          onSuccess={handleResponseGoogle}
          onFailure={handleResponseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </Form>
    </div>
  )
}

export default Login