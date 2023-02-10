import { useEffect } from 'react'
import { TimerMode, TimerActions, useGlobalContext } from '../context/global'
import { TimeValues } from '../types/timer'
import { showNotification } from '../utils/browserNotification'
import { millisToMinuteSeconds } from '../utils/time'

interface CountdownProps {
  mode: TimerMode
}

export const Countdown = ({ mode }: CountdownProps) => {
  const { state, dispatch } = useGlobalContext()
  const formattedTime = millisToMinuteSeconds(state[mode].current)

  const decreaseTime = () => {
    const decreaseIfTicking = () => {
      if (state[mode].isTicking === false) {
        clearInterval(id)
        return
      }

      const newTime = state[mode].current - TimeValues.second

      if (newTime <= 0) {
        dispatch({
          type: TimerActions.Reset,
          timer: mode,
        })

        showNotification(`${mode} has has ended.`)

        return
      }

      dispatch({
        type: TimerActions.Set,
        timer: mode,
        payload: {
          current: newTime,
          isTicking: true,
        },
      })
    }

    const id = setInterval(decreaseIfTicking, TimeValues.second)

    return () => clearInterval(id)
  }

  const handleToggle = (evt: React.SyntheticEvent<HTMLButtonElement>) => {
    const action = evt.currentTarget.getAttribute('data-action') as
      | TimerActions.Start
      | TimerActions.Pause

    if (action === TimerActions.Start) {
      showNotification(
        `${mode} has started. Time remaining: ${state[mode].current}`,
      )
    }

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

  useEffect(decreaseTime, [state[mode].current, state[mode].isTicking])

  return (
    <div className='countdown'>
      <span className='countdown__time'>{formattedTime}</span>
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
