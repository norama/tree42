import React, { useRef } from 'react'
import { deleteChild } from 'stores/tree'

import './App.css'

function App() {
  const ref = useRef(null)
  const childRef = useRef(null)

  return (
    <div className="App">
      <div className="App-body">
        <div style={{ padding: '20px' }}>
          <div>Parent</div>
          <input ref={ref} type="text" />
        </div>
        <div style={{ padding: '20px' }}>
          <div>Child</div>
          <input ref={childRef} type="text" />
        </div>
        <button onClick={() => deleteChild(ref.current.value, childRef.current.value)}>
          DELETE
        </button>
      </div>
    </div>
  )
}

export default App
