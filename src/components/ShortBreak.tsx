import { TimerMode } from '../context/global'
import { Clock } from './Clock'

export const ShortBreak = () => {
  return (
    <div className='timer'>
      <h2>Short Break</h2>
      <Clock mode={TimerMode.ShortBreak} />
    </div>
  )
}
