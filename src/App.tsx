import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='App'>
      <progress id='js-progress' value='0'></progress>
      <div className='progress-bar'></div>
      <div className='timer'>
        <div className='button-group mode-buttons' id='js-mode-buttons'>
          <button
            data-mode='pomodoro'
            className='button active mode-button'
            id='js-pomodoro'
          >
            Pomodoro
          </button>
          <button
            data-mode='shortBreak'
            className='button mode-button'
            id='js-short-break'
          >
            Short break
          </button>
          <button
            data-mode='longBreak'
            className='button mode-button'
            id='js-long-break'
          >
            Long break
          </button>
        </div>
        <div className='clock' id='js-clock'>
          <span id='js-minutes'>25</span>
          <span className='separator'>:</span>
          <span id='js-seconds'>00</span>
        </div>
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
    </main>
  )
}

export default App
