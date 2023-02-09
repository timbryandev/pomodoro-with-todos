import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'

import { Time } from '../types/time'

const LOCALSTORAGE_KEY_GLOBAL_CONTEXT = 'global-context'

export interface TodoItem {
  title: string
  description: string
  status: 'BACKLOG' | 'INPROGRESS' | 'COMPLETE'
}

export interface TodoList {
  [key: string]: TodoItem
}

export interface TimerItem {
  current: number
  isTicking: boolean
}

export enum Mode {
  pomodoro = 'pomodoro',
  shortBreak = 'shortBreak',
  longBreak = 'longBreak',
}

export interface GlobalState {
  pomodoro: TimerItem
  shortBreak: TimerItem
  longBreak: TimerItem
  todoList: TodoList
}

export type GlobalAction =
  | {
      type: 'HYDRATE'
      payload: GlobalState
    }
  | {
      type: 'RESET_TIMER' | 'START_TIMER' | 'PAUSE_TIMER'
      payload: { timer: Mode }
    }
  | {
      type: 'SET_TIMER'
      payload: { timer: Mode; value: number }
    }
  | {
      type: 'ADD_TODO' | 'UPDATE_TODO'
      payload: { key: TodoList['key']; item: TodoItem }
    }
  | {
      type: 'REMOVE_TODO'
      payload: TodoList['key']
    }

export type GlobalDispatch = (action: GlobalAction) => void

const defaultState: GlobalState = {
  pomodoro: {
    current: defaultTimerValueMap(Mode.pomodoro),
    isTicking: false,
  },
  shortBreak: {
    current: defaultTimerValueMap(Mode.shortBreak),
    isTicking: false,
  },
  longBreak: {
    current: defaultTimerValueMap(Mode.longBreak),
    isTicking: false,
  },
  todoList: {
    '85e63d29-f36a-4780-aa8d-e5cb2e8d1ebd': {
      title: 'Example',
      description: 'This is an example task',
      status: 'BACKLOG',
    },
  },
}

function defaultTimerValueMap(key: keyof typeof Mode): number {
  return Time[key]
}

function globalReducer(state: GlobalState, action: GlobalAction): GlobalState {
  switch (action.type) {
    case 'HYDRATE':
      return {
        ...state,
        ...action.payload,
      }
    case 'RESET_TIMER': {
      const key = action.payload.timer
      const timer = { ...state[key] }
      timer.current = defaultTimerValueMap(key)
      return {
        ...state,
        [key]: timer,
      }
    }
    case 'START_TIMER':
    case 'PAUSE_TIMER': {
      const key = action.payload.timer
      const timer = { ...state[key] }
      timer.isTicking = action.type === 'START_TIMER'
      return {
        ...state,
        [key]: timer,
      }
    }
    case 'SET_TIMER': {
      const key = action.payload.timer
      const timer = { ...state[key] }
      timer.current = action.payload.value
      return {
        ...state,
        [key]: timer,
      }
    }
    case 'ADD_TODO':
    case 'UPDATE_TODO': {
      const key: typeof TodoList.key = action.payload.key
      return {
        ...state,
        todoList: {
          ...state.todoList,
          [key]: action.payload.item,
        },
      }
    }
    //     payload: TodoItem
    //   }
    // | {
    //     type: 'REMOVE_TODO'
    //     payload: TodoList['key']
    //   }
    default:
      return { ...state }
  }
}

const GlobalContext = createContext<{
  state: GlobalState
  dispatch: React.Dispatch<GlobalAction>
}>({ state: defaultState, dispatch: () => {} })

export function GlobalProvider({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const [state, dispatch] = useReducer(globalReducer, { ...defaultState })

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])

  useEffect(() => {
    const existingState = localStorage.getItem(LOCALSTORAGE_KEY_GLOBAL_CONTEXT)
    if (typeof existingState === 'string') {
      dispatch({
        type: 'HYDRATE',
        payload: JSON.parse(existingState),
      })
    }
  }, [])

  useEffect(() => {
    if (state !== defaultState) {
      localStorage.setItem(
        LOCALSTORAGE_KEY_GLOBAL_CONTEXT,
        JSON.stringify(state),
      )
    }
  }, [state])

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobalContext(): {
  state: GlobalState
  dispatch: GlobalDispatch
} {
  const context = useContext(GlobalContext)

  if (context == null) {
    throw new Error('useGlobalContext must be used inside a GlobalProvider')
  }

  return context
}
// function getRemainingTime(endTime) {
//   const currentTime = Date.parse(new Date())
//   const difference = endTime - currentTime

//   const total = Number.parseInt(difference / 1000, 10)
//   const minutes = Number.parseInt((total / 60) % 60, 10)
//   const seconds = Number.parseInt(total % 60, 10)

//   return {
//     total,
//     minutes,
//     seconds,
//   }
// }

// function startTimer() {
//   let { total } = timer.remainingTime
//   const endTime = Date.parse(new Date()) + total * 1000

//   if (timer.mode === 'pomodoro') timer.sessions++

//   mainButton.dataset.action = 'stop'
//   mainButton.textContent = 'stop'
//   mainButton.classList.add('active')

//   interval = setInterval(function () {
//     timer.remainingTime = getRemainingTime(endTime)
//     updateClock()

//     total = timer.remainingTime.total
//     if (total <= 0) {
//       clearInterval(interval)

//       switch (timer.mode) {
//         case 'pomodoro':
//           if (timer.sessions % timer.longBreakInterval === 0) {
//             switchMode('longBreak')
//           } else {
//             switchMode('shortBreak')
//           }
//           break
//         default:
//           switchMode('pomodoro')
//       }

//       if (Notification.permission === 'granted') {
//         const text =
//           timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!'
//         new Notification(text)
//       }

//       document.querySelector(`[data-sound="${timer.mode}"]`).play()

//       startTimer()
//     }
//   }, 1000)
// }

// function stopTimer() {
//   clearInterval(interval)

//   mainButton.dataset.action = 'start'
//   mainButton.textContent = 'start'
//   mainButton.classList.remove('active')
// }

// function updateClock() {
//   const { remainingTime } = timer
//   const minutes = `${remainingTime.minutes}`.padStart(2, '0')
//   const seconds = `${remainingTime.seconds}`.padStart(2, '0')

//   const min = document.getElementById('js-minutes')
//   const sec = document.getElementById('js-seconds')
//   min.textContent = minutes
//   sec.textContent = seconds

//   const text = timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!'
//   document.title = `${minutes}:${seconds} — ${text}`

//   const progress = document.getElementById('js-progress')
//   progress.value = timer[timer.mode] * 60 - timer.remainingTime.total
// }
