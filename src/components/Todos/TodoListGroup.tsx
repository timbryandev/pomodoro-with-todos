import { TodoItem, TodoStatus, useGlobalContext } from '../../context/global'
import { TodoListItem } from './TodoListItem'

export interface TodoListContainerProps {
  todos: TodoItem[]
  group: TodoStatus
}

export const TodoListGroup = ({ group, todos }: TodoListContainerProps) => (
  <div className='todo__group card'>
    <h2>{group}</h2>
    {todos.map(todo => (
      <TodoListItem {...todo} />
    ))}
  </div>
)
