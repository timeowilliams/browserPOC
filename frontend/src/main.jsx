import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

console.log('Sanity from main')
ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)