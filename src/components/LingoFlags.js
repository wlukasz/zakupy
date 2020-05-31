import React from 'react'
import en from '../../public/images/United_Kingdom.png'
import pl from '../../public/images/Poland.png'

const LingoFlags = (props) => (
  <div>
    <button
      className="button button--link"  
      onClick={(e) => {
        props.handleSetLingo('en')
      }}
    >
      <img src={en} alt="en" />
    </button>
    <button
      className="button button--link"  
      onClick={(e) => {
        props.handleSetLingo('pl')
      }}
    >
      <img src={pl} alt="pl" />
    </button>
  </div>
)

export default LingoFlags