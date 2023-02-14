import { useAudio } from '../hooks/useAudio'

export interface ButtonProps extends React.PropsWithChildren {
  onClick?: (evt: React.SyntheticEvent<HTMLButtonElement>) => void
  [x: string]: any
}

export const ButtonWithClick = ({ children, ...rest }: ButtonProps) => {
  const [isPlayingClick, toggleClick] = useAudio('/click.mp3')

  return (
    <button
      {...rest}
      onClick={evt => {
        !isPlayingClick && toggleClick()
        typeof rest.onClick === 'function' && rest.onClick(evt)
      }}
    >
      {children}
    </button>
  )
}
