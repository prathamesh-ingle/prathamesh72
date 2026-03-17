import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css' // Make sure this points to your Tailwind CSS file

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter enables routing across your entire app */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)