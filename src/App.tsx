import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useLocation,
} from 'react-router-dom'

import './App.css'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Pomodoro />} />
          <Route path='/short-break' element={<ShortBreak />} />
          <Route path='/long-break' element={<LongBreak />} />
        </Route>
      </Routes>
    </Router>
  )
}

function Layout() {
  const location = useLocation()

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link
              to='/'
              className={`button mode-button ${
                location.pathname === '/' ? 'active' : ''
              }`}
            >
              Pomodoro
            </Link>
          </li>
          <li>
            <Link
              to='/short-break'
              className={`button mode-button ${
                location.pathname === '/short-break' ? 'active' : ''
              }`}
            >
              Short Break
            </Link>
          </li>
          <li>
            <Link
              to='/long-break'
              className={`button mode-button ${
                location.pathname === '/long-break' ? 'active' : ''
              }`}
            >
              Long Break
            </Link>
          </li>
        </ul>
      </nav>
      <hr />
      <main className='App'>
        <Outlet />
      </main>
      <hr />
      <footer>https://pomodoro.timbryan.dev</footer>
    </>
  )
}

function Pomodoro() {
  return (
    <>
      <progress id='js-progress' value='0'></progress>
      <div className='progress-bar'></div>
      <div className='timer'>
        {/* <Clock ms={time} /> */}
        <button className='main-button' data-action='start' id='js-btn'>
          Start
        </button>

        <div className='todos'>
          <textarea name='' id='' cols={30} rows={10}></textarea>
        </div>
      </div>

      <div className='hidden'>
        <audio src='backtowork.mp3' data-sound='pomodoro'></audio>
        <audio src='break.mp3' data-sound='shortBreak'></audio>
        <audio src='break.mp3' data-sound='longBreak'></audio>
      </div>
    </>
  )
}

function ShortBreak() {
  return <h2>Short Break</h2>
}

function LongBreak() {
  return <h2>Long Break</h2>
}

// function App() {
//   const [time, setTime] = useState(POMODORO_TIME)

//   useEffect(() => {
//     let timer1 = setTimeout(() => setTime(prev => prev - 1), 1000)

//     return () => {
//       clearTimeout(timer1)
//     }
//   }, [])

//   return (
//     <main className='App'>
//       <progress id='js-progress' value='0'></progress>
//       <div className='progress-bar'></div>
//       <div className='timer'>
//         <div className='button-group mode-buttons' id='js-mode-buttons'>
//           <button
//             data-mode='pomodoro'
//             className='button active mode-button'
//             id='js-pomodoro'
//           >
//             Pomodoro
//           </button>
//           <button
//             data-mode='shortBreak'
//             className='button mode-button'
//             id='js-short-break'
//           >
//             Short break
//           </button>
//           <button
//             data-mode='longBreak'
//             className='button mode-button'
//             id='js-long-break'
//           >
//             Long break
//           </button>
//         </div>
//         <Clock ms={time} />
//         <button className='main-button' data-action='start' id='js-btn'>
//           Start
//         </button>

//         <div className='todos'>
//           <textarea name='' id='' cols={30} rows={10}></textarea>
//         </div>
//       </div>

//       <div className='hidden'>
//         <audio src='backtowork.mp3' data-sound='pomodoro'></audio>
//         <audio src='break.mp3' data-sound='shortBreak'></audio>
//         <audio src='break.mp3' data-sound='longBreak'></audio>
//       </div>
//     </main>
//   )
// }

// export default App
