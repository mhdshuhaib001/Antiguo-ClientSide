import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import './index.css'
import Store from './store/Store.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Provider store={Store}>
        <App />
        </Provider>
  </StrictMode>,
)
