import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store/index.js'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Suspense fallback={null}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {/* <React.StrictMode> */}
            <App />
          {/* </React.StrictMode> */}
        </PersistGate>
      </Provider>
    </Suspense>
  </BrowserRouter>
)
