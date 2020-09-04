import React from 'react'
import PropTypes from 'prop-types'
import SwipeToDelete from 'react-swipe-to-delete-ios'
import OptionsHeader from './OptionsHeader'
import Option from './Option'

const Options = (props) => {
  const {
    allTicked,
    lang,
    selected,
    options,
    uniqueShops,
    handleToggleView,
    handleDeleteOptions,
    handleToggleTicks,
    filterShop,
    undoItem,
    undoLength,
    selectedShop,
    handleCheck,
    handleDeleteOption,
  } = props
  let order = 0
  return (
    <div>
      <OptionsHeader
        allTicked={allTicked}
        lang={lang}
        selected={selected}
        optionsLength={options.length}
        uniqueShops={uniqueShops}
        handleToggleView={handleToggleView}
        handleDeleteOptions={handleDeleteOptions}
        handleToggleTicks={handleToggleTicks}
        filterShop={filterShop}
        undoItem={undoItem}
        undoLength={undoLength}
      />

      {options.length === 0 && (
        <p className="widget__message">{lang.emptyListMsg}</p>
      )}
      {options
        .sort((a, b) => {
          if (a.shop + a.option < b.shop + b.option) {
            return -1
          }
          if (a.shop + a.option > b.shop + b.option) {
            return 1
          }
          return 0
        })
        .map(({ option, shop, checked }) => {
          return (
            ((selectedShop.length > 0 &&
              selectedShop === shop &&
              selected &&
              checked) ||
              (selectedShop.length === 0 && selected && checked) ||
              (!selected && selectedShop.length > 0 && selectedShop === shop) ||
              (!selected && selectedShop.length === 0)) && (
              <SwipeToDelete
                // required
                key={shop + option}
                onDelete={() => {
                  handleDeleteOption(option, shop)
                }}
                height={88}
                // optional
                transitionDuration={250} // default
                deleteWidth={75} // default
                deleteText={lang.removeItem}
              >
                <Option
                  key={shop + option}
                  shopText={shop}
                  optionText={option}
                  checked={checked}
                  // eslint-disable-next-line no-plusplus
                  count={++order}
                  handleCheck={handleCheck}
                />
              </SwipeToDelete>
            )
          )
        })}
    </div>
  )
}

Options.propTypes = {
  allTicked: PropTypes.bool.isRequired,
  lang: PropTypes.objectOf(PropTypes.string).isRequired,
  selected: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool]))
  ).isRequired,
  uniqueShops: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleToggleView: PropTypes.func.isRequired,
  handleDeleteOptions: PropTypes.func.isRequired,
  handleToggleTicks: PropTypes.func.isRequired,
  filterShop: PropTypes.func.isRequired,
  undoItem: PropTypes.func.isRequired,
  undoLength: PropTypes.number.isRequired,
  selectedShop: PropTypes.string.isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleDeleteOption: PropTypes.func.isRequired,
}

export default Options
