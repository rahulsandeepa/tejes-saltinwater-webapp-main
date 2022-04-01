import { classNames } from '@lib/util'

interface FeatureBarProps {
  className?: string
  title: string
  description?: string
  hide?: boolean
  action?: React.ReactNode
}

const FeatureBar: React.FC<FeatureBarProps> = ({
  title,
  description,
  action,
  hide,
}) => {
  const rootClassName = classNames(
    hide ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100',
    'transform flex text-left md:text-center p-6 bg-skin-accent-light text-sm flex-row justify-center items-center font-medium fixed bottom-0 w-full z-30 transition-all duration-300 ease-out'
  )
  return (
    <div className={rootClassName}>
      <span className="block md:inline">{title}</span>
      <span className="block mb-6 md:inline md:mb-0 md:ml-2">
        {description}
      </span>
      {action && action}
    </div>
  )
}

export default FeatureBar
