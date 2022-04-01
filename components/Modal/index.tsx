import Image from 'next/image'
import React, { Fragment, useRef } from 'react'
import { useUI } from '@components/ui/context'
import { Dialog, Transition } from '@headlessui/react'
import SignUpModal from './SignUpModal'
import LoginModal from './LoginModal'

export default function Modal() {
  const cancelButtonRef = useRef(null)
  const { displayModal: open, closeModal, modalView } = useUI()

  const ModalComponent = modalView === 'SIGNUP_VIEW' ? SignUpModal : LoginModal

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-30 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={closeModal}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-16 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-skin-white bg-opacity-70 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block bg-skin-primary px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 align-middle sm:max-w-lg w-full sm:p-6">
              <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="mx-auto h-20 w-56 bg-skin-primary rounded-full overflow-hidden relative">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src="/BigLogo.png"
                    alt="Salt In Water"
                  />
                </div>
              </div>
              <ModalComponent />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
