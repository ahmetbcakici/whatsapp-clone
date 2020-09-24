import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'

import Login from '../components/Login'
import Register from '../components/Register'

function Homepage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div style={{ backgroundImage: 'url("https://accounts.sli.do/static/assets/background.8291db23.jpg")', height: '100vh' }}>
      {isLogin ? <Login setIsLogin={setIsLogin} /> : <Register setIsLogin={setIsLogin} />}
    </div>

  )
}

export default Homepage
