'use client'

import { Fragment, useEffect, useRef } from 'react'
import { useLocale } from 'next-intl'
import Link from '@/i18n/Link'
import { ArrowIcon } from './Icons'
import './immersive-hero.css'

export function ImmersiveHero() {
  const en = useLocale() === 'en'
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const section = root.current
    if (!section) return
    let cancelled = false
    let dispose = () => {}
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          gsap.from('.cinema-hero__image', { scale: 1.14, duration: 1.5, ease: 'power3.out', clearProps: 'transform' })
          gsap.from('.cinema-hero__word', { yPercent: 110, rotation: 5, stagger: .1, duration: 1.1, ease: 'power4.out', clearProps: 'transform' })
          gsap.from('.cinema-hero__opening .cinema-hero__support', { clipPath: 'inset(0 100% 0 0)', duration: .8, delay: .3, ease: 'power3.out', clearProps: 'clipPath' })
        }, section)
        return () => context.revert()
      })
      media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        const header = document.querySelector<HTMLElement>('.az-header')
        const setHeaderHeight = () => section.style.setProperty('--hero-header', `${header?.offsetHeight ?? 112}px`)
        setHeaderHeight()
        section.dataset.enhanced = 'true'
        const stage = section.querySelector<HTMLElement>('.cinema-hero__stage')!
        const firstActions = section.querySelector<HTMLElement>('.cinema-hero__opening .cinema-hero__actions')!
        const nextActions = section.querySelector<HTMLElement>('.cinema-hero__outro .cinema-hero__actions')!
        const context = gsap.context(() => {
          // One photograph stays on stage as the opening becomes the brand statement.
          gsap.timeline({ scrollTrigger: { trigger: section, start: () => `top top+=${header?.offsetHeight ?? 112}`, end: 'bottom bottom', scrub: .65, onUpdate: self => {
            firstActions.inert = self.progress > .4
            nextActions.inert = self.progress < .5
          } } })
            .to('.cinema-hero__opening', { yPercent: -24, autoAlpha: 0, duration: .4, ease: 'power2.in' }, 0)
            .to('.cinema-hero__media', { clipPath: 'inset(7% 5.2% 8% 55% round 45% 45% 10% 10%)', duration: 1, ease: 'power2.inOut' }, 0)
            .to('.cinema-hero__shade', { opacity: 0, duration: .5 }, .1)
            .fromTo('.cinema-hero__outro', { y: 70, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .45, ease: 'power3.out' }, .5)
            .to('.cinema-hero__folio', { xPercent: -18, duration: 1, ease: 'none' }, 0)
          const observer = new ResizeObserver(() => { setHeaderHeight(); ScrollTrigger.refresh() })
          observer.observe(stage)
          if (header) observer.observe(header)
          return () => observer.disconnect()
        }, section)
        nextActions.inert = true
        return () => { context.revert(); delete section.dataset.enhanced; section.style.removeProperty('--hero-header'); firstActions.inert = false; nextActions.inert = false }
      })
      dispose = () => media.revert()
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh() })
    }).catch(() => {})
    return () => { cancelled = true; dispose() }
  }, [])

  const words = en ? ['Distinctly', 'you.'] : ['Tôn', 'nét', 'riêng.']
  return <section className="cinema-hero" ref={root} aria-label={en ? 'The AZ FACE perspective' : 'Góc nhìn AZ FACE'}>
    <div className="cinema-hero__stage">
      <figure className="cinema-hero__media"><img className="cinema-hero__image" src="/images/campaign-hero-main.webp" width="1600" height="1067" fetchPriority="high" alt={en ? 'Illustrative portrait in natural light' : 'Chân dung minh họa trong ánh sáng tự nhiên'} /></figure>
      <div className="cinema-hero__shade" aria-hidden="true" />
      <div className="cinema-hero__opening">
        <h1>{words.map((word, index) => <Fragment key={word}><span className="cinema-hero__word-mask"><span className="cinema-hero__word">{word}</span></span>{index < words.length - 1 ? ' ' : ''}</Fragment>)}</h1>
        <div className="cinema-hero__support"><p>{en ? 'Facial aesthetics, shaped around your skin, your features and what matters to you.' : 'Thẩm mỹ khuôn mặt, bắt đầu từ làn da, đường nét và điều bạn muốn chăm chút.'}</p><div className="cinema-hero__actions"><a href="#dich-vu" className="cinema-cta">{en ? 'Explore your features' : 'Khám phá nét riêng'} <span><ArrowIcon /></span></a><Link href="/lien-he" className="cinema-hero__contact">{en ? 'Talk to AZ FACE' : 'Trao đổi cùng AZ FACE'}</Link></div></div>
        <div className="cinema-hero__foot"><span>{en ? 'Skin. Brows. Lips.' : 'Làn da. Dáng mày. Sắc môi.'}</span><a href="#goc-nhin" onClick={event => {
          const section = root.current
          if (section?.dataset.enhanced) {
            event.preventDefault()
            window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().bottom - window.innerHeight, behavior: 'smooth' })
          }
        }}>{en ? 'Scroll to explore' : 'Cuộn để khám phá'} <ArrowIcon /></a></div>
      </div>
      <div className="cinema-hero__outro" id="goc-nhin">
        <div className="cinema-hero__outro-copy"><h2>{en ? 'Keep what makes you, you.' : 'Giữ điều làm nên bạn.'}</h2><p>{en ? 'A face is more than a set of features. It carries your expressions, your habits and your story. Aesthetic care starts by understanding what you want to change, and what you want to keep.' : 'Một gương mặt không chỉ là những đường nét. Đó còn là biểu cảm, thói quen và câu chuyện của bạn. Chăm chút diện mạo bắt đầu bằng việc hiểu điều muốn thay đổi và điều muốn giữ lại.'}</p><div className="cinema-hero__actions"><Link href="/gioi-thieu" className="cinema-text-link">{en ? 'Discover our perspective' : 'Tìm hiểu tinh thần AZ FACE'} <ArrowIcon /></Link></div></div>
        <span className="cinema-hero__folio" aria-hidden="true">AZ FACE</span>
      </div>
    </div>
  </section>
}
