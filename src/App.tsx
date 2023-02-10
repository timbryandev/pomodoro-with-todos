import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

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
            <Route index element={<Pomodoro />} />
            <Route path='/short-break' element={<ShortBreak />} />
            <Route path='/long-break' element={<LongBreak />} />
          </Route>
        </Routes>
      </Router>
    </GlobalProvider>
  )
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
