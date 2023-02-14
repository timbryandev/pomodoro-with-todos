import { TodoItem, TodoStatus } from '../../context/global'
import { toCamelCase, toTitleCase } from '../../utils/strings'
import { TodoListItem } from './TodoListItem'

export interface TodoListContainerProps {
  todos: TodoItem[]
  group: TodoStatus
}

export const TodoListGroup = ({ group, todos }: TodoListContainerProps) => (
  <details className={`todo__group timer__card ${toCamelCase(group)}`}>
    <summary>
      <h2>{toTitleCase(group)}</h2>
    </summary>
    {todos.map(todo => (
      <TodoListItem {...todo} />
    ))}
  </details>
)
