import { TodoItem } from '../../context/global'

function TodoItem({ content, title }: TodoItem) {
  console.log({ title, content })
  return (
    <div className='todo__item'>
      <h2>{title}</h2>
      <textarea name='' id='' cols={30} rows={10} value={content}></textarea>
    </div>
  )
}

export default TodoItem
