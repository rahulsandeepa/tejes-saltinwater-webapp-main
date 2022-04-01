import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

export function LeftArrow(props: any) {
  const { onClick } = props
  return (
    <div onClick={onClick} className="slick-prev block left-24 z-10">
      <ChevronLeftIcon className="h-10 w-10 text-gray-200" aria-hidden="true" />
    </div>
  )
}

export function RightArrow(props: any) {
  const { onClick } = props
  return (
    <div onClick={onClick} className="slick-next block right-24 z-10">
      <ChevronRightIcon
        className="h-10 w-10 text-gray-200"
        aria-hidden="true"
      />
    </div>
  )
}
