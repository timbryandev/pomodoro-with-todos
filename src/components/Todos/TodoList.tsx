import { useGlobalContext } from '../../context/global'
import TodoItem from './TodoItem'

function TodoList() {
  const { state } = useGlobalContext()
  const todos = Object.entries(state.todoList).map(([key, value]) => ({
    ...value,
    key,
  }))

  return (
    <div className='todo__list'>
      {todos.map(todo => (
        <TodoItem {...todo} />
      ))}
    </div>
  )
}

export default TodoList
