'use client'

import Link from '@/i18n/Link'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { localizePath, stripLocale } from '@/i18n/config'
import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react'
import { ArrowIcon } from './Icons'
import type { Service } from '@/content/site'
import './header.css'
import './interaction-craft.css'

type HeaderService = Pick<Service, 'slug' | 'title' | 'summary' | 'image'>

function Chevron() {
  return <svg className="az-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="m5 8 5 5 5-5" /></svg>
}

export function Header({ services, currentPath = '/' }: { services: HeaderService[]; currentPath?: string }) {
  const pathname = stripLocale(usePathname())
  const locale = useLocale()
  const t = useTranslations('common')
  const h = useTranslations('header')
  const otherLocale = locale === 'en' ? 'vi' : 'en'
  const [languageHref, setLanguageHref] = useState(localizePath(currentPath, otherLocale))
  const navigation = [
    { href: '/gioi-thieu', label: t('about') },
    { href: '/trai-nghiem', label: t('experience') },
    { href: '/bo-suu-tap', label: t('collection') },
    { href: '/kien-thuc', label: t('journal') },
  ]
  const mobileMenu = useRef<HTMLDetailsElement>(null)
  const servicesMenu = useRef<HTMLDetailsElement>(null)
  const header = useRef<HTMLElement>(null)
  const hoverClose = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [condensed, setCondensed] = useState(false)
  const [activeHash, setActiveHash] = useState('')

  const closeMenus = () => {
    if (hoverClose.current) clearTimeout(hoverClose.current)
    if (mobileMenu.current) mobileMenu.current.open = false
    if (servicesMenu.current) servicesMenu.current.open = false
  }
  useEffect(() => {
    closeMenus()
    setActiveHash(window.location.hash)
    setLanguageHref(localizePath(window.location.pathname + window.location.search + window.location.hash, otherLocale))
  }, [pathname, otherLocale, currentPath])
  useEffect(() => {
    const scroll = () => setCondensed(current => window.scrollY > (current ? 40 : 100))
    const hash = () => { setActiveHash(window.location.hash); closeMenus(); setLanguageHref(localizePath(window.location.pathname + window.location.search + window.location.hash, otherLocale)) }
    const outside = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) closeMenus() }
    scroll()
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('hashchange', hash)
    document.addEventListener('pointerdown', outside)
    return () => {
      if (hoverClose.current) clearTimeout(hoverClose.current)
      window.removeEventListener('scroll', scroll)
      window.removeEventListener('hashchange', hash)
      document.removeEventListener('pointerdown', outside)
    }
  }, [otherLocale])

  const isCurrent = (href: string) => href.startsWith('/#') ? pathname === '/' && activeHash === href.slice(1) : pathname === href || pathname.startsWith(`${href}/`)
  const follow = (href: string) => { closeMenus(); setActiveHash(href.includes('#') ? `#${href.split('#')[1]}` : '') }
  const escapeMenu = (event: KeyboardEvent<HTMLDetailsElement>) => {
    if (event.key === 'Escape' && event.currentTarget.open) {
      event.preventDefault()
      event.stopPropagation()
      event.currentTarget.open = false
      event.currentTarget.querySelector('summary')?.focus()
    }
  }
  const blurMenu = (event: FocusEvent<HTMLDetailsElement>) => {
    if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) event.currentTarget.open = false
  }
  const navLink = (item: { href: string; label: string }) => <Link key={item.href} href={item.href} className="az-nav-link" onClick={() => follow(item.href)} aria-current={isCurrent(item.href) ? item.href.includes('#') ? 'location' : 'page' : undefined}>{item.label}</Link>

  return <>
    <header className="az-header" data-condensed={condensed} ref={header}>
      <div className="az-header-inner">
        <Link href="/" className="az-brand" aria-label={t('homeLabel')} onClick={closeMenus}>
          <img src="/brand/logo.svg" width="60" height="60" alt="" />
          <span className="az-brand-name">AZ FACE<span>{t('positioning')}</span></span>
        </Link>
        <nav className="az-desktop-nav" aria-label={h('nav')}>
          {navLink(navigation[0])}
          <details className="az-service-disclosure" ref={servicesMenu} onKeyDown={escapeMenu} onBlur={blurMenu}
            onPointerEnter={event => {
              if (event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
              if (hoverClose.current) clearTimeout(hoverClose.current)
              if (servicesMenu.current) servicesMenu.current.open = true
            }}
            onPointerLeave={event => {
              if (event.pointerType !== 'mouse') return
              hoverClose.current = setTimeout(() => {
                if (servicesMenu.current && !servicesMenu.current.contains(document.activeElement)) servicesMenu.current.open = false
              }, 180)
            }}>
            <summary className="az-nav-link" data-current={pathname.startsWith('/dich-vu')}><span>{t('services')}</span><Chevron /></summary>
            <div className="az-mega-menu">
              <div className="az-mega-intro">
                <h2>{h('serviceTitle')}</h2>
                <p>{h('serviceIntro')}</p>
                <Link href="/dich-vu" className="az-menu-all" onClick={() => follow('/dich-vu')}>{h('all')}<ArrowIcon /></Link>
              </div>
              <div className="az-mega-services">
                {services.length === 0 && <p className="az-service-description">{h('updating')}</p>}
                {services.map(service => <Link key={service.slug} href={`/dich-vu/${service.slug}`} className="az-mega-service" onClick={() => follow(`/dich-vu/${service.slug}`)} aria-current={pathname === `/dich-vu/${service.slug}` ? 'page' : undefined}>
                  <img src={service.image} width="320" height="180" alt="" />
                  <span className="az-service-name">{service.title}<ArrowIcon /></span>
                  <span className="az-service-description">{service.summary}</span>
                </Link>)}
              </div>
            </div>
          </details>
          {navigation.slice(1).map(navLink)}
        </nav>
        <Link href="/lien-he" className="az-header-cta" onClick={closeMenus} aria-current={pathname === '/lien-he' ? 'page' : undefined}>{t('contact')}<ArrowIcon /></Link>
        <a className="az-language-switch" href={languageHref} hrefLang={otherLocale} lang={otherLocale} aria-label={h('language')} onClick={event => { event.currentTarget.href = localizePath(window.location.pathname + window.location.search + window.location.hash, otherLocale) }}>{otherLocale.toUpperCase()}</a>
        <details className="az-mobile-menu" ref={mobileMenu} onKeyDown={escapeMenu} onBlur={blurMenu}>
          <summary className="az-menu-toggle" aria-label={t('menu')}><span className="az-toggle-label">{t('menu')}</span><span className="az-toggle-lines" aria-hidden="true"><span /><span /></span></summary>
          <nav aria-label={h('mobileNav')} className="az-mobile-panel">
            <div className="az-menu-preview" aria-hidden="true"><img src="/images/edition-menu-stilllife.webp" alt="" width="1000" height="1000" /><span>{h('preview')}</span></div>
            <Link href="/" className="az-mobile-home" onClick={closeMenus}>{t('home')}<ArrowIcon /></Link>
            {navLink(navigation[0])}
            <details className="az-mobile-services">
              <summary data-current={pathname.startsWith('/dich-vu')}>{t('services')}<Chevron /></summary>
              <div>
                {services.map(service => <Link key={service.slug} href={`/dich-vu/${service.slug}`} onClick={() => follow(`/dich-vu/${service.slug}`)} aria-current={pathname === `/dich-vu/${service.slug}` ? 'page' : undefined}>{service.title}<ArrowIcon /></Link>)}
                <Link href="/dich-vu" onClick={() => follow('/dich-vu')}>{h('allShort')}<ArrowIcon /></Link>
              </div>
            </details>
            {navigation.slice(1).map(navLink)}
            <Link href="/lien-he" className="az-mobile-contact" onClick={() => follow('/lien-he')}>{t('contact')}<ArrowIcon /></Link>
          </nav>
        </details>
      </div>
    </header>
  </>
}
