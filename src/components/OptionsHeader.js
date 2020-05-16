import React from 'react'
import ShopSelector from './ShopSelector'

const OptionsHeader = (props) => {
  return (
  <div>
    <div className="options-header">
      <button
        className="button button--link"  
        onClick={props.handleToggleView}
      >
        {props.selected ? props.lang.allItems : props.lang.thisShoppingTrip}
      </button>

      {!props.selected && 
        <div>
          <button
            className="button button--link button--link-mod"  
            onClick={props.handleToggleTicks}
          >
            <input 
              id="toggleall"
              className="chkbox"
              type="checkbox"
              onChange={props.handleToggleTicks}
            />
            <label className="header-checkbox" htmlFor="toggleall">{props.lang.toggleTicks}</label>
          </button>
        </div>
      }
      
      <div>
        <ShopSelector 
          uniqueShops={props.uniqueShops}
          filterShop={props.filterShop}
          allShops={props.lang.allShops} 
        /> 
        {!props.selected && 
          <div>
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
  </div>
  )
}

export default OptionsHeader