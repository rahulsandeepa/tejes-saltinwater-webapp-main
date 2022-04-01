import React from 'react'

const Dots = ({
  dotColor,
  dotClasses,
}: {
  dotColor: string
  dotClasses: string
}) => {
  const uniqueId = Date.now()
  return (
    <svg
      className={dotClasses}
      width={404}
      height={784}
      fill="none"
      viewBox="0 0 404 784"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={uniqueId.toString()}
          x={0}
          y={0}
          width={20}
          height={20}
          patternUnits="userSpaceOnUse"
        >
          <rect
            x={0}
            y={0}
            width={4}
            height={4}
            className={dotColor}
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect width={404} height={784} fill={`url(#${uniqueId})`} />
    </svg>
  )
}

export default Dots
