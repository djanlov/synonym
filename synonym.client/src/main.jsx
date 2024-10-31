import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Synonym from './Synonym.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Synonym />
  </StrictMode>,
)
