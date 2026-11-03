import { headers } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'
import { messages } from './messages'
import { defaultLocale } from './config'

export default getRequestConfig(async () => {
  const locale = (await headers()).get('x-az-locale') === 'en' ? 'en' : defaultLocale
  return { locale, messages: messages[locale], timeZone: 'Asia/Ho_Chi_Minh' }
})
