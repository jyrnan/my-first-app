import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const messages: string[] = ['Hello', 'World', 'React']

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App messages={messages} />
  </StrictMode>,
)
