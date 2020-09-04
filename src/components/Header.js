import React from 'react'
import PropTypes from 'prop-types'
import LingoFlags from './LingoFlags'

const Header = ({ selectedLingo, shopping, subTitle, handleSetLingo }) => (
  <div className="header">
    <div className="container header__flex">
      <h1 className="header__title">{shopping}</h1>
      {subTitle && <h2 className="header__subtitle">{subTitle}</h2>}
      <LingoFlags
        selectedLingo={selectedLingo}
        handleSetLingo={handleSetLingo}
      />
    </div>
  </div>
)

Header.defaultProps = {
  shopping: '',
  subTitle: '',
}

Header.propTypes = {
  selectedLingo: PropTypes.string.isRequired,
  shopping: PropTypes.string,
  subTitle: PropTypes.string,
  handleSetLingo: PropTypes.func.isRequired,
}

export default Header
