import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Player from './Player/Player'
import PlayListProvider from './Contexts/PlayListContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PlayListProvider>
      <App />
    </PlayListProvider>
  </React.StrictMode>
)
