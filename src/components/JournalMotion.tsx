'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export function JournalMotion({ children, className = '' }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let cancelled = false
    let dispose = () => {}
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !root.current) return
      gsap.registerPlugin(ScrollTrigger)
      const context = gsap.context(() => {
        const media = gsap.matchMedia()
        media.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 900px)' }, ({ conditions }) => {
          if (!conditions?.motion) return
          const scope = root.current!
          const arrival = scope.querySelector('[data-journal-arrival]')
          if (arrival) gsap.fromTo(arrival, { y: 18, opacity: .75 }, { y: 0, opacity: 1, duration: .8, ease: 'power3.out', clearProps: 'transform,opacity' })
          scope.querySelectorAll<HTMLElement>('[data-journal-reveal]').forEach((frame, index) => {
            const wide = Boolean(conditions.desktop)
            gsap.fromTo(frame, { clipPath: `inset(${wide ? 15 : 7}% ${wide ? 18 : 6}% 8% 2% round 38%)`, rotation: wide ? (index % 2 ? 7 : -7) : 0 }, { clipPath: 'inset(0% 0% 0% 0% round 2%)', rotation: 0, ease: 'power2.inOut', scrollTrigger: { id: `editorial-window-${index}`, trigger: frame, start: 'top 96%', end: 'center 45%', scrub: .65 } })
          })
          scope.querySelectorAll<HTMLElement>('.ej-story').forEach((story, index) => {
            gsap.fromTo(story, { rotation: index % 2 ? 6 : -6, y: 60, transformOrigin: '50% 100%' }, { rotation: 0, y: 0, ease: 'power2.out', scrollTrigger: { id: `journal-sheet-${index}`, trigger: story, start: 'top 98%', end: 'top 35%', scrub: .55 } })
          })
          if (conditions.desktop) scope.querySelectorAll<HTMLElement>('[data-journal-parallax] img').forEach(image => {
            gsap.fromTo(image, { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: .7 } })
          })
          const body = scope.querySelector('[data-journal-body]')
          const progress = scope.querySelector('[data-journal-progress]')
          if (body && progress) gsap.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: body, start: 'top 60%', end: 'bottom 85%', scrub: true } })
        })
      }, root)
      dispose = () => context.revert()
    }).catch(() => { /* Reading and form interactions do not depend on motion loading. */ })
    return () => { cancelled = true; dispose() }
  }, [])
  return <div ref={root} className={className}>{children}</div>
}
