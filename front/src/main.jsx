import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/main.scss'
import { HashRouter as Router } from 'react-router-dom'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
