import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppRoute } from './routes'

const basename = import.meta.env.VITE_BASE_NAME ?? undefined

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <AppRoute />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
