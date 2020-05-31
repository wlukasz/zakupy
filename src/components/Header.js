import React from 'react'
import LingoFlags from './LingoFlags'

const Header = (props) => (
    <div className="header">
      <div className="container header__flex">
        <h1 className="header__title">{props.shopping}</h1>
        {props.subTitle && <h2 className="header__subtitle">{props.subTitle}</h2>}
        <LingoFlags handleSetLingo={props.handleSetLingo} />
      </div>
    </div>
  )

export default Header