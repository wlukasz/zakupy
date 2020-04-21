import React from 'react'

const ShopSelector = (props) => (
  <div>
    <select 
      onChange={(e) => {
        props.filterShop(e.target.value)
      }}
    >
      <option value="">All Shops</option>
      {  
        props.uniqueShops
        .sort((a, b) => {
          if (a < b) return -1
          else if (a > b) return 1
          else return 0
        })
        .map((shop) => { 
          return <option key={shop} value={shop}>{shop}</option> 
        })
      }
    </select>
  </div>
)

export default ShopSelector