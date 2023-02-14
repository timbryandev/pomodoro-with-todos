import { TimerMode } from '../context/global'
import { Countdown } from './Countdown'

export const LongBreak = () => {
  return (
    <div className='timer'>
      <Countdown mode={TimerMode.LongBreak} />
    </div>
  )
}
