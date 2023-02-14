import {
  TodoActions,
  TodoItem,
  TodoStatus,
  useGlobalContext,
} from '../../context/global'
import { showNotification } from '../../utils/browserNotification'
import { toTitleCase } from '../../utils/strings'

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
          onChange={evt => {
            const status = evt.currentTarget.value
            if (status === TodoStatus.Done) {
              showNotification(`🥳 '${props.title}' has been completed!`)
            }
            handleChange('status', status)
          }}
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
        <button>Delete</button>
      </footer>
    </section>
  )
}
