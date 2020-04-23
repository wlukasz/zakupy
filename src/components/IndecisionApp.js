import React from 'react'
import AddOption from './AddOption'
import Header from './Header'
import Options from './Options'

export default class IndecisionApp extends React.Component {
  constructor(props) {
    super(props)
    this.filterShop = this.filterShop.bind(this)
  }
  state = {
    options: [],
    uniqueShops: [],
    selectedShop: '',
    selected: false
  }
  handleDeleteOptions = () => {
    if (confirm('Warning: This will permanently remove all items.\nNote: To remove just one item swipe it to the left.')) {
      // Return value (an object) is wrapped in parenthesis 'cos otherwise
      // the curly braces would be treated as a wrapper for function body,
      // which is optional for one-line returns and we don't use it here
      this.setState(() => ({ options: [], uniqueShops: [] }))
    }
  }
  handleDeleteOption = (optionToRemove, shopToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter(({ option, shop }) => option !== optionToRemove || shop !== shopToRemove)
    }))
    this.resetShops(this.state.options)
  }
  handleCheck = (optionCheck, shopCheck) => {
    const found = this.state.options.find(({ option, shop }) => option === optionCheck && shop === shopCheck)
    found.checked = !found.checked
    this.setState((prevState) => ({
      options: prevState.options
      .filter(({ option, shop }) => option !== optionCheck || shop !== shopCheck)
      .concat([found]) 
    }))
    if (this.state.selected) {
      const more = this.state.options.filter(({ shop, checked }) => checked && shop === shopCheck)
      if (more.length === 0) {
        this.filterShop('')
      }
      this.resetShops(this.state.options)
    }
  }
  handleToggleView = () => {
    if (!this.state.selected) {
      this.resetShops(this.state.options)
      this.filterShop('')
    }
    this.setState((prevState) => ({
      selected: !prevState.selected
    }))
  }
  handleToggleTicks = () => {
    const anyTicks = !!this.state.options.find(({ checked }) => checked === true)
    let toggledOptions = []
    this.state.options.map(({ option, shop, checked }) => {
      toggledOptions = toggledOptions.concat([{ option, shop, checked: anyTicks ? false : !checked }])
    })

    this.setState({ options: toggledOptions })
  }
  resetShops(options) {
    const shops = options
      .filter(({ checked }) => checked)
      .map(({ shop }) => shop)
    this.setState(() => ({ 
      uniqueShops: [...new Set(shops)] // this dedups the array
    }))
  }
  filterShop(shopToShow) {
    this.setState(() => ({
      selectedShop: shopToShow
    }))
  }
  handleAddOption = ({ option, shop }) => {
    const item = option.toLowerCase()
    const where = shop.toLowerCase() || 'elsewhere'
    if (!option) {
      return 'Enter valid value to add item'
    } else if (this.state.options.find(({ option, shop }) => {
        return item === option && where === shop
      })) {
      return 'This item already exists'
    }

    this.setState((prevState) => ({ 
      options: prevState.options.concat([{ option: item, shop: where, checked: false }]) 
    }))
  }

  // These are React Built-in Life-cycle methods & must be named exactly like below
  // ONLY available for class based components
  componentDidMount() {
    try {
      const json = localStorage.getItem('options')
      const options = JSON.parse(json) 
      
      if (options) {
        this.setState(() => ({ options }))
      }
    } catch (error) {
      // Do nothing - default will be used
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const json = JSON.stringify(this.state.options)
    localStorage.setItem('options', json)
  }
  
  render() {
    const subTitle = ''

    return (
      <div>
        <Header subTitle={subTitle} />                                                    
        <div className="container">
          <div className="widget">
            <Options 
              options={this.state.options}
              selected={this.state.selected}
              uniqueShops={this.state.uniqueShops}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
              handleCheck={this.handleCheck}
              handleToggleView={this.handleToggleView}
              handleToggleTicks={this.handleToggleTicks}
              filterShop={this.filterShop} 
              selectedShop={this.state.selectedShop}
            />
            {this.state.selected === false &&
              <AddOption 
                handleAddOption={this.handleAddOption}
              />
            }
          </div>
        </div>
      </div>
    )
  }
}