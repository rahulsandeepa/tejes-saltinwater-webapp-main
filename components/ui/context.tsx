import { CHECKOUT_TOKEN } from '@lib/const'
import React, {
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react'

export interface State {
  displaySidebar: boolean
  displayModal: boolean
  sidebarView: string
  modalView: string
  checkoutToken: string
  checkoutDate: Date
  checkoutSlot: string
  accordionTab: string
}

const initialState = {
  displaySidebar: false,
  displayModal: false,
  modalView: 'HEADER_VIEW',
  sidebarView: 'CART_VIEW',
  checkoutToken: '',
  checkoutDate: new Date(),
  checkoutSlot: '',
  accordionTab: 'CONTACT_INFO',
}

type Action =
  | {
      type: 'OPEN_SIDEBAR'
    }
  | {
      type: 'CLOSE_SIDEBAR'
    }
  | {
      type: 'OPEN_MODAL'
    }
  | {
      type: 'CLOSE_MODAL'
    }
  | {
      type: 'SET_MODAL_VIEW'
      view: MODAL_VIEWS
    }
  | {
      type: 'SET_SIDEBAR_VIEW'
      view: SIDEBAR_VIEWS
    }
  | {
      type: 'SET_CHECKOUT_TOKEN'
      token: string
    }
  | {
      type: 'SET_CHECKOUT_DATE'
      date: Date
    }
  | {
      type: 'SET_CHECKOUT_SLOT'
      slot: string
    }
  | {
      type: 'SET_ACCORDION_TAB'
      tab: ACCORDION_TABS
    }

type MODAL_VIEWS = 'SIGNUP_VIEW' | 'LOGIN_VIEW' | 'FORGOT_VIEW'

type SIDEBAR_VIEWS = 'CART_VIEW' | 'MOBILE_MENU'

export type ACCORDION_TABS =
  | 'CONTACT_INFO'
  | 'SELECT_PRODUCTS'
  | 'DATE_AND_SLOT'
  | 'BILLING_INFO'

export const UIContext = React.createContext<State | any>(initialState)

UIContext.displayName = 'UIContext'

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_SIDEBAR': {
      return {
        ...state,
        displaySidebar: true,
      }
    }
    case 'CLOSE_SIDEBAR': {
      return {
        ...state,
        displaySidebar: false,
      }
    }
    case 'OPEN_MODAL': {
      return {
        ...state,
        displayModal: true,
        displaySidebar: false,
      }
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        displayModal: false,
      }
    }
    case 'SET_MODAL_VIEW': {
      return {
        ...state,
        modalView: action.view,
      }
    }
    case 'SET_SIDEBAR_VIEW': {
      return {
        ...state,
        sidebarView: action.view,
      }
    }
    case 'SET_CHECKOUT_DATE': {
      return {
        ...state,
        checkoutDate: action.date,
      }
    }
    case 'SET_CHECKOUT_SLOT': {
      return {
        ...state,
        checkoutSlot: state.checkoutSlot === action.slot ? '' : action.slot,
      }
    }
    case 'SET_ACCORDION_TAB': {
      return {
        ...state,
        accordionTab: action.tab,
      }
    }
    case 'SET_CHECKOUT_TOKEN': {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(CHECKOUT_TOKEN, action.token)
      }
      return {
        ...state,
        checkoutToken: action.token,
      }
    }
  }
}

export const UIProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState)

  const openSidebar = useCallback(
    () => dispatch({ type: 'OPEN_SIDEBAR' }),
    [dispatch]
  )
  const closeSidebar = useCallback(
    () => dispatch({ type: 'CLOSE_SIDEBAR' }),
    [dispatch]
  )
  const toggleSidebar = useCallback(
    () =>
      state.displaySidebar
        ? dispatch({ type: 'CLOSE_SIDEBAR' })
        : dispatch({ type: 'OPEN_SIDEBAR' }),
    [dispatch, state.displaySidebar]
  )
  const closeSidebarIfPresent = useCallback(
    () => state.displaySidebar && dispatch({ type: 'CLOSE_SIDEBAR' }),
    [dispatch, state.displaySidebar]
  )

  const openModal = useCallback(
    () => dispatch({ type: 'OPEN_MODAL' }),
    [dispatch]
  )
  const closeModal = useCallback(
    () => dispatch({ type: 'CLOSE_MODAL' }),
    [dispatch]
  )

  const setModalView = useCallback(
    (view: MODAL_VIEWS) => dispatch({ type: 'SET_MODAL_VIEW', view }),
    [dispatch]
  )

  const setSidebarView = useCallback(
    (view: SIDEBAR_VIEWS) => dispatch({ type: 'SET_SIDEBAR_VIEW', view }),
    [dispatch]
  )

  const setAccordionTab = useCallback(
    (tab: ACCORDION_TABS) => dispatch({ type: 'SET_ACCORDION_TAB', tab }),
    [dispatch]
  )

  const setCheckoutDate = useCallback(
    (date: Date) => dispatch({ type: 'SET_CHECKOUT_DATE', date }),
    [dispatch]
  )

  const setCheckoutSlot = useCallback(
    (slot: string) => dispatch({ type: 'SET_CHECKOUT_SLOT', slot }),
    [dispatch]
  )

  const setCheckoutToken = useCallback(
    (token: string) => dispatch({ type: 'SET_CHECKOUT_TOKEN', token }),
    [dispatch]
  )

  const value = useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      closeSidebarIfPresent,
      openModal,
      closeModal,
      setModalView,
      setSidebarView,
      setCheckoutToken,
      setAccordionTab,
      setCheckoutDate,
      setCheckoutSlot,
    }),
    [state]
  )

  return <UIContext.Provider value={value} {...props} />
}

export const useUI = () => {
  const context = useContext(UIContext)

  useEffect(() => {
    let checkoutToken: string | null = ''
    if (typeof window !== 'undefined') {
      checkoutToken = window.localStorage.getItem(CHECKOUT_TOKEN)
    }
    if (checkoutToken) {
      context.setCheckoutToken(checkoutToken)
    }
  }, [])

  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

export const ManagedUIContext: FC<{ children: ReactNode }> = ({ children }) => (
  <UIProvider>{children}</UIProvider>
)
