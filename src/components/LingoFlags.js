/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import { supportedLocales } from '../config/config'

const LingoFlags = (props) => {
  const { selectedLingo, handleSetLingo } = props
  const items = Object.keys(supportedLocales) || []

  return (
    <div>
      {items.length > 0
        ? items.map((key) => (
            <button
              key={key}
              type="button"
              className="button button--link"
              style={
                selectedLingo === key
                  ? { border: 'solid 1px #3c4251', borderRadius: '50%' }
                  : { border: 'none' }
              }
              title={supportedLocales[key].name}
              onClick={() => {
                handleSetLingo(key)
              }}
            >
              <img src={supportedLocales[key].flag} alt={key} />
            </button>
          ))
        : null}
    </div>
  )
}

LingoFlags.propTypes = {
  selectedLingo: PropTypes.string.isRequired,
  handleSetLingo: PropTypes.func.isRequired,
}

export default LingoFlags
