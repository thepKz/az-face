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
          gsap.fromTo('.az-footer-letter', { yPercent: 12, opacity: .55 }, {
            yPercent: 0, opacity: 1, duration: .75, stagger: .055,
            ease: 'power2.out',
            scrollTrigger: { trigger: root.querySelector('.az-footer-display'), start: 'top 98%', once: true },
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
