import { TimerMode } from '../context/global'
import { Countdown } from './Countdown'
import Todos from './Todos/'

export const Pomodoro = () => {
  return (
    <div className='timer'>
      <Countdown mode={TimerMode.Pomodoro} />
      <Todos />
    </div>
  )
}
