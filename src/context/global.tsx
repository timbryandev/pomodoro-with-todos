import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'

import { TimeValues } from '../types/timer'

const LOCALSTORAGE_KEY_GLOBAL_CONTEXT = 'global-context'

export enum TodoStatus {
  Backlog = 'BACKLOG',
  InProgress = 'IN_PROGRESS',
  Done = 'COMPLETE',
}

export interface TodoItem {
  id: string
  title: string
  content: string
  status: `${TodoStatus}`
}

export type TodoList = TodoItem[]

export interface TimerItem {
  current: number
  isTicking: boolean
}

export enum TimerMode {
  Pomodoro = 'pomodoro',
  ShortBreak = 'shortBreak',
  LongBreak = 'longBreak',
}

export type TimerModeType = `${TimerMode}`

export interface GlobalState {
  pomodoro: TimerItem
  shortBreak: TimerItem
  longBreak: TimerItem
  todoList: TodoList
}

export enum TimerActions {
  Set = 'SET_TIMER',
  Start = 'START_TIMER',
  Pause = 'PAUSE_TIMER',
  Reset = 'RESET_TIMER',
}

export enum TodoActions {
  Add = 'ADD_TODO',
  Update = 'UPDATE_TODO',
  Remove = 'REMOVE_TODO',
}

export type GlobalAction =
  | {
      type: 'HYDRATE'
      payload: GlobalState
    }
  | {
      type: TimerActions.Set
      timer: TimerMode
      payload: TimerItem
    }
  | {
      type: Exclude<TimerActions, TimerActions.Set>
      timer: TimerMode
    }
  | {
      type: Exclude<TodoActions, TodoActions.Remove>
      key: keyof TodoList
      item: TodoItem
    }
  | {
      type: TodoActions.Remove
      key: keyof TodoList
    }

export type GlobalDispatch = (action: GlobalAction) => void

const initialState: GlobalState = {
  pomodoro: {
    current: TimeValues[TimerMode.Pomodoro],
    isTicking: false,
  },
  shortBreak: {
    current: TimeValues[TimerMode.ShortBreak],
    isTicking: false,
  },
  longBreak: {
    current: TimeValues[TimerMode.LongBreak],
    isTicking: false,
  },
  todoList: [
    {
      id: '85e63d29-f36a-4780-aa8d-e5cb2e8d1ebd',
      title: 'Example',
      content: 'This is an example task',
      status: TodoStatus.Backlog,
    },
  ],
}

function globalReducer(
  state: GlobalState = initialState,
  action: GlobalAction,
): GlobalState {
  switch (action.type) {
    case 'HYDRATE':
      return {
        ...state,
        ...action.payload,
      }

    case TimerActions.Start:
    case TimerActions.Pause: {
      const key = action.timer
      const timer = { ...state[key] }
      timer.isTicking = action.type === 'START_TIMER'

      return {
        ...state,
        [key]: timer,
      }
    }

    case TimerActions.Reset: {
      const key = action.timer
      const timerState = { ...state[key] }
      timerState.current = TimeValues[key]
      timerState.isTicking = false

      return {
        ...state,
        [key]: timerState,
      }
    }

    case TimerActions.Set: {
      const key = action.timer

      return {
        ...state,
        [key]: action.payload,
      }
    }

    case TodoActions.Add:
    case TodoActions.Update: {
      const key = action.key

      return {
        ...state,
        todoList: {
          ...state.todoList,
          [key]: action.item,
        },
      }
    }

    case TodoActions.Remove: {
      const key = action.key
      const todoState = { ...state.todoList }
      delete todoState[key]

      return {
        ...state,
        todoList: todoState,
      }
    }

    default:
      return { ...state }
  }
}

function getLocalStorage(): GlobalState | null {
  const item = localStorage.getItem(LOCALSTORAGE_KEY_GLOBAL_CONTEXT)
  let state = null
  try {
    state = JSON.parse(item ?? '')
  } catch (err) {
    state = null
  }
  return state
}

function setLocalStorage(item: GlobalState) {
  localStorage.setItem(LOCALSTORAGE_KEY_GLOBAL_CONTEXT, JSON.stringify(item))
}

const GlobalContext = createContext<{
  state: GlobalState
  dispatch: React.Dispatch<GlobalAction>
}>({ state: initialState, dispatch: () => {} })

export function GlobalProvider({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const [state, dispatch] = useReducer(
    globalReducer,
    getLocalStorage() ?? { ...initialState },
  )

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])

  useEffect(() => {
    state !== initialState && setLocalStorage(state)
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
//     updateCountdown()

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

// function updateCountdown() {
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
