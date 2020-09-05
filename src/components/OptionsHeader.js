import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ShopSelector from './ShopSelector'

const OptionsHeader = (props) => {
  const {
    allTicked,
    handleToggleView,
    lang,
    selected,
    handleToggleTicks,
    undoItem,
    optionsLength,
    uniqueShops,
    filterShop,
    handleDeleteOptions,
    undoLength,
  } = props

  useEffect(() => {
    if (!selected) {
      document.getElementById('toggleall').checked = allTicked
    }
  }, [allTicked])

  return (
    <div>
      <div className="options-header">
        <button
          type="button"
          className="button button--link"
          onClick={handleToggleView}
        >
          {selected ? lang.allItems : lang.thisShoppingTrip}
        </button>

        {!selected ? (
          <div>
            <button
              type="button"
              className="button button--link button--link-mod"
              onClick={handleToggleTicks}
            >
              <input
                id="toggleall"
                className="chkbox"
                type="checkbox"
                onChange={handleToggleTicks}
              />
              <label className="header-checkbox" htmlFor="toggleall">
                {lang.toggleTicks}
              </label>
            </button>
          </div>
        ) : (
          <div>
            {undoLength > 0 && (
              <button
                type="button"
                className="button button--link"
                onClick={undoItem}
              >
                {lang.undoItem}
              </button>
            )}
          </div>
        )}

        <div className="flex-column-space-between">
          <div style={{ margin: 'auto 5px' }}>
            <ShopSelector
              uniqueShops={uniqueShops}
              filterShop={filterShop}
              allShops={lang.allShops}
            />
          </div>
          {!selected && optionsLength > 0 && (
            <button
              type="button"
              className="button button--link"
              style={{ margin: 'auto' }}
              onClick={handleDeleteOptions}
            >
              {lang.removeAll}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

OptionsHeader.propTypes = {
  allTicked: PropTypes.bool.isRequired,
  handleToggleView: PropTypes.func.isRequired,
  lang: PropTypes.objectOf(PropTypes.string).isRequired,
  selected: PropTypes.bool.isRequired,
  handleToggleTicks: PropTypes.func.isRequired,
  undoItem: PropTypes.func.isRequired,
  optionsLength: PropTypes.number.isRequired,
  uniqueShops: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterShop: PropTypes.func.isRequired,
  handleDeleteOptions: PropTypes.func.isRequired,
  undoLength: PropTypes.number.isRequired,
}

export default OptionsHeader
