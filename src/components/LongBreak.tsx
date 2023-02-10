import { TimerMode } from '../context/global'
import { Countdown } from './Countdown'

export const LongBreak = () => {
  return (
    <div className='timer'>
      <h2>Long BReak</h2>
      <Countdown mode={TimerMode.LongBreak} />
    </div>
  )
}
