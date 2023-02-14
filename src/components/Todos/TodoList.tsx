import { TodoItem, TodoStatus, useGlobalContext } from '../../context/global'
import { TodoListGroup } from './TodoListGroup'

export const TodoList = () => {
  const { state } = useGlobalContext()
  const todos = Object.entries(state.todoList).map(([key, value]) => ({
    ...value,
    key,
  }))

  const { backlog, inprogress, done } = todos.reduce(
    (acc, cur) => {
      if (cur.status === TodoStatus.Backlog) acc.backlog.push(cur)
      if (cur.status === TodoStatus.InProgress) acc.inprogress.push(cur)
      if (cur.status === TodoStatus.Done) acc.done.push(cur)
      return acc
    },
    {
      backlog: [] as TodoItem[],
      inprogress: [] as TodoItem[],
      done: [] as TodoItem[],
    },
  )

  return (
    <>
      <TodoListGroup
        key={TodoStatus.InProgress}
        group={TodoStatus.InProgress}
        todos={inprogress}
      />

      <TodoListGroup
        key={TodoStatus.Backlog}
        group={TodoStatus.Backlog}
        todos={backlog}
      />

      <TodoListGroup
        key={TodoStatus.Done}
        group={TodoStatus.Done}
        todos={done}
      />
    </>
  )
}
