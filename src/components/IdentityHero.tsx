'use client'

import Link from '@/i18n/Link'
import { useLocale } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { ArrowIcon } from './Icons'
import './identity-hero.css'

const auraStart = 'M480 65 C720 20 940 215 920 480 C900 745 705 950 445 925 C185 900 40 680 75 430 C110 180 240 110 480 65 Z'
const auraEnd = 'M480 90 C770 70 865 270 890 480 C915 690 670 880 445 930 C220 980 80 640 105 430 C130 220 190 110 480 90 Z'

function MotionIcon({ paused }: { paused: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{paused ? <path d="m9 5 10 7-10 7Z" /> : <path d="M8 5v14M16 5v14" />}</svg>
}

export function IdentityHero() {
  const en = useLocale() === 'en'
  const root = useRef<HTMLElement>(null)
  const controls = useRef({ pause: (_value: boolean) => {}, replay: () => {} })
  const [motionAvailable, setMotionAvailable] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const section = root.current
    const portrait = section?.querySelector<HTMLImageElement>('[data-identity-portrait]')
    if (!section || !portrait) return
    let cancelled = false
    let dispose = () => {}
    let readinessTimer = 0
    const ready = Promise.race([
      Promise.all([portrait.decode().catch(() => {}), document.fonts.ready]),
      new Promise(resolve => { readinessTimer = window.setTimeout(resolve, 3500) }),
    ])

    Promise.all([import('gsap'), import('gsap/ScrollTrigger'), ready]).then(([{ gsap }, { ScrollTrigger }]) => {
      window.clearTimeout(readinessTimer)
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        setMotionAvailable(true)
        setPaused(false)
        let userPaused = false
        let visible = false
        let started = false
        let sync = () => {}
        const context = gsap.context(() => {
          const intro = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })
            .from('.identity-hero__phrase', { y: 42, rotation: 3, opacity: .25, stagger: .16, duration: 1.5, clearProps: 'transform,opacity' }, 0)
            .from('[data-identity-portrait]', { yPercent: 18, scale: .82, rotation: -7, opacity: .2, duration: 1.9, clearProps: 'transform,opacity' }, .1)
            .from('.identity-hero__aura', { rotation: -35, scale: .6, duration: 2, clearProps: 'transform' }, 0)
            .from('.identity-hero__detail', { scale: .3, rotation: -25, opacity: .2, duration: 1.4, clearProps: 'transform,opacity' }, .55)

          const morph = gsap.to('[data-aura-path]', { attr: { d: auraEnd }, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true, paused: true })
          const orbit = gsap.fromTo('.identity-hero__orbit', { rotation: -12 }, { rotation: 17, duration: 5.5, ease: 'sine.inOut', repeat: -1, yoyo: true, paused: true })
          // Scroll moves a dedicated wrapper, separate from the entrance and orbit.
          const scroll = gsap.to('.identity-hero__scroll', { yPercent: -10, rotation: -4, ease: 'none', scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: .6 } })
          const ambient = [morph, orbit]
          sync = () => {
            const playing = visible && !document.hidden && !userPaused
            if (playing) {
              if (!started) { started = true; intro.play() } else intro.resume()
              ambient.forEach(tween => tween.play())
              scroll.scrollTrigger?.enable(false)
            } else {
              intro.pause()
              ambient.forEach(tween => tween.pause())
              scroll.scrollTrigger?.disable(false)
            }
          }
          controls.current = {
            pause(value) { userPaused = value; sync() },
            replay() {
              userPaused = false
              setPaused(false)
              intro.restart()
              ambient.forEach(tween => tween.restart())
              sync()
            },
          }
        }, section)
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync() }, { threshold: .08 })
        observer.observe(section)
        document.addEventListener('visibilitychange', sync)
        return () => {
          observer.disconnect()
          document.removeEventListener('visibilitychange', sync)
          context.revert()
          controls.current = { pause: () => {}, replay: () => {} }
          if (!cancelled) setMotionAvailable(false)
        }
      })
      dispose = () => media.revert()
    }).catch(() => { /* The image, message and links remain visible without GSAP. */ })
    return () => { cancelled = true; window.clearTimeout(readinessTimer); dispose() }
  }, [])

  const toggleMotion = () => {
    const value = !paused
    setPaused(value)
    controls.current.pause(value)
  }

  return <section className="identity-hero" aria-labelledby="identity-title" ref={root}>
    <div className="identity-hero__stage">
      <div className="identity-hero__copy">
        <h1 id="identity-title"><span className="identity-hero__phrase">{en ? 'Refined.' : 'Đẹp hơn.'}</span> <em className="identity-hero__phrase">{en ? 'Still you.' : 'Vẫn là bạn.'}</em></h1>
        <p><strong>{en ? 'Facial aesthetics' : 'Thẩm mỹ khuôn mặt'}</strong>{en ? ' starts with what matters to you: your skin, brow shape or lip colour.' : ' bắt đầu từ điều bạn muốn cải thiện: làn da, dáng mày hay sắc môi.'}</p>
        <div className="identity-hero__actions"><a href="#dich-vu" className="button button-dark identity-hero__cta">{en ? 'Explore your options' : 'Tìm lựa chọn của bạn'} <ArrowIcon /></a><Link href="/gioi-thieu" className="identity-hero__about">{en ? 'The AZ FACE approach' : 'Tinh thần AZ FACE'} <ArrowIcon /></Link></div>
      </div>
      <div className="identity-hero__visual">
        <div className="identity-hero__scroll">
          <svg className="identity-hero__aura" viewBox="0 0 1000 1000" aria-hidden="true"><path data-aura-path d={auraStart} /><ellipse cx="500" cy="500" rx="460" ry="350" /><ellipse cx="500" cy="500" rx="430" ry="470" /></svg>
          <figure className="identity-hero__portrait"><img data-identity-portrait src="/images/identity-cutout.webp" alt={en ? 'Illustrative portrait of an adult woman with natural skin and facial features' : 'Chân dung minh họa người phụ nữ trưởng thành với làn da và đường nét tự nhiên'} width="1024" height="1536" fetchPriority="high" /></figure>
          <div className="identity-hero__orbit" aria-hidden="true"><figure className="identity-hero__detail"><img src="/images/campaign-hero-detail.webp" alt="" width="1000" height="1000" /><figcaption>{en ? 'Uniquely you.' : 'Nét riêng.'}</figcaption></figure></div>
        </div>
        <div className="identity-hero__motion" hidden={!motionAvailable}><button type="button" onClick={toggleMotion} aria-label={en ? (paused ? 'Resume animation' : 'Pause animation') : (paused ? 'Tiếp tục chuyển động' : 'Dừng chuyển động')} aria-pressed={paused}><MotionIcon paused={paused} /><span>{en ? (paused ? 'Resume' : 'Pause') : (paused ? 'Tiếp tục' : 'Tạm dừng')}</span></button><button type="button" onClick={() => controls.current.replay()}>{en ? 'Replay' : 'Xem lại'} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 8a8 8 0 1 1-1 7M5 3v5h5" /></svg></button></div>
      </div>
    </div>
    <div className="identity-hero__baseline"><span>{en ? 'Skin. Brows. Lips.' : 'Da. Mày. Môi.'}</span><a href="#dich-vu">{en ? 'Find your focus' : 'Khám phá nét riêng'} <ArrowIcon /></a></div>
  </section>
}
