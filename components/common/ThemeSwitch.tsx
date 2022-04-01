import React, { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { getTheme, setDarkMode, setLightMode } from '@lib/util'
import { AnimateSharedLayout, motion } from 'framer-motion'

const ThemeSwitch: React.FC = () => {
  const [isDark, toggleDark] = useState(getTheme() !== 'light')

  useEffect(() => {
    if (getTheme() === 'dark') {
      setDarkMode()
    }
  }, [])

  const changeTheme = () => {
    toggleDark(!isDark)
    if (isDark) {
      setLightMode()
    } else {
      setDarkMode()
    }
  }
  return (
    <AnimateSharedLayout>
      <Switch
        checked={isDark}
        onChange={changeTheme}
        className="bg-skin-secondary z-10 relative flex justify-between items-center flex-shrink-0 h-6 w-11 px-1 rounded-full cursor-pointer outline-none border-2 border-skin-secondary-muted"
      >
        {isDark && <SunIcon className="w-3 h-3 text-skin-primary" />}
        <span className="sr-only">Use setting</span>
        <motion.span
          layout
          aria-hidden="true"
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
          }}
          className="bg-skin-primary pointer-events-none inline-block h-3 w-3 rounded-full shadow-lg transform ring-0 transition-colors ease-in-out duration-300"
        />
        {!isDark && <MoonIcon className="w-3 h-3 text-skin-primary" />}
      </Switch>
    </AnimateSharedLayout>
  )
}

export default ThemeSwitch
