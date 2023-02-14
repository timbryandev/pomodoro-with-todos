import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import { GlobalProvider } from './context/global'

import './App.css'
import { Layout } from './components/Layout'
import { LongBreak } from './components/LongBreak'
import { Pomodoro } from './components/Pomodoro'
import { ShortBreak } from './components/ShortBreak'

export default function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Navigate replace to='/pomodoro' />} />
            <Route path='/pomodoro' element={<Pomodoro />} />
            <Route path='/short-break' element={<ShortBreak />} />
            <Route path='/long-break' element={<LongBreak />} />
          </Route>
        </Routes>
      </Router>
    </GlobalProvider>
  )
}
