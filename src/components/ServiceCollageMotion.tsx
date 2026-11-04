'use client'

import { useEffect } from 'react'

export function ServiceCollageMotion({ targetId }: { targetId: string }) {
  useEffect(() => {
    const root = document.getElementById(targetId)
    if (!root) return
    let cancelled = false
    let dispose = () => {}
    Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('gsap/MorphSVGPlugin')]).then(([{ gsap }, { ScrollTrigger }, { MorphSVGPlugin }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)
      const media = gsap.matchMedia()
      media.add({ desktop: '(min-width: 901px)', motion: '(prefers-reduced-motion: no-preference)' }, match => {
        if (!match.conditions?.motion) return
        const desktop = Boolean(match.conditions.desktop)
        const context = gsap.context(() => {
          const selector = root.querySelector('.az-services__selector')
          if (selector) {
            gsap.fromTo('.az-services__visual', { rotationY: desktop ? 22 : 8, rotation: -7, scale: .83, clipPath: 'inset(8% 14% 6% 8% round 34% 34% 4% 4%)' }, { rotationY: 0, rotation: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 0% 0% 0% 0%)', ease: 'power2.out', scrollTrigger: { id: 'az-services-cabinet-open', trigger: selector, start: 'top 90%', end: 'top 22%', scrub: .65 } })
          }
          root.querySelectorAll<HTMLElement>('.az-services__panel').forEach((panel, index) => {
            const image = panel.querySelector('.az-services__panel-image')
            const object = panel.querySelector('.az-services__panel-object')
            const reveal = gsap.timeline({ scrollTrigger: { id: `az-services-collage-${index + 1}`, trigger: panel, start: 'top 91%', end: 'center 42%', scrub: .7 } })
            reveal.fromTo(image, { clipPath: index % 2 ? 'inset(0% 28% 0% 28% round 45% 45% 4% 4%)' : 'inset(18% 0% 12% 0% round 38% 4% 38% 4%)', rotation: index % 2 ? 9 : -9, scale: .86 }, { clipPath: 'inset(0% 0% 0% 0% round 0% 0% 0% 0%)', rotation: index % 2 ? 3 : -3, scale: 1, ease: 'power2.out', duration: 1 }, 0)
              .fromTo(object, { xPercent: index % 2 ? -45 : 45, yPercent: 34, rotation: -28, scale: .65 }, { xPercent: 0, yPercent: 0, rotation: index % 2 ? 15 : -12, scale: 1, ease: 'power2.out', duration: 1 }, .12)
          })
          const hero = root.querySelector('.az-service-detail__hero')
          if (hero) {
            const path = hero.querySelector('[data-detail-window]')
            gsap.timeline({ scrollTrigger: { id: `${targetId}-portrait-morph`, trigger: hero, start: 'top top', end: 'bottom top', scrub: .7 } })
              .to(path, { morphSVG: 'M60 120 C210 70 495 60 620 150 C700 220 700 520 610 650 C535 755 220 770 90 680 C5 620 0 205 60 120 Z', duration: 1, ease: 'power1.inOut' }, 0)
              .to('.az-service-detail__hero-visual', { rotation: desktop ? 8 : 3, scale: 1.06, yPercent: -8, duration: 1, ease: 'none' }, 0)
              .to('.az-service-detail__hero-object', { rotation: -24, yPercent: -35, xPercent: -12, duration: 1, ease: 'none' }, 0)
          }
          const scope = root.querySelector('.az-service-detail__scope')
          if (scope) gsap.fromTo('.az-service-detail__details', { rotation: 4, clipPath: 'inset(0% 0% 12% 0% round 24px)' }, { rotation: 0, clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power2.out', scrollTrigger: { id: `${targetId}-scope-unfold`, trigger: scope, start: 'top 92%', end: 'top 38%', scrub: .6 } })
          const journey = root.querySelector('.az-service-detail__journey')
          if (journey) {
            gsap.timeline({ scrollTrigger: { id: `${targetId}-journey-window`, trigger: journey, start: 'top 88%', end: 'bottom 65%', scrub: .8 } })
              .fromTo('.az-service-detail__sticky figure', { borderRadius: '44% 44% 4% 4%', rotation: -6 }, { borderRadius: '4% 44% 4% 44%', rotation: 4, duration: 1 })
              .to('.az-service-detail__sticky figure', { borderRadius: '44% 4% 44% 4%', rotation: -3, duration: 1 })
            root.querySelectorAll<HTMLElement>('.az-service-detail__steps li').forEach((step, index) => {
              gsap.fromTo(step, { xPercent: desktop ? (index % 2 ? 12 : -12) : 4, rotation: index % 2 ? 3 : -3 }, { xPercent: 0, rotation: 0, duration: 1, ease: 'power2.out', scrollTrigger: { id: `${targetId}-step-${index + 1}`, trigger: step, start: 'top 94%', end: 'top 60%', scrub: .5 } })
            })
          }
          const questions = root.querySelector('.az-service-detail__questions')
          if (questions) gsap.fromTo('.az-service-detail__questions-art', { clipPath: 'inset(14% 18% 14% 18% round 45%)', rotation: 12 }, { clipPath: 'inset(0% 0% 0% 0% round 0%)', rotation: -3, ease: 'power2.out', scrollTrigger: { id: `${targetId}-questions-open`, trigger: questions, start: 'top 92%', end: 'top 30%', scrub: .65 } })
        }, root)
        return () => context.revert()
      })
      dispose = () => media.revert()
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh() })
    }).catch(() => { /* All service content and controls remain visible without animation. */ })
    return () => { cancelled = true; dispose() }
  }, [targetId])
  return null
}
