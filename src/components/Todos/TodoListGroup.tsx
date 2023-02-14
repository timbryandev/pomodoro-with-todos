import { TodoItem, TodoStatus } from '../../context/global'
import { TodoListItem } from './TodoListItem'

export interface TodoListContainerProps {
  todos: TodoItem[]
  group: TodoStatus
}

export const TodoListGroup = ({ group, todos }: TodoListContainerProps) => (
  <div className='todo__group timer__card'>
    <h2>{group}</h2>
    {todos.map(todo => (
      <TodoListItem {...todo} />
    ))}
  </div>
)
