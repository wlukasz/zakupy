import React from 'react'
import PropTypes from 'prop-types'

export default class AddOption extends React.Component {
  constructor(props) {
    super(props)

    this.state = { error: undefined }
  }

  onAddOption = (e) => {
    e.preventDefault()
    const { selectedShop, handleAddOption } = this.props
    const option = e.target.elements.option.value.trim()
    const shop = e.target.elements.shop.value.trim()
    const error = handleAddOption(option, shop)

    this.setState(() => ({ error }))

    if (!error) {
      e.target.elements.option.value = ''
      e.target.elements.shop.value = selectedShop || ''
    }
    e.target.elements.option.focus()
  }

  render() {
    const { error } = this.state
    const {
      itemPlaceholder,
      shopPlaceholder,
      addItemText,
      selectedShop,
    } = this.props
    return (
      <div>
        {error && <p className="add-option-error">{error}</p>}
        <form className="add-option" onSubmit={this.onAddOption}>
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
