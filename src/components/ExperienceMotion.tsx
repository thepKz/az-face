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
          const room = gsap.timeline({ scrollTrigger: { id: 'visit-room-morph', trigger: opening, start: 'top 65%', end: 'bottom 25%', scrub: .65 } })
          room.fromTo(opening.querySelector(':scope > figure'),
            { clipPath: 'ellipse(17% 46% at 50% 50%)', rotation: 13, scale: .78 },
            { clipPath: 'ellipse(72% 74% at 50% 50%)', rotation: -3, scale: 1, ease: 'power2.inOut', duration: 1 })
            .fromTo(opening.querySelector(':scope > figure img'), { scale: 1.55, xPercent: -12 },
              { scale: 1, xPercent: 0, duration: 1.3, ease: 'power2.out' }, 0)
          const portrait = root.querySelector('.experience-chapter__image')
          gsap.fromTo(portrait, { clipPath: 'inset(0% 0% 85% 0% round 45% 45% 8% 8%)', rotation: 9, y: 70 },
            { clipPath: 'inset(0% 0% 0% 0% round 32% 54% 42% 18%)', rotation: 0, y: 0, ease: 'power2.inOut', scrollTrigger: { id: 'visit-listening-reveal', trigger: '#lang-nghe', start: 'top 85%', end: 'center 45%', scrub: .7 } })
          const ritual = root.querySelector('.experience-ritual > figure')
          const unfolding = gsap.timeline({ scrollTrigger: { id: 'visit-ritual-unfold', trigger: '#cham-chut', start: 'top 85%', end: 'bottom 65%', scrub: .8 } })
          unfolding.fromTo(ritual, { rotationY: -48, rotationZ: -7, scale: .72, clipPath: 'inset(0% 44% 0% 44% round 45%)', transformPerspective: 1200 },
            { rotationY: 0, rotationZ: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 3%)', ease: 'power2.inOut', duration: 1.4 })
            .fromTo(root.querySelector('.experience-ritual > figure img'), { scale: 1.5, xPercent: 10 }, { scale: 1, xPercent: 0, duration: 1.4, ease: 'power2.out' }, 0)
          const close = root.querySelector('.experience-close > figure')
          gsap.fromTo(close, { clipPath: 'circle(12% at 50% 65%)', rotation: -24, scale: .75 }, { clipPath: 'circle(74% at 50% 50%)', rotation: 0, scale: 1, ease: 'power2.inOut', scrollTrigger: { id: 'visit-close-portrait', trigger: '#tiep-noi', start: 'top 90%', end: 'center 45%', scrub: .75 } })
        }, root)
        return () => context.revert()
      })
      media.add('(prefers-reduced-motion: no-preference) and (max-width: 760px)', () => {
        const context = gsap.context(() => {
          root.querySelectorAll('.experience-chapter__image, .experience-ritual > figure, .experience-close > figure').forEach((figure, index) => {
            gsap.fromTo(figure, { clipPath: 'inset(0% 0% 38% 0% round 30%)', y: 35, rotation: index % 2 ? -5 : 5 }, {
              clipPath: 'inset(0% 0% 0% 0% round 3%)', y: 0, rotation: 0, ease: 'power2.out',
              scrollTrigger: { id: `visit-mobile-${index}`, trigger: figure.parentElement, start: 'top 92%', end: 'center 65%', scrub: .45 },
            })
          })
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
