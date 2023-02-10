import { TimerMode, TimerActions, useGlobalContext } from '../context/global'
import { millisToMinuteSeconds } from '../utils/time'

interface ClockProps {
  mode: keyof typeof TimerMode
}

export const Clock = ({ mode }: ClockProps) => {
  const { state, dispatch } = useGlobalContext()
  const timerState = state[TimerMode[mode]]

  const formattedTime = millisToMinuteSeconds(timerState.current)

  const handleToggle = (evt: React.SyntheticEvent<HTMLButtonElement>) => {
    const action = evt.currentTarget.getAttribute('data-action') as
      | TimerActions.Start
      | TimerActions.Pause

    dispatch({
      type: action,
      timer: TimerMode[mode],
    })
  }

  const handleReset = () => {
    dispatch({
      type: TimerActions.Reset,
      timer: TimerMode[mode],
    })
  }

  return (
    <div className='clock'>
      <span className='clock__time'>{formattedTime}</span>
      <button
        className='main-button'
        data-action={
          timerState.isTicking ? TimerActions.Pause : TimerActions.Start
        }
        onClick={handleToggle}
      >
        {timerState.isTicking ? 'Pause' : 'Start'}
      </button>
      <button
        className='main-button'
        data-action={TimerActions.Reset}
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  )
}
