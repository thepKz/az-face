'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function FooterMotion() {
  const pathname = usePathname()
  useEffect(() => {
    let cancelled = false
    let dispose = () => {}
    Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('gsap/MorphSVGPlugin')]).then(([{ gsap }, { ScrollTrigger }, { MorphSVGPlugin }]) => {
      const root = document.getElementById('az-footer-climax')
      if (cancelled || !root) return
      gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)
      const media = gsap.matchMedia()
      media.add({ desktop: '(min-width: 801px)', mobile: '(max-width: 800px)', motion: '(prefers-reduced-motion: no-preference)' }, match => {
        if (!match.conditions?.motion) return
        const desktop = Boolean(match.conditions.desktop)
        const context = gsap.context(() => {
          // Measure after upstream pins, even when their chunks initialize later.
          const finale = gsap.timeline({ scrollTrigger: { id: 'az-footer-portrait-finale', trigger: '.az-footer-finale', start: 'top 95%', end: 'center 35%', scrub: .8, refreshPriority: -1 } })
          finale.fromTo('#footer-portrait-window path', { attr: { d: 'M40 290 C200 235 420 235 560 290 C575 320 575 380 560 410 C420 465 200 465 40 410 C25 380 25 320 40 290 Z' } }, { morphSVG: 'M80 40 C210 5 440 5 520 100 C585 180 585 500 520 610 C450 700 180 700 80 610 C5 530 5 180 80 40 Z', duration: 1, ease: 'power2.inOut' }, 0)
            .fromTo('.az-footer-portrait', { rotation: 18, scale: .78 }, { rotation: -7, scale: 1, duration: 1, ease: 'power2.out' }, 0)
            .fromTo('.az-footer-arc', { rotation: -95, scale: .7, xPercent: 22 }, { rotation: 25, scale: 1, xPercent: 0, duration: 1.2, ease: 'power2.inOut' }, 0)
            .fromTo('.az-footer-orchid', { xPercent: 80, yPercent: 30, rotation: 45 }, { xPercent: 0, yPercent: 0, rotation: -12, duration: 1, ease: 'power2.out' }, .16)
            .fromTo('.az-footer-pearls', { xPercent: -60, rotation: -50 }, { xPercent: 0, rotation: 12, duration: 1, ease: 'power2.out' }, .24)
            .fromTo('.az-footer-orbit--outer', { rotation: -45, scale: .6 }, { rotation: 35, scale: 1, duration: 1.2, ease: 'none' }, 0)
          const curtain = gsap.timeline({ scrollTrigger: { id: 'az-footer-curtain', trigger: root.querySelector('.az-footer-curtain'), start: 'top 98%', end: 'bottom 30%', scrub: .7 } })
          curtain.fromTo('.az-footer-curtain path', {
            attr: { d: 'M0 240 C240 240 480 236 720 230 C960 236 1200 240 1440 240 L1440 240 L0 240 Z' },
          }, {
            attr: { d: 'M0 220 C240 220 480 -120 720 -120 C960 -120 1200 220 1440 220 L1440 240 L0 240 Z' }, duration: .65, ease: 'power2.inOut',
          }).to('.az-footer-curtain path', {
            attr: { d: 'M0 0 C240 0 480 0 720 0 C960 0 1200 0 1440 0 L1440 240 L0 240 Z' }, duration: .35, ease: 'power2.out',
          })
          const stage = root.querySelector<HTMLElement>('.az-footer-stage')
          gsap.fromTo(stage, { '--footer-aperture': '0%' }, { '--footer-aperture': '110%', ease: 'none',
            scrollTrigger: { id: 'az-footer-aperture', trigger: stage, start: 'top 88%', end: 'clamp(bottom bottom)', scrub: .8 },
          })
          const brand = gsap.timeline({
            scrollTrigger: {
              id: 'az-footer-brand',
              trigger: root.querySelector('.az-footer-display'),
              start: 'top 98%', end: 'clamp(bottom 94%)', scrub: .6,
              invalidateOnRefresh: true,
            },
          })
          root.querySelectorAll<HTMLElement>('.az-footer-display-group').forEach((group, index) => {
            brand.fromTo(group, { xPercent: (index ? 1 : -1) * (desktop ? 32 : 16), rotateY: (index ? -1 : 1) * 55, scale: .72 }, { xPercent: 0, rotateY: 0, scale: 1, duration: 1, ease: 'power2.out' }, 0)
          })
          brand.fromTo('.az-footer-letter', { rotationX: -70, yPercent: 35, opacity: .45, transformOrigin: '50% 100%' }, { rotationX: 0, yPercent: 0, opacity: 1, duration: .8, stagger: .055, ease: 'power2.out' }, .08)
        }, root)
        return () => context.revert()
      })
      dispose = () => media.revert()
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh() })
    }).catch(() => { /* The wordmark is visible without the optional animation. */ })
    return () => { cancelled = true; dispose() }
  }, [pathname])
  return <div className="az-footer-curtain" aria-hidden="true"><svg viewBox="0 0 1440 240" preserveAspectRatio="none"><path d="M0 120 C240 120 480 0 720 0 C960 0 1200 120 1440 120 L1440 240 L0 240 Z" /></svg></div>
}
