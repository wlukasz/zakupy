import React from 'react'

const Option = (props) => (
  <div className="option">
  <p className="option__text">{props.count}. {props.shopText}: {props.optionText}</p>
  <button 
    className="button button--link"  
    onClick={(e) => {
      props.handleDeleteOption(props.optionText, props.shopText)
    }}
  >
    remove
  </button>
  <input 
    type="checkbox" 
    onChange={(e) => {
      props.handleCheck(props.optionText, props.shopText)
    }}
  />
  </div>
)

export default Option