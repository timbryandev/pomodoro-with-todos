export enum TimeValues {
  second = 1000,
  minute = second * 60,
  pomodoro = minute * 25,
  shortBreak = minute * 5,
  longBreak = minute * 15,
}

export enum TimerActions {
  Set = 'SET_TIMER',
  Start = 'START_TIMER',
  Pause = 'PAUSE_TIMER',
  Reset = 'RESET_TIMER',
}
