import { TimerMode } from '../context/global'
import { Clock } from './Clock'

export const LongBreak = () => {
  return (
    <div className='timer'>
      <h2>Long BReak</h2>
      <Clock mode={TimerMode.LongBreak} />
    </div>
  )
}
