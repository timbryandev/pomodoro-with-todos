export interface TodoInsertMarkerProps {
  hidden: boolean
  onClick: () => void
}

export const TodoInsertMarker = ({
  hidden,
  onClick,
}: TodoInsertMarkerProps) => (
  <button
    className={`button--plain todo__insert-marker ${
      hidden ? 'hidden--soft' : ''
    }`}
    title='Insert a new Todo item here'
    onClick={onClick}
  >
    ---- Insert new item ---
  </button>
)
