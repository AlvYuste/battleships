import { createRoot } from 'react-dom/client'
import './index.css'
import Game from './pages/Game.tsx'

createRoot(document.getElementById('root')!).render(
  <Game />
)
