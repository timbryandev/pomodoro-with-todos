import { useLocation } from 'react-router-dom'
import { TimerModeType, useGlobalContext } from '../context/global'
import { TimeValues } from '../types/timer'
import { toCamelCase } from '../utils/strings'

export const Progress = () => {
  const { state } = useGlobalContext()
  const location = useLocation()

  const { pathname } = location
  const mode = toCamelCase(pathname.replace('/', '')) as TimerModeType

  const timer = state[mode]
  let progress = 0

  if (typeof timer?.current === 'number') {
    const timePassed = TimeValues[mode] - timer.current
    progress = timePassed / TimeValues[mode]
  }

  return <progress className='timer__progress' value={progress}></progress>
}
