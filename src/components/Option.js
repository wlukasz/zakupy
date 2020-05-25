import React from 'react'
// <p className="option__text">{props.count}. {props.shopText}: {props.optionText}</p>

const Option = (props) => (
  <div className="option">
    <div>
      <span className="shop__text">{props.count}. {props.shopText}</span>
      <span className="option__text">{props.optionText}</span>
    </div>
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