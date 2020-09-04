import React from 'react'
import PropTypes from 'prop-types'
import en from '../../public/images/United_Kingdom.png'
import pl from '../../public/images/Poland.png'

const LingoFlags = (props) => {
  const { selectedLingo, handleSetLingo } = props

  return (
    <div>
      <button
        type="button"
        className="button button--link"
        style={
          selectedLingo === 'en'
            ? { border: 'solid 1px white', borderRadius: '3px' }
            : { border: 'none' }
        }
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
        style={
          selectedLingo === 'pl'
            ? { border: 'solid 1px white', borderRadius: '3px' }
            : { border: 'none' }
        }
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
  selectedLingo: PropTypes.string.isRequired,
  handleSetLingo: PropTypes.func.isRequired,
}

export default LingoFlags
