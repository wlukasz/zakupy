import React from 'react'
import SwipeToDelete from 'react-swipe-to-delete-ios'
import Option from './Option'

const Options = (props) => (
  <div>
    <div className="widget-header">
      <button
      className="button button--link"  
      onClick={props.handleToggleView}
    >
      {props.selected ? 'All Items' : 'This Shopping Trip'}
    </button>
      <button
        className="button button--link"  
        onClick={props.handleDeleteOptions}
      >
        Remove All
      </button>
    </div>

    {props.options.length === 0 && <p className="widget__message">Please add items to get started!</p>}
    {
      props.options
      .sort((a, b) => {
        if (a.shop+a.option < b.shop+b.option) {
          return -1
        } else if (a.shop+a.option > b.shop+b.option) {
          return 1
        } else {
          return 0
        }
      })
      .map(({ option, shop, checked }, index) => 
        { return (props.selected && checked || !props.selected) &&
          <SwipeToDelete
            key={shop+option}
            onDelete={(e) => {
              props.handleDeleteOption(option, shop)
            }}
            height={88} // required
            // optional
            transitionDuration={250} // default
            deleteWidth={75} // default
            deleteText='Remove' // default
          >
          <Option 
            key={shop+option} 
            shopText={shop}
            optionText={option}
            checked={checked}
            count={index + 1} 
            // handleDeleteOption={props.handleDeleteOption}
            handleCheck={props.handleCheck}
          />
          </SwipeToDelete>
        }
      )
    }
  </div>
)

export default Options