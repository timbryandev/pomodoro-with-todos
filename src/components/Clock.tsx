import { Mode, useGlobalContext } from '../context/timer'
import { millisToMinuteSeconds } from '../utils/time'

interface ClockProps {
  mode: keyof typeof Mode
}

export const Clock = ({ mode }: ClockProps) => {
  const { state } = useGlobalContext()
  const time = state[mode].current
  const formattedTime = millisToMinuteSeconds(time)

  console.log({ mode, state, time, formattedTime })

  return (
    <div className='clock'>
      <span className='clock__time'>{formattedTime}</span>
      <button className='main-button' data-action='start'>
        Start
      </button>
    </div>
  )
}
