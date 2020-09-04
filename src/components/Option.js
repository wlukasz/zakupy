import React from 'react'
import PropTypes from 'prop-types'

const Option = (props) => {
  const { count, shopText, optionText, checked, handleCheck } = props

  return (
    <div className="option">
      <div>
        <span className="shop__text">
          {count}
          {'. '}
          {shopText}
        </span>
        <span className="option__text">{optionText}</span>
      </div>
      <input
        className="chkbox"
        type="checkbox"
        checked={checked && 'checked'}
        onChange={() => {
          handleCheck(optionText, shopText)
        }}
      />
    </div>
  )
}

Option.propTypes = {
  count: PropTypes.number.isRequired,
  shopText: PropTypes.string.isRequired,
  optionText: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleCheck: PropTypes.func.isRequired,
}

export default Option
