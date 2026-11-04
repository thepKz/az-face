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
      media.add({ desktop: '(min-width: 901px)', mobile: '(max-width: 900px)', motion: '(prefers-reduced-motion: no-preference)' }, match => {
        if (!match.conditions?.motion) return
        const desktop = Boolean(match.conditions.desktop)
        const context = gsap.context(() => {
        // Text remains readable throughout; motion never controls reading progress.
        gsap.from('.cinema-hero__image', { scale: 1.07, duration: 1.8, ease: 'expo.out', clearProps: 'transform' })
        gsap.from('.cinema-hero__word', { y: 22, rotation: .8, stagger: .09, duration: 1.15, ease: 'expo.out', clearProps: 'transform' })
        gsap.from('.cinema-hero__support', { y: 15, duration: 1.2, delay: .12, ease: 'expo.out', clearProps: 'transform' })
          // The outer media owns scroll depth; the inner image owns the intro.
          gsap.fromTo('.cinema-hero__media', { yPercent: 0, scale: 1 }, {
            yPercent: desktop ? 12 : 6, scale: desktop ? 1.2 : 1.12, ease: 'none',
            scrollTrigger: { id: 'az-hero-depth', trigger: section.querySelector('.cinema-hero__cover'), start: 'top top', end: 'bottom top', scrub: .65 },
          })
          const contour = section.querySelector<SVGPathElement>('.cinema-hero__contour path')!
          const contourLength = contour.getTotalLength()
          gsap.set(contour, { strokeDasharray: contourLength })
          const portrait = gsap.timeline({ scrollTrigger: { id: 'az-portrait-compose', trigger: section.querySelector('.cinema-hero__outro'), start: 'top bottom', end: 'bottom top', scrub: .75 } })
          portrait.fromTo('.cinema-hero__portrait', { y: desktop ? 65 : 25, rotation: desktop ? -7 : -3, scale: .92 }, { y: desktop ? -55 : -25, rotation: desktop ? 5 : 3, scale: 1, ease: 'none', duration: 1 }, 0)
            .fromTo('.cinema-hero__portrait-inner', { borderRadius: '46% 46% 8% 8%' }, { borderRadius: '8% 46% 8% 46%', ease: 'none', duration: 1 }, 0)
            .fromTo('.cinema-hero__portrait-inner img', { scale: 1.15, yPercent: -4 }, { scale: 1.15, yPercent: 4, ease: 'none', duration: 1 }, 0)
            .fromTo('.cinema-hero__detail', { y: desktop ? 45 : 20, rotation: -12 }, { y: desktop ? -65 : -25, rotation: 12, ease: 'none', duration: 1 }, 0)
            .fromTo(contour, { strokeDashoffset: contourLength }, { strokeDashoffset: 0, duration: .8, ease: 'none' }, 0)
        }, section)
        return () => context.revert()
      })
      dispose = () => media.revert()
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh() })
    }).catch(() => {})
    return () => { cancelled = true; dispose() }
  }, [])

  const words = en ? ['Distinctly', 'you.'] : ['Tôn', 'nét', 'riêng.']
  return <section className="cinema-hero" ref={root} aria-label={en ? 'The AZ FACE perspective' : 'Góc nhìn AZ FACE'}>
    <div className="cinema-hero__stage">
      <div className="cinema-hero__cover">
      <figure className="cinema-hero__media"><img className="cinema-hero__image" src="/images/campaign-hero-main.webp" width="1600" height="1067" fetchPriority="high" alt={en ? 'Illustrative portrait in natural light' : 'Chân dung minh họa trong ánh sáng tự nhiên'} /></figure>
      <div className="cinema-hero__shade" aria-hidden="true" />
      <div className="cinema-hero__opening">
        <h1>{words.map((word, index) => <Fragment key={word}><span className="cinema-hero__word">{word}</span>{index < words.length - 1 ? ' ' : ''}</Fragment>)}</h1>
        <div className="cinema-hero__support"><p>{en ? 'Facial aesthetics, shaped around your skin, your features and what matters to you.' : 'Thẩm mỹ khuôn mặt, bắt đầu từ làn da, đường nét và điều bạn muốn chăm chút.'}</p><div className="cinema-hero__actions"><a href="#dich-vu" className="cinema-cta">{en ? 'Explore your features' : 'Khám phá nét riêng'} <span><ArrowIcon /></span></a><Link href="/lien-he" className="cinema-hero__contact">{en ? 'Talk to AZ FACE' : 'Trao đổi cùng AZ FACE'}</Link></div></div>
        <div className="cinema-hero__foot"><span>{en ? 'Skin. Brows. Lips.' : 'Làn da. Dáng mày. Sắc môi.'}</span><a href="#goc-nhin">{en ? 'Scroll to explore' : 'Cuộn để khám phá'} <ArrowIcon /></a></div>
      </div>
      </div>
      <div className="cinema-hero__outro" id="goc-nhin">
        <div className="cinema-hero__outro-copy"><h2>{en ? 'Keep what makes you, you.' : 'Giữ điều làm nên bạn.'}</h2><p>{en ? 'A face is more than a set of features. It carries your expressions, your habits and your story. Aesthetic care starts by understanding what you want to change, and what you want to keep.' : 'Một gương mặt không chỉ là những đường nét. Đó còn là biểu cảm, thói quen và câu chuyện của bạn. Chăm chút diện mạo bắt đầu bằng việc hiểu điều muốn thay đổi và điều muốn giữ lại.'}</p><div className="cinema-hero__actions"><Link href="/gioi-thieu" className="cinema-text-link">{en ? 'Discover our perspective' : 'Tìm hiểu tinh thần AZ FACE'} <ArrowIcon /></Link></div></div>
        <figure className="cinema-hero__portrait">
          <svg className="cinema-hero__contour" viewBox="0 0 500 570" fill="none" aria-hidden="true"><path d="M470 410 C490 260 460 24 264 22 C76 20 20 156 28 304 C36 458 136 548 278 546 C380 544 442 492 470 410 Z" /></svg>
          <div className="cinema-hero__portrait-inner"><img src="/images/campaign-hero-main.webp" width="1600" height="1067" loading="lazy" alt={en ? 'A closer look at the portrait, in natural light' : 'Một góc gần hơn của chân dung, trong ánh sáng tự nhiên'} /></div>
          <div className="cinema-hero__detail" aria-hidden="true"><img src="/images/campaign-hero-detail.webp" width="1000" height="1000" loading="lazy" alt="" /></div>
        </figure>
      </div>
    </div>
  </section>
}
