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
          gsap.fromTo('.az-footer-letter', { yPercent: 75, rotation: 8 }, {
            yPercent: 0, rotation: 0, duration: 1, stagger: .1,
            ease: 'power2.out',
            scrollTrigger: { trigger: root.querySelector('.az-footer-display'), start: 'top 100%', end: 'clamp(bottom bottom)', scrub: .7 },
          })
        }, root)
        return () => context.revert()
      })
      dispose = () => media.revert()
    }).catch(() => { /* The wordmark is visible without the optional animation. */ })
    return () => { cancelled = true; dispose() }
  }, [pathname])
  return null
}
