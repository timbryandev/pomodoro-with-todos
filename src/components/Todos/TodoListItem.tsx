import { TodoItem } from '../../context/global'

export const TodoListItem = ({ content, title }: TodoItem) => (
  <div className='todo__item'>
    <h2>{title}</h2>
    <textarea
      name=''
      id=''
      cols={30}
      rows={4}
      defaultValue={content}
    ></textarea>
  </div>
)
