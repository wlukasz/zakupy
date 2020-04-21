import React from 'react'
import SwipeToDelete from 'react-swipe-to-delete-ios'
import OptionsHeader from './OptionsHeader'
import Option from './Option'

const Options = (props) => {
  let order = 0
  return (
  <div>
    <OptionsHeader 
      selected={props.selected}
      handleToggleView={props.handleToggleView}
      handleDeleteOptions={props.handleDeleteOptions}
    />

    {props.options.length === 0 && <p className="widget__message">Please add items to get started!</p>}
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
        { return (props.selected && checked || !props.selected) &&
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
            deleteText='Remove'
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