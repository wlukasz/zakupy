import React from 'react'
import en from '../../public/images/United_Kingdom.png'
import pl from '../../public/images/Poland.png'

const Header = (props) => (
    <div className="header">
      <div className="container header__flex">
        <h1 className="header__title">{props.shopping}</h1>
        {props.subTitle && <h2 className="header__subtitle">{props.subTitle}</h2>}
        <div>
          <button
            className="button button--link"  
            onClick={(e) => {
              props.handleSetLingo('en')
            }}
          >
            <img src={en} alt="en" />
          </button>
          <button
            className="button button--link"  
            onClick={(e) => {
              props.handleSetLingo('pl')
            }}
          >
            <img src={pl} alt="pl" />
          </button>
        </div>
      </div>
    </div>
  )

// Header.defaultProps = {
//   title: 'Zakupy'
// }

export default Header