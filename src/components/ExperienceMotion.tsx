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
          // The room opens around the reading area; the text never travels with the image.
          gsap.fromTo(opening.querySelector('figure'),
            { clipPath: 'ellipse(42% 65% at 78% 51%)' },
            { clipPath: 'ellipse(100% 100% at 50% 50%)', ease: 'none', scrollTrigger: { trigger: opening, start: 'top top', end: 'bottom 35%', scrub: .55 } })
          gsap.fromTo(opening.querySelector('img'), { scale: 1.12 },
            { scale: 1, ease: 'none', scrollTrigger: { trigger: opening, start: 'top top', end: 'bottom top', scrub: .55 } })
          const portrait = root.querySelector('.experience-chapter__image')
          gsap.fromTo(portrait, { borderRadius: '48% 48% 12% 12%' },
            { borderRadius: '32% 54% 42% 18%', ease: 'none', scrollTrigger: { trigger: portrait, start: 'top 90%', end: 'bottom 45%', scrub: .6 } })
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
