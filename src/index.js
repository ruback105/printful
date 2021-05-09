import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { DataLayer } from './DataLayer.js'
import reducer, { initialState } from './reducer.js'

ReactDOM.render(
  <DataLayer initialState={initialState} reducer={reducer}>
    <App />
  </DataLayer>,
  document.getElementById('root'),
)
