import { TodoActions, TodoItem, useGlobalContext } from '../../context/global'
import { ThreeDotsVertical } from '../../icons'

export interface TodoListItemProps extends TodoItem {}

export const TodoListItem = (props: TodoListItemProps) => {
  const { dispatch } = useGlobalContext()

  const handleChange = (field: string, value: string) => {
    dispatch({
      type: TodoActions.Update,
      payload: { ...props, [field]: value },
    })
  }

  return (
    <section className='todo__item'>
      <header className='todo__header'>
        <h3>
          <input
            type='text'
            defaultValue={props.title}
            onChange={evt => handleChange('title', evt.currentTarget.value)}
          />
        </h3>
        <button
          className='button button--plain'
          style={{ margin: '0.5rem', marginRight: '0' }}
        >
          <ThreeDotsVertical />
        </button>
      </header>
      <textarea
        name=''
        id=''
        cols={30}
        rows={4}
        defaultValue={props.content}
        onChange={evt => handleChange('content', evt.currentTarget.value)}
      ></textarea>
    </section>
  )
}
