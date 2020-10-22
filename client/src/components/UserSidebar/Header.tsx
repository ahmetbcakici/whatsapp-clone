import React, { Dispatch, SetStateAction } from 'react'
import { Col, Row, Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

function Header({ setContent }: { setContent: Dispatch<SetStateAction<string>> }) {
  return (
    <Row>
      <Col sm={7}>
        PP
      </Col>
      <Col sm={5}>
        <span>S</span>
        <span onClick={(e) => setContent(e.currentTarget.innerHTML)}>N</span>
        <FontAwesomeIcon icon={faCoffee} />
        <span>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={(e) => setContent(e.currentTarget.text)}>Friend Requests</Dropdown.Item>
              <Dropdown.Item onClick={(e) => setContent(e.currentTarget.text)}>New Group</Dropdown.Item>
              <Dropdown.Item onClick={(e) => setContent(e.currentTarget.text)}>Profile</Dropdown.Item>
              <Dropdown.Item onClick={(e) => setContent(e.currentTarget.text)}>Archived</Dropdown.Item>
              <Dropdown.Item onClick={(e) => setContent(e.currentTarget.text)}>Starred</Dropdown.Item>
              <Dropdown.Item onClick={(e) => setContent(e.currentTarget.text)}>Settings</Dropdown.Item>
              <Dropdown.Item onClick={(e) => setContent(e.currentTarget.text)}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </span>
      </Col>
    </Row>

  )
}

export default Header