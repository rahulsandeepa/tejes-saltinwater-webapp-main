import { ACCORDION_TABS } from '@components/ui/context'

export const ANONYMOUS_EMAIL = 'anonymous@example.com'
export const CHECKOUT_TOKEN = 'checkoutToken'
export const API_URI = process.env.NEXT_PUBLIC_SALEOR_API_URL || ''
export const DEFAULT_CHANNEL = process.env.NEXT_PUBLIC_SALEOR_CHANNEL || ''

export const ACCORDION_IDS: ACCORDION_TABS[] = [
  'CONTACT_INFO',
  'SELECT_PRODUCTS',
  'DATE_AND_SLOT',
  'BILLING_INFO',
]

export const LABEL_MAPPINGS: { [key in ACCORDION_TABS]: string } = {
  CONTACT_INFO: 'Contact Information',
  SELECT_PRODUCTS: 'Select Service',
  DATE_AND_SLOT: 'Select Date & Time Slot',
  BILLING_INFO: 'Billing Information',
}

export const morning = [
  '8:00 am',
  '8:30 am',
  '9:00 am',
  '9:30 am',
  '10:00 am',
  '10:30 am',
  '11:00 am',
  '11:30 am',
]
export const afternoon = [
  '12:00 pm',
  '12:30 pm',
  '1:00 pm',
  '1:30 pm',
  '2:00 pm',
  '2:30 pm',
  '3:00 pm',
  '3:30 pm',
  '4:00 pm',
  '4:30 pm',
  '5:00 pm',
  '4:30 pm',
]
export const evening = ['5:00 pm', '5:30 pm', '6:00 pm', '6:30 pm']
