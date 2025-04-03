import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>  
    <App />
    <ToastContainer
      autoClose={1000}
      position='top-right'
      pauseOnFocusLoss={false}
      pauseOnHover={false}
    />
  </Provider>
)
