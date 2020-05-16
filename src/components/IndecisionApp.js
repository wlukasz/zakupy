import React from 'react'
import AddOption from './AddOption'
import Header from './Header'
import Options from './Options'

export default class IndecisionApp extends React.Component {
  constructor(props) {
    super(props)
    this.filterShop = this.filterShop.bind(this)
    this.handleSetLingo = this.handleSetLingo.bind(this)
    this.setAllTicks = this.setAllTicks.bind(this)
  }
  state = {
    options: [],
    uniqueShops: [],
    selectedShop: '',
    selected: false,
    selectedLingo: '',
    language: {},
    lingos: [
      { 
        lingo: 'en',
        shopping: 'Shopping',
        allItems: 'All Items',
        thisShoppingTrip: 'Go Shopping!',
        toggleTicks: 'All',
        removeAll: 'Remove All',
        allShops: 'All Shops',
        deleteAllMsg1: 'Warning: OK will permanently remove all items. Push Cancel to avoid',
        deleteAllMsg2: 'Note: To remove just one item Cancel this pop-up and swipe item to the left.',
        removeItem: 'Remove',
        addOptionMsg1: 'Enter valid value to add item',
        addOptionMsg2: 'This item already exists',
        emptyListMsg: 'Please add items to get started!',
        itemPlaceholder: 'item',
        shopPlaceholder: 'shop (optional)',  
        elsewhere: 'elsewhere',
        addItemText: 'Add Item',
      },
      { 
        lingo: 'pl',
        shopping: 'Zakupy',
        allItems: 'Lista Ogólna',
        thisShoppingTrip: 'Na Zakupy!',
        toggleTicks: 'Wszystko',
        removeAll: 'Wyczyść Listę',
        allShops: 'Wszystkie Sklepy',
        deleteAllMsg1: 'Uwaga: OK usunie wszystkie towary z listy. Cancel anuluje komendę.',
        deleteAllMsg2: 'Notka: Aby usunąć jeden towar anuluj tę komendę i przesuń wybrany towar w lewo.',
        removeItem: 'Usuń',
        addOptionMsg1: 'Wpisz towar aby dodać go do listy',
        addOptionMsg2: 'Ten towar został już wcześniej dodany do listy', 
        emptyListMsg: 'Aby zacząć dodaj towary do listy.',  
        itemPlaceholder: 'towar',
        shopPlaceholder: 'sklep (opcjonalny)',  
        elsewhere: 'gdziekolwiek',
        addItemText: 'Dodaj Towar',
      }
    ]
  }
  handleDeleteOptions = () => {
    if (confirm(this.state.language.deleteAllMsg1+'\n'+this.state.language.deleteAllMsg2)) {
      // Return value (an object) is wrapped in parenthesis 'cos otherwise
      // the curly braces would be treated as a wrapper for function body,
      // which is optional for one-line returns and we don't use it here
      this.setState(() => ({ options: [], uniqueShops: [] }))
    }
  }
  handleDeleteOption = (optionToRemove, shopToRemove) => {
    const newOptions = this.state.options.filter(({ option, shop }) => option !== optionToRemove || shop !== shopToRemove)
    this.setState({ options: newOptions })
    this.resetShops(newOptions, true)
    this.filterShop('')
    if (!this.state.selected) {
      this.setAllTicks(newOptions)
    }
  }
  handleCheck = (optionCheck, shopCheck) => {
    const found = this.state.options.find(({ option, shop }) => option === optionCheck && shop === shopCheck)
    found.checked = !found.checked
    const newOptions = this.state.options
                      .filter(({ option, shop }) => option !== optionCheck || shop !== shopCheck)
                      .concat([found]) 

    if (!this.state.selected) {
      this.setAllTicks(newOptions)
    }
    this.setState({ options: newOptions })

    if (this.state.selected) {
      const more = this.state.options.filter(({ shop, checked }) => checked && shop === shopCheck)
      if (more.length === 0) {
        this.filterShop('')
      }
      this.resetShops(this.state.options.filter(({ checked }) => checked))
    } 
  }
  handleToggleView = () => {
    this.resetShops(this.state.options)
    document.getElementById('shopselector').value = ''
    this.filterShop('')
    
    this.setState((prevState) => ({ selected: !prevState.selected }), () => {
      // callback executed AFTER new "selected" is set
      if (!this.state.selected) {
        this.setAllTicks(this.state.options)
      }
    })
  }
  handleToggleTicks = () => {
    const anyTicks = !!this.state.options.find(({ checked }) => checked === true)
    let toggledOptions = []
    this.state.options.map(({ option, shop, checked }) => {
      toggledOptions = toggledOptions.concat([{ option, shop, checked: anyTicks ? false : !checked }])
    })

    this.setState({ options: toggledOptions })
  }
  setShops(options) {
    let shops = []
    shops = options.map(({ shop }) => shop)
    this.setState(() => ({ 
      uniqueShops: [...new Set(shops)] // this dedups the array
    }))
  }
  resetShops(options, trick = null) {
    let shops = []
    if (!this.state.selected && !trick) {
        shops = options
        .filter(({ checked }) => checked)
        .map(({ shop }) => shop)
    } else {
      shops = options.map(({ shop }) => shop)
    }
      
    this.setState(() => ({ 
      uniqueShops: [...new Set(shops)] // this dedups the array
    }))
  }
  filterShop(shopToShow) {
    this.setState(() => ({
      selectedShop: shopToShow
    }))
  }
  setAllTicks(options) {
    const foundTick = !!options.find(option => option.checked === true)
    if (foundTick) {
      document.getElementById('toggleall').checked = false
    } else {
      document.getElementById('toggleall').checked = true
    }
  }
  handleAddOption = ({ option, shop }) => {
    const item = option.toLowerCase()
    const where = shop.toLowerCase() || this.state.language.elsewhere
    if (!option) {
      return this.state.language.addOptionMsg1
    } else if (this.state.options.find(({ option, shop }) => {
        return item === option && where === shop
      })) {
      return this.state.language.addOptionMsg2
    }

    const newOptions = this.state.options.concat([{ option: item, shop: where, checked: false }])
    this.resetShops(newOptions, true)
    document.getElementById('shopselector').value = ''
    this.filterShop('')
    // this.setAllTicks(newOptions)
    this.setState({ options: newOptions })
  }
  handleSetLingo(lingo) {
    const lingoToSet = lingo
    this.setState(() => ({ 
      selectedLingo: lingoToSet,
      language: this.state.lingos.find(({ lingo }) => lingo === lingoToSet)
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
        this.setShops(options)
        if (!this.state.selected) {
          this.setAllTicks(options)
        }
      }
  } catch (error) {
      // Do nothing - default will be used
    }
    try {
      const jsonLingo = localStorage.getItem('lingo')
      const storedLingo = JSON.parse(jsonLingo) 
      const lingoToSet = storedLingo ? storedLingo : 'en'
      this.handleSetLingo(lingoToSet)
    } catch (error) {
      // Do nothing - default will be used
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const json = JSON.stringify(this.state.options)
    localStorage.setItem('options', json)
    const jsonLingo = JSON.stringify(this.state.selectedLingo)
    localStorage.setItem('lingo', jsonLingo)
  }
  
  render() {
    const subTitle = ''

    return (
      <div>
        <Header 
          subTitle={subTitle} 
          shopping={this.state.language.shopping}
          handleSetLingo={this.handleSetLingo}
       />                                                    
        <div className="container">
          <div className="widget">
            <Options 
              options={this.state.options}
              lang={this.state.language}
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
              itemPlaceholder={this.state.language.itemPlaceholder}
              shopPlaceholder={this.state.language.shopPlaceholder}
              addItemText={this.state.language.addItemText}
              handleAddOption={this.handleAddOption}
              />
            }
          </div>
        </div>
      </div>
    )
  }
}