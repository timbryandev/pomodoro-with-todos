import { TimerMode } from '../context/global'
import { Countdown } from './Countdown'

export const ShortBreak = () => {
  return (
    <div className='timer'>
      <Countdown mode={TimerMode.ShortBreak} />
    </div>
  )
}
