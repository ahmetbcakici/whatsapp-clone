import React, { SetStateAction, Dispatch } from 'react'

function Archived({ setContent }: { setContent: Dispatch<SetStateAction<string>> }) {
  return (
    <div>
      <span onClick={() => setContent('')}>geri dön</span>
      archived
    </div>
  )
}

export default Archived
