import { TimerMode } from '../context/global'
import { Countdown } from './Countdown'

export const ShortBreak = () => {
  return (
    <div className='timer'>
      <h2>Short Break</h2>
      <Countdown mode={TimerMode.ShortBreak} />
    </div>
  )
}
