import { useEffect } from 'react'
import { TimerMode, TimerActions, useGlobalContext } from '../context/global'
import { TimeValues } from '../types/timer'
import { millisToMinuteSeconds } from '../utils/time'

interface ClockProps {
  mode: TimerMode
}

export const Clock = ({ mode }: ClockProps) => {
  const { state, dispatch } = useGlobalContext()
  const formattedTime = millisToMinuteSeconds(state[mode].current)

  const handleToggle = (evt: React.SyntheticEvent<HTMLButtonElement>) => {
    const action = evt.currentTarget.getAttribute('data-action') as
      | TimerActions.Start
      | TimerActions.Pause

    dispatch({
      type: action,
      timer: mode,
    })
  }

  const handleReset = () => {
    dispatch({
      type: TimerActions.Reset,
      timer: mode,
    })
  }

  useEffect(() => {
    const id = setInterval(() => {
      if (state[mode].isTicking === false) {
        clearInterval(id)
        return
      }

      dispatch({
        type: TimerActions.Set,
        timer: mode,
        payload: {
          current: state[mode].current - TimeValues.second,
          isTicking: true,
        },
      })
    }, TimeValues.second)

    return () => clearInterval(id)
  }, [state[mode].current, state[mode].isTicking])

  return (
    <div className='clock'>
      <span className='clock__time'>{formattedTime}</span>
      <button
        className='main-button'
        data-action={
          state[mode].isTicking ? TimerActions.Pause : TimerActions.Start
        }
        onClick={handleToggle}
      >
        {state[mode].isTicking ? 'Pause' : 'Start'}
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
