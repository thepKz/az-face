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
            reveal.fromTo(image, { clipPath: ['circle(15% at 50% 50%)','inset(42% 0 42% 0)','inset(0 48% 0 48% round 45%)'][index % 3], rotation: 0, scale: .86 }, { clipPath: ['circle(75% at 50% 50%)','inset(0% 0 0% 0)','inset(0 0% 0 0% round 0%)'][index % 3], rotation: 0, scale: 1, ease: 'power2.inOut', duration: 1 }, 0)
              .fromTo(object, { xPercent: index % 2 ? -45 : 45, yPercent: 34, rotation: -28, scale: .65 }, { xPercent: 0, yPercent: 0, rotation: index % 2 ? 15 : -12, scale: 1, ease: 'power2.out', duration: 1 }, .12)
          })
          const hero = root.querySelector('.az-service-detail__hero')
          if (hero) {
            const path = hero.querySelector('[data-detail-window]')
            gsap.fromTo('.az-service-detail__hero-visual', { clipPath: 'inset(48% 0 48% 0)' }, { clipPath: 'inset(0% 0 0% 0)', duration: 1.3, ease: 'expo.inOut', clearProps: 'clipPath' })
            gsap.timeline({ scrollTrigger: { id: `${targetId}-portrait-morph`, trigger: hero, start: 'top top', end: 'bottom top', scrub: .7 } })
              .to(path, { morphSVG: 'M60 120 C210 70 495 60 620 150 C700 220 700 520 610 650 C535 755 220 770 90 680 C5 620 0 205 60 120 Z', duration: 1, ease: 'power1.inOut' }, 0)
              .to('.az-service-detail__hero-visual', { rotation: desktop ? 8 : 3, scale: 1.06, yPercent: -8, duration: 1, ease: 'none' }, 0)
              .to('.az-service-detail__hero-object', { rotation: -24, yPercent: -35, xPercent: -12, duration: 1, ease: 'none' }, 0)
          }
          const scope = root.querySelector('.az-service-detail__scope')
          if (scope) {
            gsap.fromTo('.az-service-detail__details', { y: 65 }, { y: 0, ease: 'power2.out', scrollTrigger: { id: `${targetId}-scope-unfold`, trigger: scope, start: 'top 92%', end: 'top 38%', scrub: .6 } })
            gsap.fromTo(scope, { '--scope-line': '0%' }, { '--scope-line': '100%', ease: 'none', scrollTrigger: { trigger: scope, start: 'top 85%', end: 'bottom 70%', scrub: .6 } })
          }
          const journey = root.querySelector('.az-service-detail__journey')
          if (journey) {
            gsap.timeline({ scrollTrigger: { id: `${targetId}-journey-window`, trigger: journey, start: 'top 92%', end: 'center 45%', scrub: .8 } })
              .fromTo('.az-service-detail__sticky figure', { clipPath: 'inset(0 36% 0 36% round 48%)' }, { clipPath: 'inset(0 0% 0 0% round 0%)', duration: 1, ease: 'power2.inOut' })
              .fromTo('.az-service-detail__sticky img', { scale: 1.5 }, { scale: 1, duration: 1 }, 0)
            root.querySelectorAll<HTMLElement>('.az-service-detail__steps li').forEach((step, index) => {
              gsap.fromTo(step, { y: desktop ? 110 + index * 40 : 35 }, { y: 0, duration: 1, ease: 'power2.out', scrollTrigger: { id: `${targetId}-step-${index + 1}`, trigger: step, start: 'top 98%', end: 'top 63%', scrub: .6 } })
            })
          }
          const questions = root.querySelector('.az-service-detail__questions')
          if (questions) gsap.fromTo('.az-service-detail__questions-art', { clipPath: 'circle(12% at 50% 50%)', scale: .72 }, { clipPath: 'circle(72% at 50% 50%)', scale: 1, ease: 'power2.inOut', scrollTrigger: { id: `${targetId}-questions-open`, trigger: questions, start: 'top 92%', end: 'top 30%', scrub: .65 } })
          const cost = root.querySelector('.az-service-detail__cost')
          if (cost) gsap.fromTo(cost, { '--cost-aperture': '14%' }, { '--cost-aperture': '100%', ease: 'power2.inOut', scrollTrigger: { id: `${targetId}-cost-aperture`, trigger: cost, start: 'top 96%', end: 'center 50%', scrub: .65 } })
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
