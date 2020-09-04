import React from 'react'
import PropTypes from 'prop-types'

const ShopSelector = (props) => {
  const { filterShop, allShops, uniqueShops } = props

  return (
    <div>
      <select
        id="shopselector"
        onChange={(e) => {
          filterShop(e.target.value)
        }}
      >
        <option value="">{allShops}</option>
        {uniqueShops
          .sort((a, b) => {
            if (a < b) return -1
            if (a > b) return 1
            return 0
          })
          .map((shop) => {
            return (
              <option key={shop} value={shop}>
                {shop}
              </option>
            )
          })}
      </select>
    </div>
  )
}

ShopSelector.defaultProps = {
  allShops: '',
}

ShopSelector.propTypes = {
  allShops: PropTypes.string,
  filterShop: PropTypes.func.isRequired,
  uniqueShops: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default ShopSelector
