'use client'

import NextLink from 'next/link'
import { useLocale } from 'next-intl'
import { forwardRef, type ComponentProps } from 'react'
import { localizePath } from './config'

const LocaleLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof NextLink>>(function LocaleLink({ href, ...props }, ref) {
  const locale = useLocale()
  const localized = typeof href === 'string'
    ? localizePath(href, locale)
    : { ...href, pathname: href.pathname ? localizePath(href.pathname, locale) : href.pathname }
  return <NextLink ref={ref} href={localized} {...props} />
})

export default LocaleLink
