import React from 'react'
import PropTypes from 'prop-types'
import en from '../../public/images/United_Kingdom.png'
import pl from '../../public/images/Poland.png'

const LingoFlags = (props) => {
  const { handleSetLingo } = props

  return (
    <div>
      <button
        type="button"
        className="button button--link"
        title="English"
        onClick={() => {
          handleSetLingo('en')
        }}
      >
        <img src={en} alt="en" />
      </button>
      <button
        type="button"
        className="button button--link"
        title="polski"
        onClick={() => {
          handleSetLingo('pl')
        }}
      >
        <img src={pl} alt="pl" />
      </button>
    </div>
  )
}

LingoFlags.propTypes = {
  handleSetLingo: PropTypes.func.isRequired,
}

export default LingoFlags
