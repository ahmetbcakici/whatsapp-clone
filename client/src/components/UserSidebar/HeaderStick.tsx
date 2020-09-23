import React from 'react'
import { Col, Row, Dropdown } from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

function HeaderStick() {
  return (
    <Row>
      <Col sm={7}>
        PP
      </Col>
      <Col sm={5}>
        <span>S </span>
        <span>N </span>
        <FontAwesomeIcon icon={faCoffee} />
        <span>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>New Group</Dropdown.Item>
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item>Archived</Dropdown.Item>
              <Dropdown.Item>Starred</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </span>
      </Col>
    </Row>

  )
}

export default HeaderStick