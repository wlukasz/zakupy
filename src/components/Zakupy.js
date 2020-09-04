/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */

import React from 'react'
import AddOption from './AddOption'
import Header from './Header'
import Options from './Options'
import lingos from '../config/translations'

export default class Zakupy extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      options: [],
      allTicked: false,
      uniqueShops: [],
      selectedShop: '',
      selected: false,
      undoQueue: [],
      selectedLingo: '',
      language: {},
    }
    this.filterShop = this.filterShop.bind(this)
    this.handleSetLingo = this.handleSetLingo.bind(this)
    this.setAllTicks = this.setAllTicks.bind(this)
    this.undoItem = this.undoItem.bind(this)
  }

  componentDidMount() {
    try {
      const { selected } = this.state
      const json = localStorage.getItem('options')
      const options = JSON.parse(json)

      if (options) {
        this.setState(() => ({ options }))
        this.setShops(options)
        if (!selected) {
          this.setAllTicks(options)
        }
      }
    } catch (error) {
      // Do nothing - default will be used
    }
    try {
      const jsonLingo = localStorage.getItem('lingo')
      const storedLingo = JSON.parse(jsonLingo)
      const lingoToSet = storedLingo || 'en'
      this.handleSetLingo(lingoToSet)
    } catch (error) {
      // Do nothing - default will be used
    }
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState) {
    const { options, selectedLingo } = this.state
    const json = JSON.stringify(options)
    localStorage.setItem('options', json)
    const jsonLingo = JSON.stringify(selectedLingo)
    localStorage.setItem('lingo', jsonLingo)
  }

  setAllTicks(options, selectedShop = null) {
    const foundTick = !!options.find((option) =>
      selectedShop
        ? option.checked === true && option.shop === selectedShop
        : option.checked === true
    )
    if (foundTick) {
      this.setState(() => ({ allTicked: false }))
    } else {
      this.setState(() => ({ allTicked: true }))
    }
  }

  setShops(options) {
    let shops = []
    shops = options.map(({ shop }) => shop)
    this.setState(() => ({
      uniqueShops: [...new Set(shops)], // this dedups the array
    }))
  }

  handleCheck = (optionCheck, shopCheck) => {
    const { options, selected, selectedShop, undoQueue } = this.state
    const found = options.find(
      ({ option, shop }) => option === optionCheck && shop === shopCheck
    )
    found.checked = !found.checked
    const newOptions = options
      .filter(
        ({ option, shop }) => option !== optionCheck || shop !== shopCheck
      )
      .concat([found])

    let newUndoQueue = []
    if (!selected) {
      this.setAllTicks(newOptions, selectedShop)
    } else {
      newUndoQueue = undoQueue.concat([
        { option: optionCheck, shop: shopCheck, checked: true },
      ])
    }
    this.setState({ options: newOptions, undoQueue: newUndoQueue })

    if (selected) {
      const more = options.filter(
        ({ shop, checked }) => checked && shop === shopCheck
      )
      if (more.length === 0) {
        this.filterShop('')
      }
      this.resetShops(options.filter(({ checked }) => checked))
    }
  }

  handleAddOption = (inputOption, inputShop) => {
    const { language, options } = this.state
    const item = inputOption.toLowerCase()
    const where = inputShop.toLowerCase() || language.elsewhere
    if (!item) {
      return language.addOptionMsg1
    }
    if (
      options.find(({ option, shop }) => {
        return item === option && where === shop
      })
    ) {
      return language.addOptionMsg2
    }

    const newOptions = options.concat([
      { option: item, shop: where, checked: true },
    ])

    this.resetShops(newOptions, true)
    const { selectedShop } = this.state
    if (selectedShop && selectedShop !== where) {
      document.getElementById('shopselector').value = ''
      this.filterShop('')
    }
    this.setState({ options: newOptions })
    return ''
  }

  handleDeleteOptions = () => {
    const { language } = this.state

    if (confirm(`${language.deleteAllMsg1}\n${language.deleteAllMsg2}`)) {
      // Return value (an object) is wrapped in parenthesis 'cos otherwise
      // the curly braces would be treated as a wrapper for function body,
      // which is optional for one-line returns and we don't use it here
      this.setState(() => ({ options: [], uniqueShops: [] }))
    }
  }

  handleToggleTicks = () => {
    const { options, selectedShop } = this.state

    const shopSelected = !!selectedShop
    const anyTicks = !!options.find(({ shop, checked }) =>
      shopSelected
        ? shop === selectedShop && checked === true
        : checked === true
    )

    let toggledOptions = []
    options.forEach(({ option, shop, checked }) => {
      if (shopSelected) {
        if (shop === selectedShop) {
          toggledOptions = toggledOptions.concat([
            { option, shop, checked: anyTicks ? false : !checked },
          ])
        } else {
          toggledOptions = toggledOptions.concat([{ option, shop, checked }])
        }
      } else {
        toggledOptions = toggledOptions.concat([
          { option, shop, checked: anyTicks ? false : !checked },
        ])
      }
    })

    this.setState({ options: toggledOptions })
  }

  handleToggleView = () => {
    const { options, selected } = this.state

    this.resetShops(options)
    document.getElementById('shopselector').value = ''
    this.filterShop('')

    this.setState(
      (prevState) => ({ selected: !prevState.selected }),
      () => {
        // callback executed AFTER new "selected" is set
        if (!selected) {
          this.setAllTicks(options)
          this.setState(() => ({ undoQueue: [] }))
        }
      }
    )
  }

  handleDeleteOption = (optionToRemove, shopToRemove) => {
    const { options, selected, selectedShop } = this.state
    const newOptions = options.filter(
      ({ option, shop }) => option !== optionToRemove || shop !== shopToRemove
    )
    this.setState({ options: newOptions }, () => {
      this.resetShops(options, true, () => {
        this.filterShop(selectedShop, () => {
          if (!selected) {
            this.setAllTicks(options, selectedShop)
          }
        })
      })
    })
  }

  handleSetLingo(lingoToSet) {
    this.setState(() => ({
      selectedLingo: lingoToSet,
      language: lingos.find(({ lingo }) => lingo === lingoToSet),
    }))
  }

  undoItem() {
    const { options, undoQueue } = this.state
    const clonedUndoQueue = undoQueue
    const itemToUndo = clonedUndoQueue.pop()
    const clonedOptions = options
    clonedOptions.forEach((item) => {
      if (item.option === itemToUndo.option && item.shop === itemToUndo.shop) {
        // eslint-disable-next-line no-param-reassign
        item.checked = true
      }
    })

    this.setState({ options: clonedOptions, undoQueue: clonedUndoQueue })
  }

  resetShops(options, trick = null) {
    const { selected, uniqueShops, selectedShop } = this.state
    let shops = []

    if (!selected && !trick) {
      shops = options.filter(({ checked }) => checked).map(({ shop }) => shop)
    } else {
      shops = options.map(({ shop }) => shop)
    }

    this.setState(
      () => ({ uniqueShops: [...new Set(shops)] }),
      () => {
        const shopExists = uniqueShops.find((shop) => shop === selectedShop)
        if (!shopExists) {
          this.setState({ selectedShop: '' })
        }

        if (!selected) {
          this.setAllTicks(options, selectedShop)
        }
      }
    )
  }

  filterShop(shopToShow) {
    const { selected, options, selectedShop } = this.state
    this.setState(
      () => ({ selectedShop: shopToShow }),
      () => {
        if (!selected) {
          this.setAllTicks(options, selectedShop)
          // document.getElementById('shop').value = shopToShow
        }
      }
    )
  }

  render() {
    const {
      allTicked,
      language,
      options,
      selected,
      selectedLingo,
      selectedShop,
      undoQueue,
      uniqueShops,
    } = this.state
    const subTitle = ''

    return (
      <div>
        <Header
          selectedLingo={selectedLingo}
          subTitle={subTitle}
          shopping={language.shopping}
          handleSetLingo={this.handleSetLingo}
        />
        <div className="container">
          <div className="widget">
            <Options
              options={options}
              allTicked={allTicked}
              lang={language}
              selected={selected}
              uniqueShops={uniqueShops}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
              handleCheck={this.handleCheck}
              handleToggleView={this.handleToggleView}
              handleToggleTicks={this.handleToggleTicks}
              filterShop={this.filterShop}
              selectedShop={selectedShop}
              undoItem={this.undoItem}
              undoLength={undoQueue.length}
            />
            {selected === false && (
              <AddOption
                itemPlaceholder={language.itemPlaceholder}
                shopPlaceholder={language.shopPlaceholder}
                addItemText={language.addItemText}
                selectedShop={selectedShop}
                handleAddOption={this.handleAddOption}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}
