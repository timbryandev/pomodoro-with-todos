import { useLocation } from 'react-router-dom'
import { TimerModeType, useGlobalContext } from '../context/global'
import { TimeValues } from '../types/timer'

function toCamelCase(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/[\s_-]+/g, '')
}

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

  return <progress value={progress}></progress>
}
