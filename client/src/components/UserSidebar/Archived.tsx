import React, { SetStateAction, Dispatch } from 'react'

function Archived({ setContent }: { setContent: Dispatch<SetStateAction<string>> }) {
  return (
    <div>
      <span onClick={() => setContent('')}>go back</span>
      archived
    </div>
  )
}

export default Archived
