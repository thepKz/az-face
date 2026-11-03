'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react'
import { ArrowIcon } from './Icons'
import type { Service } from '@/content/site'
import './header.css'

const navigation = [
  { href: '/gioi-thieu', label: 'Về AZ FACE' },
  { href: '/trai-nghiem', label: 'Trải nghiệm' },
  { href: '/bo-suu-tap', label: 'Bộ sưu tập' },
  { href: '/kien-thuc', label: 'Kiến thức' },
]

type HeaderService = Pick<Service, 'slug' | 'title' | 'summary' | 'image'>

function Chevron() {
  return <svg className="az-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="m5 8 5 5 5-5" /></svg>
}

export function Header({ services }: { services: HeaderService[] }) {
  const pathname = usePathname()
  const mobileMenu = useRef<HTMLDetailsElement>(null)
  const servicesMenu = useRef<HTMLDetailsElement>(null)
  const header = useRef<HTMLElement>(null)
  const [condensed, setCondensed] = useState(false)
  const [activeHash, setActiveHash] = useState('')

  const closeMenus = () => {
    if (mobileMenu.current) mobileMenu.current.open = false
    if (servicesMenu.current) servicesMenu.current.open = false
  }
  useEffect(() => {
    closeMenus()
    setActiveHash(window.location.hash)
  }, [pathname])
  useEffect(() => {
    const scroll = () => setCondensed(current => window.scrollY > (current ? 40 : 100))
    const hash = () => { setActiveHash(window.location.hash); closeMenus() }
    const outside = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) closeMenus() }
    scroll()
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('hashchange', hash)
    document.addEventListener('pointerdown', outside)
    return () => {
      window.removeEventListener('scroll', scroll)
      window.removeEventListener('hashchange', hash)
      document.removeEventListener('pointerdown', outside)
    }
  }, [])

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
        <Link href="/" className="az-brand" aria-label="AZ FACE - Trang chủ" onClick={closeMenus}>
          <img src="/brand/logo.svg" width="60" height="60" alt="" />
          <span className="az-brand-name">AZ FACE<span>Chăm chút nét riêng</span></span>
        </Link>
        <nav className="az-desktop-nav" aria-label="Điều hướng chính">
          {navLink(navigation[0])}
          <details className="az-service-disclosure" ref={servicesMenu} onKeyDown={escapeMenu} onBlur={blurMenu}>
            <summary className="az-nav-link" data-current={pathname.startsWith('/dich-vu')}><span>Dịch vụ</span><Chevron /></summary>
            <div className="az-mega-menu">
              <div className="az-mega-intro">
                <h2>Bắt đầu từ điều bạn cần.</h2>
                <p>Một khoảng dừng để tìm hiểu và lựa chọn cách chăm sóc của mình.</p>
                <Link href="/dich-vu" className="az-menu-all" onClick={() => follow('/dich-vu')}>Khám phá tất cả dịch vụ<ArrowIcon /></Link>
              </div>
              <div className="az-mega-services">
                {services.length === 0 && <p className="az-service-description">Danh mục dịch vụ đang được cập nhật.</p>}
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
        <Link href="/lien-he" className="az-header-cta" onClick={closeMenus} aria-current={pathname === '/lien-he' ? 'page' : undefined}>Trao đổi nhu cầu<ArrowIcon /></Link>
        <details className="az-mobile-menu" ref={mobileMenu} onKeyDown={escapeMenu} onBlur={blurMenu}>
          <summary className="az-menu-toggle"><span className="az-toggle-label">Menu</span><span className="az-toggle-lines" aria-hidden="true"><span /><span /></span></summary>
          <nav aria-label="Điều hướng trên điện thoại" className="az-mobile-panel">
            <div className="az-menu-preview" aria-hidden="true"><img src="/images/edition-menu-stilllife.webp" alt="" width="1000" height="1000" /><span>Một chút an yên.</span></div>
            <Link href="/" className="az-mobile-home" onClick={closeMenus}>Trang chủ<ArrowIcon /></Link>
            {navLink(navigation[0])}
            <details className="az-mobile-services">
              <summary data-current={pathname.startsWith('/dich-vu')}>Dịch vụ<Chevron /></summary>
              <div>
                {services.map(service => <Link key={service.slug} href={`/dich-vu/${service.slug}`} onClick={() => follow(`/dich-vu/${service.slug}`)} aria-current={pathname === `/dich-vu/${service.slug}` ? 'page' : undefined}>{service.title}<ArrowIcon /></Link>)}
                <Link href="/dich-vu" onClick={() => follow('/dich-vu')}>Tất cả dịch vụ<ArrowIcon /></Link>
              </div>
            </details>
            {navigation.slice(1).map(navLink)}
            <Link href="/lien-he" className="az-mobile-contact" onClick={() => follow('/lien-he')}>Trao đổi nhu cầu<ArrowIcon /></Link>
          </nav>
        </details>
      </div>
    </header>
  </>
}
