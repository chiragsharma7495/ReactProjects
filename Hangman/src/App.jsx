
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Startgame from "./page/startGame.jsx"
import PlayGame from './page/PlayGame.jsx'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Navigate to="/start" replace />} />
      <Route path='/start' element={<Startgame/>} />
      <Route path = '/playgame' element={<PlayGame/>} />
    </Routes>
  )
}


export default App
