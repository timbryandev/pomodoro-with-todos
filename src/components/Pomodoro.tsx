import { TimerMode } from '../context/global'
import { Countdown } from './Countdown'

export const Pomodoro = () => {
  return (
    <div className='timer'>
      <h2>Pomodoro</h2>
      <Countdown mode={TimerMode.Pomodoro} />

      <div className='todos'>
        <textarea name='' id='' cols={30} rows={10}></textarea>
      </div>
    </div>
  )
}
