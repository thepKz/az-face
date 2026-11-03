'use client'

import { useEffect } from 'react'

export function RouteMotion({ targetId }: { targetId: string }) {
  useEffect(() => {
    const root = document.getElementById(targetId)
    if (!root) return
    let cancelled = false
    let dispose = () => {}
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          root.querySelectorAll<HTMLElement>('[data-route-hero]').forEach(hero => {
            const picture = hero.querySelector('[data-route-hero-image]')
            if (picture) gsap.from(picture, { scale: 1.08, duration: 1.35, ease: 'power3.out', clearProps: 'transform' })
            const title = hero.querySelector('h1')
            if (title) gsap.from(title, { y: 18, opacity: .65, duration: .85, ease: 'power3.out', clearProps: 'transform,opacity' })
          })
          root.querySelectorAll<HTMLElement>('[data-route-frame]').forEach(frame => {
            gsap.fromTo(frame, { clipPath: 'inset(5% 4% 5% 4% round 70px 0 0 0)' }, {
              clipPath: 'inset(0% 0% 0% 0% round 0px 0 0 0)', ease: 'none',
              scrollTrigger: { trigger: frame, start: 'top 95%', end: 'top 35%', scrub: true },
            })
          })
          root.querySelectorAll<HTMLElement>('[data-route-drift]').forEach(frame => {
            const img = frame.querySelector('img')
            if (img) gsap.fromTo(img, { yPercent: -3, scale: 1.08 }, { yPercent: 3, scale: 1.02, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } })
          })
          root.querySelectorAll<HTMLElement>('[data-route-copy]').forEach(copy => {
            gsap.from(copy, { y: 20, opacity: .65, duration: .8, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: copy, start: 'top 92%', once: true } })
          })
        }, root)
        return () => context.revert()
      })
      dispose = () => media.revert()
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh() })
    }).catch(() => { /* Static images and content remain available. */ })
    return () => { cancelled = true; dispose() }
  }, [targetId])
  return null
}
