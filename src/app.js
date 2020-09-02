import React from 'react'
import ReactDOM from 'react-dom'
import WebFont from 'webfontloader'
import Zakupy from './components/Zakupy'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

WebFont.load({
  google: {
    families: ['Roboto Condensed:300,400,700', 'sans-serif'],
    // families: ['Roboto:100,200,300,400,500,700,900', 'sans-serif']
  }
})

ReactDOM.render(<Zakupy />, document.querySelector('#app'))
