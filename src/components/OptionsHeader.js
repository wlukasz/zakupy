import React from 'react'
import ShopSelector from './ShopSelector'

const OptionsHeader = (props) => {
  let order = 0
  return (
  <div>
    <div className="widget-header">
      <button
        className="button button--link"  
        onClick={props.handleToggleView}
      >
        {props.selected ? props.lang.allItems : props.lang.thisShoppingTrip}
      </button>

      {(props.selected) ? 
        <ShopSelector 
          uniqueShops={props.uniqueShops}
          filterShop={props.filterShop}
          allShops={props.lang.allShops} 
        /> 
        :
        <div className="inline-block">
          <button
            className="button button--link"  
            onClick={props.handleToggleTicks}
          >
            {props.lang.toggleTicks}
          </button>
          <button
            className="button button--link"  
            onClick={props.handleDeleteOptions}
          >
            {props.lang.removeAll}
          </button>
        </div>
      }
    </div>
  </div>
  )
}

export default OptionsHeader