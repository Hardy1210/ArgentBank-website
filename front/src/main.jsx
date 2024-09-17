import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/main.scss'

//redux
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

import { HashRouter as Router } from 'react-router-dom'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  </React.StrictMode>,
)
