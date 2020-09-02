import React from 'react'
import SwipeToDelete from 'react-swipe-to-delete-ios'
import OptionsHeader from './OptionsHeader'
import Option from './Option'

const Options = (props) => {
  let order = 0
  return (
  <div>
    <OptionsHeader 
      lang={props.lang}
      selected={props.selected}
      optionsLength={props.options.length}
      uniqueShops={props.uniqueShops}
      handleToggleView={props.handleToggleView}
      handleDeleteOptions={props.handleDeleteOptions}
      handleToggleTicks={props.handleToggleTicks}
      filterShop={props.filterShop}
      undoItem={props.undoItem} 
      undoLength={props.undoLength}
    />

    {props.options.length === 0 && <p className="widget__message">{props.lang.emptyListMsg}</p>}
    {props.options
      .sort((a, b) => {
        if (a.shop+a.option < b.shop+b.option) {
          return -1
        } else if (a.shop+a.option > b.shop+b.option) {
          return 1
        } else {
          return 0
        }
      })
      .map(({ option, shop, checked }) => 
        { return (props.selectedShop.length > 0 && props.selectedShop === shop && props.selected && checked 
            || props.selectedShop.length === 0 && props.selected && checked  
            || !props.selected && props.selectedShop.length > 0 && props.selectedShop === shop
            || !props.selected && props.selectedShop.length === 0) 
            &&
          <SwipeToDelete
            // required
            key={shop+option}
            onDelete={(e) => {
              props.handleDeleteOption(option, shop)
            }}
            height={88} 
            // optional
            transitionDuration={250} // default
            deleteWidth={75} // default
            deleteText={props.lang.removeItem}
          >
          <Option 
            key={shop+option} 
            shopText={shop}
            optionText={option}
            checked={checked}
            count={++order} 
            handleCheck={props.handleCheck}
          />
          </SwipeToDelete>
        }
      )
    }
  </div>
  )
}

export default Options