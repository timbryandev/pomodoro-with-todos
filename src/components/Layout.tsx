import { Link, Outlet, useLocation } from 'react-router-dom'
import { useGlobalContext } from '../context/global'
import { Progress } from './Progress'

export const Layout = () => {
  const location = useLocation()

  return (
    <>
      <nav>
        <ul className='nav'>
          <li>
            <Link
              to='/pomodoro'
              className={`button mode-button pomodoro ${
                location.pathname === '/pomodoro' ? 'active' : ''
              }`}
            >
              Pomodoro
            </Link>
          </li>
          <li>
            <Link
              to='/short-break'
              className={`button mode-button short-break ${
                location.pathname === '/short-break' ? 'active' : ''
              }`}
            >
              Short Break
            </Link>
          </li>
          <li>
            <Link
              to='/long-break'
              className={`button mode-button long-break ${
                location.pathname === '/long-break' ? 'active' : ''
              }`}
            >
              Long Break
            </Link>
          </li>
        </ul>
      </nav>

      <main className='App' data-mode={location.pathname.replace('/', '')}>
        <Progress />
        <Outlet />
      </main>

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
