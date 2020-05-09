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

      {!props.selected && 
        <div>
          <button
            className="button button--link"  
            onClick={props.handleDeleteOptions}
          >
            {props.lang.removeAll}
          </button>
          <button
            className="button button--link"  
            onClick={props.handleToggleTicks}
          >
            {props.lang.toggleTicks}
          </button>
        </div>
      }
        
      <ShopSelector 
        uniqueShops={props.uniqueShops}
        filterShop={props.filterShop}
        allShops={props.lang.allShops} 
      /> 
    </div>
  </div>
  )
}

export default OptionsHeader