import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import MainContent from './components/main'
import store from './store'

ReactDOM.render(
  <Provider store={store}><MainContent /></Provider>,
  document.getElementById('root')
)
