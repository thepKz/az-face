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
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)')
    if (!motion.matches) return
    let cancelled = false
    let dispose = () => {}
    import('gsap').then(({ gsap }) => {
      if (cancelled) return
      const context = gsap.context(() => {
        // Text remains readable throughout; motion never controls reading progress.
        gsap.from('.cinema-hero__image', { scale: 1.07, duration: 1.8, ease: 'expo.out', clearProps: 'transform' })
        gsap.from('.cinema-hero__word', { y: 22, rotation: .8, stagger: .09, duration: 1.15, ease: 'expo.out', clearProps: 'transform' })
        gsap.from('.cinema-hero__support', { y: 15, duration: 1.2, delay: .12, ease: 'expo.out', clearProps: 'transform' })
      }, section)
      const frame = section.querySelector<HTMLElement>('.cinema-hero__portrait')
      const observer = new IntersectionObserver(entries => {
        if (!frame || !entries.some(entry => entry.isIntersecting)) return
        context.add(() => gsap.from(frame, { y: 28, rotation: -1.5, duration: 1.3, ease: 'expo.out', clearProps: 'transform' }))
        observer.disconnect()
      }, { threshold: .18 })
      if (frame) observer.observe(frame)
      const stop = () => { observer.disconnect(); context.revert() }
      motion.addEventListener('change', stop, { once: true })
      dispose = () => { stop(); motion.removeEventListener('change', stop) }
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
          <div className="cinema-hero__portrait-inner"><img src="/images/campaign-hero-main.webp" width="1600" height="1067" loading="lazy" alt={en ? 'A closer look at the portrait, in natural light' : 'Một góc gần hơn của chân dung, trong ánh sáng tự nhiên'} /></div>
          <div className="cinema-hero__detail" aria-hidden="true"><img src="/images/campaign-hero-detail.webp" width="1000" height="1000" loading="lazy" alt="" /></div>
        </figure>
      </div>
    </div>
  </section>
}
