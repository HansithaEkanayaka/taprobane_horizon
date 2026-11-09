import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// @ts-ignore: Importing CSS for side effects
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)