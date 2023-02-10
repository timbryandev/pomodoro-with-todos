import { Link, Outlet, useLocation } from 'react-router-dom'
import { useGlobalContext } from '../context/global'
import { Progress } from './Progress'

export const Layout = () => {
  const location = useLocation()
  const peter = useGlobalContext()
  console.log({ peter })
  return (
    <>
      <nav>
        <ul className='nav'>
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
        <Progress />
        <Outlet />
      </main>
      <div className='hidden'>
        <audio src='backtowork.mp3' data-sound='pomodoro'></audio>
        <audio src='break.mp3' data-sound='shortBreak'></audio>
        <audio src='break.mp3' data-sound='longBreak'></audio>
      </div>
      <hr />
      <footer>
        <p>
          Base styles from the awesome{' '}
          <a href='https://watercss.kognise.dev/'>Water.css</a>
        </p>
        <p>
          <a href='https://pomodoro.timbryan.dev'>pomodoro.timbryan.dev</a>
        </p>
      </footer>
    </>
  )
}
