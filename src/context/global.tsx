import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import TodoList from '../components/Todos'

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
  Create = 'CREATE_TODO',
  Update = 'UPDATE_TODO',
  Remove = 'DELETE_TODO',
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
      type: TodoActions.Create
      index: number
      payload: TodoItem
    }
  | {
      type: TodoActions.Remove
      id: TodoItem['id']
    }
  | {
      type: TodoActions.Update
      payload: TodoItem
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
      title: 'Example: Backlog',
      content: 'This item is in the backlog and waiting to be actioned',
      status: TodoStatus.Backlog,
    },
    {
      id: '18d68f47-21e6-4543-a01f-cd53e89cdf27',
      title: 'Example: In-progress',
      content:
        'You should aim to complete this item during this pomodoro session',
      status: TodoStatus.InProgress,
    },
    {
      id: '84f6ca79-cf76-494c-98d7-e97ea6146cc9',
      title: 'Example: Done',
      content: 'This item has been completed',
      status: TodoStatus.Done,
    },
  ],
}

const globalReducer = (
  state: GlobalState = initialState,
  action: GlobalAction,
): GlobalState => {
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

    case TodoActions.Create: {
      const todoList = [...state.todoList]
      const idx = action.index

      // at index `idx`, delete 0 items and insert our new todo
      todoList.splice(idx, 0, action.payload)

      return {
        ...state,
        todoList,
      }
    }

    case TodoActions.Update: {
      const todoList = [...state.todoList]
      const idx = todoList.findIndex(({ id }) => id === action.payload.id)
      todoList[idx] = action.payload

      return {
        ...state,
        todoList,
      }
    }

    case TodoActions.Remove: {
      const todoList = state.todoList.filter(({ id }) => id !== action.id)

      return {
        ...state,
        todoList,
      }
    }

    default:
      return { ...state }
  }
}

const getLocalStorage = (): GlobalState | null => {
  const item = localStorage.getItem(LOCALSTORAGE_KEY_GLOBAL_CONTEXT)
  let state = null
  try {
    state = JSON.parse(item ?? '')
  } catch (err) {
    state = null
  }
  return state
}

const setLocalStorage = (item: GlobalState) =>
  localStorage.setItem(LOCALSTORAGE_KEY_GLOBAL_CONTEXT, JSON.stringify(item))

const GlobalContext = createContext<{
  state: GlobalState
  dispatch: React.Dispatch<GlobalAction>
}>({ state: initialState, dispatch: () => {} })

export const GlobalProvider = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
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

export const useGlobalContext = (): {
  state: GlobalState
  dispatch: GlobalDispatch
} => {
  const context = useContext(GlobalContext)

  if (context == null) {
    throw new Error('useGlobalContext must be used inside a GlobalProvider')
  }

  return context
}
