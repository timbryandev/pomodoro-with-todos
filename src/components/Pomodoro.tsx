import { Clock } from './Clock'

export const Pomodoro = () => {
  return (
    <div className='timer'>
      <h2>Pomodoro</h2>
      <Clock mode='pomodoro' />

      <div className='todos'>
        <textarea name='' id='' cols={30} rows={10}></textarea>
      </div>
    </div>
  )
}
