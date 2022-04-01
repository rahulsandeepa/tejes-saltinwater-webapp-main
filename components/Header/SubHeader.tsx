import React from 'react'
import Link from 'next/link'
import { ChatIcon, GlobeIcon, PhoneIcon } from '@heroicons/react/outline'
import { Facebook, Instagram, Twitter } from '../Icons/Common'
import { ThemeSwitch } from '@components/common'
import { IconButton } from '@components/common'

const SubHeader = () => {
  return (
    <div className="hidden lg:block bg-skin-black border-b border-skin-primary">
      <div className="max-w-7xl mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8">
        <div className="flex items-center space-x-6 text-sm font-medium text-skin-white">
          <Link href="/catalog">
            <a className="-m-2 p-2 flex items-center">
              <GlobeIcon className="w-5 h-5 block flex-shrink-0" />
              <span className="ml-2 block">Book Online</span>
            </a>
          </Link>
          <a href="#" className="-m-2 p-2 flex items-center">
            <ChatIcon className="w-5 h-5 block flex-shrink-0" />
            <span className="ml-2 block">Text Now</span>
          </a>
          <a href="#" className="-m-2 p-2 flex items-center">
            <PhoneIcon className="w-5 h-5 block flex-shrink-0" />
            <span className="ml-2 block">Call Now</span>
          </a>
        </div>
        <div className="flex items-center space-x-6">
          <IconButton
            title="Facebook"
            href="https://www.facebook.com/profile.php?id=100073664904930"
          >
            <Facebook className="h-6 w-6" />
          </IconButton>
          <IconButton
            title="Twitter"
            href="https://mobile.twitter.com/SALTINWATER1"
          >
            <Twitter className="h-6 w-6" />
          </IconButton>
          <IconButton
            title="Instagram"
            href="https://www.instagram.com/tejes.saltinwater/"
          >
            <Instagram className="h-6 w-6" />
          </IconButton>
          <ThemeSwitch />
        </div>
      </div>
    </div>
  )
}

export default SubHeader
