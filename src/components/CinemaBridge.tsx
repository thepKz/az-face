'use client'

import { useEffect, useRef } from 'react'

export function CinemaBridge({ text, from = '#e8efad', to = '#102f2a', ink = '#102f2a' }: { text: string; from?: string; to?: string; ink?: string }) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let disposed = false
    let cleanup = () => {}
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed || !root.current) return
      gsap.registerPlugin(ScrollTrigger)
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          gsap.to('[data-cinema-running]', { xPercent: -18, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: .6 } })
          gsap.to('[data-cinema-edge]', { attr: { d: 'M0 25 C320 85 1000 5 1440 35 L1440 160 L0 160 Z' }, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom 35%', scrub: .6 } })
        }, root)
        return () => context.revert()
      })
      cleanup = () => media.revert()
    }).catch(() => {})
    return () => { disposed = true; cleanup() }
  }, [])
  return <div className="cinema-bridge" ref={root} aria-hidden="true" style={{ background: from, color: ink }}><div className="cinema-bridge__type" data-cinema-running>{text}<span>{text}</span></div><svg viewBox="0 0 1440 160" preserveAspectRatio="none"><path data-cinema-edge fill={to} d="M0 130 C320 0 1000 160 1440 55 L1440 160 L0 160 Z" /></svg></div>
}
