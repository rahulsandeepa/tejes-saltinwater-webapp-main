import { ReactNode } from 'react'

const IconButton = ({
  href,
  children,
  title,
  buttonClasses,
}: {
  href: string
  children: ReactNode
  title: string
  buttonClasses: string
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={buttonClasses || `text-sm font-medium text-skin-white`}
    >
      <span className="sr-only">{title}</span>
      {children}
    </a>
  )
}

IconButton.defaultProps = {
  buttonClasses: '',
}

export default IconButton
