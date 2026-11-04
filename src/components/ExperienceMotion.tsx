'use client'

import { useEffect } from 'react'

export function ExperienceMotion() {
  useEffect(() => {
    const root = document.getElementById('experience-page')
    const opening = root?.querySelector<HTMLElement>('.experience-opening')
    const compass = root?.querySelector<HTMLElement>('.experience-compass')
    if (!root || !opening || !compass) return
    const chapters = ['lang-nghe', 'cham-chut', 'tiep-noi'].map(id => document.getElementById(id))
    const links = [...compass.querySelectorAll<HTMLAnchorElement>('[data-experience-link]')]
    const track = compass.querySelector<HTMLElement>('.experience-compass__track > span')
    const header = document.querySelector<HTMLElement>('.az-header')
    let frame = 0
    let cancelled = false
    let dispose = () => {}

    const update = () => {
      frame = 0
      const headerHeight = header?.getBoundingClientRect().height ?? 88
      root.style.setProperty('--experience-header-height', `${headerHeight}px`)
      const readingLine = headerHeight + compass.offsetHeight + innerHeight * .22
      let active = 0
      chapters.forEach((chapter, index) => { if (chapter && chapter.getBoundingClientRect().top <= readingLine) active = index })
      links.forEach((link, index) => {
        if (index === active) link.setAttribute('aria-current', 'location')
        else link.removeAttribute('aria-current')
      })
      const first = chapters[0]?.getBoundingClientRect()
      const last = chapters[2]?.getBoundingClientRect()
      if (track && first && last) {
        const progress = Math.max(0, Math.min(1, (readingLine - first.top) / Math.max(1, last.bottom - first.top)))
        track.style.transform = `scaleX(${progress})`
      }
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const resize = new ResizeObserver(schedule)
    resize.observe(root)
    if (header) resize.observe(header)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference) and (min-width: 761px)', () => {
        const context = gsap.context(() => {
          gsap.fromTo(opening.querySelector('figure'),
            { clipPath: 'ellipse(43% 48% at 50% 50%)', rotation: 8, scale: .88 },
            { clipPath: 'ellipse(75% 72% at 50% 50%)', rotation: -6, scale: 1.05, ease: 'none', scrollTrigger: { id: 'visit-room-morph', trigger: opening, start: 'top 60%', end: 'bottom 35%', scrub: .55 } })
          gsap.fromTo(opening.querySelector(':scope > figure img'), { scale: 1.12 },
            { scale: 1, ease: 'none', scrollTrigger: { trigger: opening, start: 'top top', end: 'bottom top', scrub: .55 } })
          const portrait = root.querySelector('.experience-chapter__image')
          gsap.fromTo(portrait, { borderRadius: '48% 48% 12% 12%' },
            { borderRadius: '32% 54% 42% 18%', ease: 'none', scrollTrigger: { trigger: portrait, start: 'top 90%', end: 'bottom 45%', scrub: .6 } })
          const ritual = root.querySelector('.experience-ritual > figure')
          gsap.fromTo(ritual, { scaleX: .62, rotation: -9, clipPath: 'inset(8% 4% 8% 4% round 35%)' }, { scaleX: 1, rotation: 2, clipPath: 'inset(0% 0% 0% 0% round 3%)', ease: 'power2.inOut', scrollTrigger: { id: 'visit-ritual-unfold', trigger: ritual, start: 'top 95%', end: 'center 40%', scrub: .65 } })
          const close = root.querySelector('.experience-close > figure')
          gsap.fromTo(close, { clipPath: 'ellipse(32% 45% at 50% 50%)', rotation: 18, yPercent: 14 }, { clipPath: 'ellipse(72% 72% at 50% 50%)', rotation: -5, yPercent: 0, ease: 'power2.out', scrollTrigger: { id: 'visit-close-portrait', trigger: close, start: 'top 95%', end: 'center 45%', scrub: .6 } })
        }, root)
        return () => context.revert()
      })
      dispose = () => media.revert()
      document.fonts.ready.then(() => { if (!cancelled) { ScrollTrigger.refresh(); schedule() } })
    }).catch(() => { /* The room and chapter links remain available without animation. */ })

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      resize.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      dispose()
    }
  }, [])
  return null
}
