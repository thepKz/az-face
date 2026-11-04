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
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          gsap.fromTo('.az-footer-letter', { yPercent: 65, rotation: 7, scaleY: .8, opacity: .35, transformOrigin: '50% 100%' }, {
            yPercent: 0, rotation: 0, scaleY: 1, opacity: 1, duration: 1, stagger: .08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: root.querySelector('.az-footer-display'),
              start: 'top 98%', end: 'clamp(bottom 94%)', scrub: .45,
              invalidateOnRefresh: true,
            },
          })
        }, root)
        return () => context.revert()
      })
      dispose = () => media.revert()
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh() })
    }).catch(() => { /* The wordmark is visible without the optional animation. */ })
    return () => { cancelled = true; dispose() }
  }, [pathname])
  return null
}
