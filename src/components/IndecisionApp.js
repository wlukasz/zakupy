import React from 'react'
import AddOption from './AddOption'
import Header from './Header'
import Options from './Options'

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selected: false,
    selectedOption: undefined
  }
  handleDeleteOptions = () => {
    // Return value (an object) is wrapped in parenthesis 'cos otherwise
    // the curly braces would be treated as a wrapper for function body,
    // which is optional for one-line returns and we don't use it here
    this.setState(() => ({ options: []}))
  }
  handleDeleteOption = (optionToRemove, shopToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter(({ option, shop }) => option !== optionToRemove || shop !== shopToRemove)
    }))
  }
  handleCheck = (optionCheck, shopCheck) => {
    const found = this.state.options.find(({ option, shop }) => option === optionCheck && shop === shopCheck)
    found.checked = !found.checked
    this.setState((prevState) => ({
      options: prevState.options.filter(({ option, shop }) => option !== optionCheck || shop !== shopCheck)
    }))
    this.setState((prevState) => ({ 
      options: prevState.options.concat([found]) 
    }))
  }
  handleToggleView = () => {
    this.setState((prevState) => ({
      selected: !prevState.selected
    }))
  }
  handleAddOption = ({ option, shop }) => {
    const item = option.toLowerCase()
    const where = shop.toLowerCase() || 'elsewhere'
    console.log('shop:', shop.length)
    if (!option) {
      return 'Enter valid value to add item'
    } else if (this.state.options.find(({ option, shop }) => {
        return item === option && where === shop
      })) {
      return 'This item already exists'
    }

    const checked = false
    this.setState((prevState) => ({ 
      options: prevState.options.concat([{ option: item, shop: where, checked }]) 
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
  componentWillUnmount() {
    console.log('componentWillUnmount!')
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
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
              handleCheck={this.handleCheck}
              handleToggleView={this.handleToggleView}
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