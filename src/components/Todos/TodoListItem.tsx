import {
  TodoActions,
  TodoItem,
  TodoStatus,
  useGlobalContext,
} from '../../context/global'
import { showNotification } from '../../utils/browserNotification'
import { toTitleCase } from '../../utils/strings'

export const TodoListItem = (props: TodoItem) => {
  const { dispatch } = useGlobalContext()

  const handleChange = (field: keyof TodoItem, value: string) => {
    if (field === 'status' && value === TodoStatus.Done) {
      showNotification(`🥳 '${props.title}' has been completed!`)
    }

    dispatch({
      type: TodoActions.Update,
      payload: { ...props, [field]: value },
    })
  }

  const handleDelete = () => {
    const hasConfirmedDeletion = window.confirm(
      'Are you sure you want to PERMANENTLY delete this task?',
    )

    if (hasConfirmedDeletion) {
      dispatch({
        type: TodoActions.Remove,
        id: props.id,
      })
    }
  }

  return (
    <section className='todo__item'>
      <header className='todo__header'>
        <h3 className='todo__title'>
          <input
            type='text'
            defaultValue={props.title}
            onChange={evt => handleChange('title', evt.currentTarget.value)}
          />
        </h3>
      </header>
      <textarea
        className='todo__content'
        name=''
        id=''
        cols={30}
        rows={4}
        defaultValue={props.content}
        onChange={evt => handleChange('content', evt.currentTarget.value)}
      ></textarea>
      <footer className='todo__footer'>
        <select
          className='todo__status'
          onChange={evt => handleChange('status', evt.currentTarget.value)}
          value={'default'}
        >
          <option disabled value='default'>
            Move to:
          </option>
          {Object.values(TodoStatus)
            .filter(status => status !== props.status)
            .map(status => (
              <option key={status} value={status}>
                {toTitleCase(status)}
              </option>
            ))}
        </select>
        <button onClick={handleDelete}>Delete</button>
      </footer>
    </section>
  )
}
