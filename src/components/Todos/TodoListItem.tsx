import { TodoActions, TodoItem, useGlobalContext } from '../../context/global'

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
    <div className='todo__item'>
      <h2>
        <input
          type='text'
          defaultValue={props.title}
          onChange={evt => handleChange('title', evt.currentTarget.value)}
        />
      </h2>
      <textarea
        name=''
        id=''
        cols={30}
        rows={4}
        defaultValue={props.content}
        onChange={evt => handleChange('content', evt.currentTarget.value)}
      ></textarea>
    </div>
  )
}
