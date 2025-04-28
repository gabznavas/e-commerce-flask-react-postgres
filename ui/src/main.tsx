import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter } from 'react-router'
import RoutesComponent from './routes'
import Header from './components/header'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <>
        <Header />
        <br></br>
        <RoutesComponent />
      </>
    </BrowserRouter>
  </StrictMode>,
)
