import React, { useState } from 'react'
import PropTypes from 'prop-types'

const AddOption = (props) => {
  const {
    itemPlaceholder,
    shopPlaceholder,
    addItemText,
    selectedShop,
    handleAddOption,
  } = props
  const [error, setError] = useState(undefined)

  const onAddOption = (e) => {
    e.preventDefault()
    const option = e.target.elements.option.value.trim()
    const shop = e.target.elements.shop.value.trim()
    const result = handleAddOption(option, shop)
    setError(() => result)

    if (!result) {
      e.target.elements.option.value = ''
      e.target.elements.shop.value = selectedShop || ''
    }
    e.target.elements.option.focus()
  }

  return (
    <div>
      {error && <p className="add-option-error">{error}</p>}
      <form className="add-option" onSubmit={onAddOption}>
        <input
          className="add-option__input"
          type="text"
          name="option"
          placeholder={itemPlaceholder}
        />
        <input
          className="add-option__input"
          type="text"
          name="shop"
          defaultValue={selectedShop || ''}
          placeholder={shopPlaceholder}
        />
        <button type="submit" className="button">
          {addItemText}
        </button>
      </form>
    </div>
  )
}

AddOption.defaultProps = {
  itemPlaceholder: '',
  shopPlaceholder: '',
  addItemText: '',
}

AddOption.propTypes = {
  itemPlaceholder: PropTypes.string,
  shopPlaceholder: PropTypes.string,
  addItemText: PropTypes.string,
  selectedShop: PropTypes.string.isRequired,
  handleAddOption: PropTypes.func.isRequired,
}

export default AddOption
