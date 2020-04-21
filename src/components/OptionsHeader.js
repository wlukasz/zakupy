import React from 'react'

const OptionsHeader = (props) => {
  let order = 0
  return (
  <div>
    <div className="widget-header">
      <button
        className="button button--link"  
        onClick={props.handleToggleView}
      >
        {props.selected ? 'All Items' : 'This Shopping Trip'}
      </button>

      {!props.selected &&
        <button
          className="button button--link"  
          onClick={props.handleDeleteOptions}
        >
          Remove All
        </button>
      }
    </div>
  </div>
  )
}

export default OptionsHeader