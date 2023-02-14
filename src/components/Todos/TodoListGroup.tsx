import React from 'react'
import {
  TodoActions,
  TodoItem,
  TodoStatus,
  useGlobalContext,
} from '../../context/global'
import { toCamelCase, toTitleCase } from '../../utils/strings'
import { TodoInsertMarker } from './TodoInsertMarker'
import { TodoListItem } from './TodoListItem'

export interface TodoListContainerProps {
  todos: TodoItem[]
  group: TodoStatus
}

export const TodoListGroup = ({ group, todos }: TodoListContainerProps) => {
  const { dispatch } = useGlobalContext()

  const handleInsertTodo = (idx: number) => {
    dispatch({
      type: TodoActions.Create,
      index: idx + 1, // compensate for 0-indexing
      payload: {
        id: crypto.randomUUID(),
        title: '',
        content: '',
        status: group,
      },
    })
  }

  return (
    <details className={`todo__group timer__card ${toCamelCase(group)}`}>
      <summary>
        <h2>{toTitleCase(group)}</h2>
      </summary>
      {todos.map((todo, idx) => (
        <React.Fragment key={todo.id}>
          <TodoInsertMarker
            hidden={group === TodoStatus.Done}
            onClick={() => handleInsertTodo(idx)}
          />
          <TodoListItem {...todo} />
          {idx === todos.length - 1 ? (
            <TodoInsertMarker
              hidden={group === TodoStatus.Done}
              onClick={() => handleInsertTodo(todos.length)}
            />
          ) : null}
        </React.Fragment>
      ))}
    </details>
  )
}
