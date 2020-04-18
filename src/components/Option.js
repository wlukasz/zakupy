import React from 'react'

const Option = (props) => (
  <div className="option">
  <div className="left-side">
  <button 
  className="button button--link"  
  onClick={(e) => {
    props.handleDeleteOption(props.optionText, props.shopText)
  }}
  >
  remove
  </button>
  <p className="option__text">{props.count}. {props.shopText}: {props.optionText}</p>
  </div>
  <input 
    type="checkbox"
    checked={props.checked && "checked"} 
    onChange={(e) => {
      props.handleCheck(props.optionText, props.shopText)
    }}
  />
  </div>
)

export default Option