import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import  MorningComponent from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MorningComponent />
  </StrictMode>,
)
