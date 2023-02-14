import { TodoItem, TodoStatus } from '../../context/global'
import { TodoListItem } from './TodoListItem'

export interface TodoListContainerProps {
  todos: TodoItem[]
  group: TodoStatus
}

export const TodoListGroup = ({ group, todos }: TodoListContainerProps) => (
  <details className='todo__group timer__card'>
    <summary>
      <h2>{group}</h2>
    </summary>
    {todos.map(todo => (
      <TodoListItem {...todo} />
    ))}
  </details>
)
