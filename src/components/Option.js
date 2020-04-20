import React from 'react'

const Option = (props) => (
  <div className="option">
  <p className="option__text">{props.count}. {props.shopText}: {props.optionText}</p>
  <input 
    className="chkbox"
    type="checkbox"
    checked={props.checked && "checked"} 
    onChange={(e) => {
      props.handleCheck(props.optionText, props.shopText)
    }}
  />
  </div>
)

export default Option