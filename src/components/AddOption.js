import React from 'react'

export default class AddOption extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
  error: undefined
  }
  handleAddOption = (e) => {
    e.preventDefault()
    const option = e.target.elements.option.value.trim()
    const shop = e.target.elements.shop.value.trim()
    const error = this.props.handleAddOption({ option, shop })
    
    this.setState(() => ({ error }))
    
    if (!error) {
      e.target.elements.option.value = ''
      e.target.elements.shop.value = ''
    }
    e.target.elements.option.focus()
  }
  render() {
    return (
      <div>
        {this.state.error && <p className="add-option-error">{this.state.error}</p>}
        <form className="add-option" onSubmit={this.handleAddOption}>
          <input className="add-option__input" type="text" name="option" placeholder={this.props.itemPlaceholder} />
          <input className="add-option__input" type="text" name="shop" placeholder={this.props.shopPlaceholder} />
          <button className="button">{this.props.addItemText}</button>
        </form>        
      </div>
    )
  }
}