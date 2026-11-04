'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function FooterMotion() {
  const pathname = usePathname()
  useEffect(() => {
    let cancelled = false
    let dispose = () => {}
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      const root = document.getElementById('az-footer-climax')
      if (cancelled || !root) return
      gsap.registerPlugin(ScrollTrigger)
      const media = gsap.matchMedia()
      media.add({ desktop: '(min-width: 801px)', mobile: '(max-width: 800px)', motion: '(prefers-reduced-motion: no-preference)' }, match => {
        if (!match.conditions?.motion) return
        const desktop = Boolean(match.conditions.desktop)
        const context = gsap.context(() => {
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
