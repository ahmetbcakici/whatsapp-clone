import React from 'react'
import { Row } from 'react-bootstrap'

function SearchBar() {
  return (
    <Row >
      <input type="text" placeholder='Search or start new chat' className='w-100' />
    </Row>
  )
}

export default SearchBar
