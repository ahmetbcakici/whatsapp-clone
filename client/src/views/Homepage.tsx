import React from 'react'
import { Col, Row } from 'react-bootstrap'

import { UserSidebar } from '../components/UserSidebar'

function Homepage() {
  return (
    <div>
      <Row>
        <Col sm={3} style={{ height: '100vh', background: 'green' }}>
          <UserSidebar />
        </Col>
        <Col sm={9} style={{ height: '100vh', background: 'yellow' }}>


        </Col>
      </Row>
    </div>
  )
}

export default Homepage