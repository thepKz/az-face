'use client'

import { useEffect, useId, useRef } from 'react'
import { useLocale } from 'next-intl'
import Link from '@/i18n/Link'
import { ArrowIcon } from './Icons'
import './immersive-hero.css'

const aperture = {
  slit: 'M480 18 C505 12 520 25 522 70 L530 620 C530 666 510 684 488 682 C468 680 461 656 462 620 L468 70 C468 38 470 24 480 18 Z',
  open: 'M118 18 C300 0 690 0 886 18 C954 24 982 80 982 160 L982 540 C982 635 950 682 870 682 L130 682 C50 682 18 635 18 540 L18 160 C18 80 50 24 118 18 Z',
  portrait: 'M254 24 C448 -18 804 12 904 128 C1000 240 992 442 914 562 C844 670 606 706 360 678 C134 652 12 518 24 350 C36 182 92 62 254 24 Z',
  cinema: 'M90 145 C300 130 700 130 910 145 C958 147 986 180 986 228 L986 472 C986 520 958 553 910 555 L90 555 C42 553 14 520 14 472 L14 228 C14 180 42 147 90 145 Z',
}

export function ImmersiveHero() {
  const en = useLocale() === 'en'
  const root = useRef<HTMLElement>(null)
  const clipId = `portrait-${useId().replace(/:/g, '')}`

  useEffect(() => {
    const section = root.current
    if (!section) return
    let cancelled = false
    let dispose = () => {}
    Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('gsap/MorphSVGPlugin')]).then(([{ gsap }, { ScrollTrigger }, { MorphSVGPlugin }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)
      const media = gsap.matchMedia()
      media.add({ desktop: '(min-width: 901px) and (min-height: 650px)', motion: '(prefers-reduced-motion: no-preference)' }, match => {
        if (!match.conditions?.motion) return
        const desktop = Boolean(match.conditions.desktop)
        const context = gsap.context(() => {
          // Intro and scroll own separate masks so an early scroll cannot fight the aperture.
          gsap.timeline({ defaults: { ease: 'expo.out' } })
            .fromTo('.cinema-hero__intro-path', { attr: { d: aperture.slit } }, { morphSVG: aperture.open, duration: 1.65 }, 0)
            .from('.cinema-hero__ribbon--skin .cinema-hero__ribbon-frame', { xPercent: 90, yPercent: 22, rotation: 18, scale: .76, duration: 1.55, clearProps: 'transform' }, .05)
            .from('.cinema-hero__ribbon--brows .cinema-hero__ribbon-frame', { xPercent: -80, yPercent: -20, rotation: -24, scale: .76, duration: 1.55, clearProps: 'transform' }, .12)
            .from('.cinema-hero__title', { y: 30, duration: 1.1, clearProps: 'transform' }, .08)

          const cover = section.querySelector<HTMLElement>('.cinema-hero__cover')!
          const scene = gsap.timeline({ scrollTrigger: {
            id: 'az-portrait-shutter', trigger: cover,
            start: desktop ? 'top top' : 'top 15%',
            end: desktop ? () => `+=${Math.round(window.innerHeight * .72)}` : 'bottom top',
            pin: desktop, pinSpacing: desktop, scrub: .65, invalidateOnRefresh: true,
          } })
          scene.to('.cinema-hero__scroll-path', { morphSVG: aperture.cinema, duration: 1, ease: 'power1.inOut' }, 0)
            .to('.cinema-hero__portal', { scale: desktop ? 1.48 : 1.12, yPercent: 0, duration: 1, ease: 'power1.inOut' }, 0)
            .to('.cinema-hero__portal image', { y: 80, duration: 1, ease: 'power1.inOut' }, 0)
            .to('.cinema-hero__ribbon--skin', { xPercent: desktop ? -105 : -25, yPercent: desktop ? 28 : 12, rotation: -24, scale: .8, duration: 1, ease: 'none' }, 0)
            .to('.cinema-hero__ribbon--brows', { xPercent: desktop ? 110 : 25, yPercent: desktop ? -28 : -12, rotation: 25, scale: .8, duration: 1, ease: 'none' }, 0)
            .to('.cinema-hero__orbit', { rotation: 70, scale: 1.15, duration: 1, ease: 'none' }, 0)

          const portrait = gsap.timeline({ scrollTrigger: { id: 'az-portrait-handoff', trigger: section.querySelector('.cinema-hero__outro'), start: 'top bottom', end: 'bottom top', scrub: .7 } })
          portrait.fromTo('.cinema-hero__portrait', { y: desktop ? 65 : 24, rotation: -8, scale: .88 }, { y: desktop ? -55 : -24, rotation: 4, scale: 1, duration: 1, ease: 'none' }, 0)
            .fromTo('.cinema-hero__portrait-inner', { borderRadius: '46% 46% 8% 8%' }, { borderRadius: '8% 46% 8% 46%', duration: 1, ease: 'none' }, 0)
            .fromTo('.cinema-hero__detail', { y: 35, rotation: -12 }, { y: -55, rotation: 12, duration: 1, ease: 'none' }, 0)
        }, section)
        return () => context.revert()
      })
      dispose = () => media.revert()
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh() })
    }).catch(() => { /* The complete photographic poster remains visible without motion. */ })
    return () => { cancelled = true; dispose() }
  }, [])

  return <section className="cinema-hero" ref={root} aria-label={en ? 'The AZ FACE perspective' : 'Góc nhìn AZ FACE'}>
    <div className="cinema-hero__cover">
      <h1 className="cinema-hero__title">{en ? 'Distinctly you.' : 'Tôn nét riêng.'}</h1>
      <div className="cinema-hero__shutter">
        <span className="cinema-hero__orbit" aria-hidden="true" />
        <div className="cinema-hero__ribbon cinema-hero__ribbon--skin" aria-hidden="true"><figure className="cinema-hero__ribbon-frame"><img src="/images/campaign-hero-detail.webp" alt="" width="1000" height="1000" /></figure></div>
        <div className="cinema-hero__portal">
          <svg viewBox="0 0 1000 700" role="img" aria-label={en ? 'Illustrative portrait in natural light' : 'Chân dung minh họa trong ánh sáng tự nhiên'}>
            <defs>
              <clipPath id={`${clipId}-intro`}><path className="cinema-hero__intro-path" d={aperture.open} /></clipPath>
              <clipPath id={`${clipId}-scroll`}><path className="cinema-hero__scroll-path" d={aperture.portrait} /></clipPath>
            </defs>
            <g clipPath={`url(#${clipId}-scroll)`}><g clipPath={`url(#${clipId}-intro)`}><image href="/images/campaign-hero-main.webp" width="1000" height="700" preserveAspectRatio="xMaxYMid slice" /></g></g>
          </svg>
        </div>
        <div className="cinema-hero__ribbon cinema-hero__ribbon--brows" aria-hidden="true"><figure className="cinema-hero__ribbon-frame"><img src="/images/campaign-gallery-brows-main.webp" alt="" width="1024" height="1280" /></figure></div>
      </div>
      <div className="cinema-hero__support">
        <p>{en ? 'Facial aesthetics, shaped around your skin, your features and what matters to you.' : 'Thẩm mỹ khuôn mặt, bắt đầu từ làn da, đường nét và điều bạn muốn chăm chút.'}</p>
        <div className="cinema-hero__actions"><a href="#dich-vu" className="cinema-cta cinema-cta--forest">{en ? 'Explore your features' : 'Khám phá nét riêng'} <span><ArrowIcon /></span></a><Link href="/lien-he" className="cinema-hero__contact">{en ? 'Talk to AZ FACE' : 'Trao đổi cùng AZ FACE'}</Link></div>
        <a className="cinema-hero__scroll" href="#goc-nhin" aria-label={en ? 'Scroll to explore' : 'Cuộn để khám phá'}><ArrowIcon /></a>
      </div>
    </div>
    <div className="cinema-hero__outro" id="goc-nhin">
      <div className="cinema-hero__outro-copy"><h2>{en ? 'Keep what makes you, you.' : 'Giữ điều làm nên bạn.'}</h2><p>{en ? 'A face is more than a set of features. It carries your expressions, your habits and your story. Aesthetic care starts by understanding what you want to change, and what you want to keep.' : 'Một gương mặt không chỉ là những đường nét. Đó còn là biểu cảm, thói quen và câu chuyện của bạn. Chăm chút diện mạo bắt đầu bằng việc hiểu điều muốn thay đổi và điều muốn giữ lại.'}</p><div className="cinema-hero__actions"><Link href="/gioi-thieu" className="cinema-text-link">{en ? 'Discover our perspective' : 'Tìm hiểu tinh thần AZ FACE'} <ArrowIcon /></Link></div></div>
      <figure className="cinema-hero__portrait"><div className="cinema-hero__portrait-inner"><img src="/images/campaign-hero-main.webp" width="1600" height="1067" loading="lazy" alt={en ? 'A closer look at the portrait, in natural light' : 'Một góc gần hơn của chân dung, trong ánh sáng tự nhiên'} /></div><div className="cinema-hero__detail" aria-hidden="true"><img src="/images/campaign-hero-detail.webp" width="1000" height="1000" loading="lazy" alt="" /></div></figure>
    </div>
  </section>
}
