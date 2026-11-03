'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function SiteMotion() {
  const pathname = usePathname()
  useEffect(() => {
    let cancelled = false
    let dispose = () => {}
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const media = gsap.matchMedia()
      media.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 681px)' }, scope => {
        if (!scope.conditions?.motion) return
        const desktop = Boolean(scope.conditions.desktop)
        const context = gsap.context(() => {
          const hero = document.querySelector('.atelier-hero')
          if (hero) {
            gsap.timeline({ defaults: { ease: 'power3.out' } })
              .from('.atelier-hero__copy h1', { y: 24, opacity: .65, duration: .9, clearProps: 'transform,opacity' })
              .from('.atelier-hero__portrait', { clipPath: 'inset(4% 12% 10% 10% round 160px 0 120px 0)', scale: .97, duration: 1.2, clearProps: 'clipPath,transform' }, 0)
              .from('.atelier-hero__detail img', { scale: 1.18, opacity: .5, duration: 1.1, clearProps: 'transform,opacity' }, .12)
              .from('.atelier-hero__signature', { y: 18, opacity: .5, duration: .9, clearProps: 'transform,opacity' }, .2)
              .from('.atelier-hero__copy > p,.atelier-hero__cta', { y: 12, opacity: .6, stagger: .08, duration: .8, clearProps: 'transform,opacity' }, .12)
            // Intro owns the frame; the scroll scene owns the image inside it.
            gsap.fromTo('.atelier-hero__portrait img', { scale: 1.12, yPercent: -2 }, { scale: 1.02, yPercent: 4, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } })
            gsap.to('.atelier-hero__detail', { y: desktop ? -70 : -28, rotation: 1, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } })
          }
          gsap.utils.toArray<HTMLElement>('[data-section-bridge]').forEach((bridge, index) => {
            const path = bridge.querySelector('[data-morph-edge]')
            // Identical SVG commands allow numeric path interpolation without a plugin.
            gsap.fromTo(path, { attr: { d: index % 2 ? 'M0 45 C400 200 1040 10 1440 130 L1440 200 L0 200 Z' : 'M0 130 C360 10 960 200 1440 45 L1440 200 L0 200 Z' } },
              { attr: { d: 'M0 12 C360 8 960 16 1440 12 L1440 200 L0 200 Z' }, ease: 'none', scrollTrigger: { trigger: bridge, start: 'top 95%', end: 'bottom 25%', scrub: true } })
          })
          gsap.utils.toArray<HTMLElement>('[data-portrait-service]').forEach((card, index) => {
            gsap.from(card.querySelector('.portrait-service__image'), { clipPath: 'inset(12% 0 8% 0 round 15% 15% 0 0)', y: 35, duration: 1.15, delay: desktop ? index * .1 : 0, ease: 'power3.out', clearProps: 'clipPath,transform', scrollTrigger: { trigger: card, start: 'top 92%', once: true } })
            gsap.from(card.querySelector('h3'), { y: 14, opacity: .6, duration: .75, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: card, start: 'top 75%', once: true } })
          })
          const gallery = document.querySelector('[data-beauty-gallery]')
          if (gallery) {
            const travel = desktop ? 58 : 20
            const timeline = gsap.timeline({ scrollTrigger: { trigger: gallery, start: 'top bottom', end: 'bottom top', scrub: true } })
            timeline.fromTo('[data-beauty-layer="main"]', { y: travel, rotation: -2 }, { y: -travel, rotation: 1, ease: 'none' }, 0)
              .fromTo('[data-beauty-layer="detail"]', { y: -travel, rotation: -6 }, { y: travel, rotation: 4, ease: 'none' }, 0)
              .fromTo('[data-beauty-layer="botanical"]', { y: travel * 1.4 }, { y: -travel * 1.4, ease: 'none' }, 0)
          }
          const ritual = document.querySelector('.ritual-journey')
          if (ritual) {
            const timeline = gsap.timeline({ scrollTrigger: { trigger: ritual, start: 'top 75%', once: true } })
            timeline.from('[data-ritual-visual] > img', { clipPath: 'inset(8% 12% 8% 0 round 120px 0 0 0)', duration: 1.2, ease: 'power3.out', clearProps: 'clipPath' })
              .from('[data-ritual-step]', { x: 24, opacity: .5, stagger: .16, duration: .8, ease: 'power3.out', clearProps: 'transform,opacity' }, .1)
              .from('[data-ritual-inset]', { rotation: -12, y: 45, duration: 1.1, ease: 'power3.out', clearProps: 'transform' }, .15)
          }
          const space = document.querySelector('.atelier-space')
          if (space) {
            gsap.fromTo('[data-space-image]', { clipPath: desktop ? 'inset(5% 16% 8% 16% round 180px 180px 0 0)' : 'inset(0 5% 0 5% round 70px 70px 0 0)' },
              { clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0 0)', ease: 'none', scrollTrigger: { trigger: space, start: 'top 95%', end: 'top 15%', scrub: true } })
            gsap.fromTo('[data-space-image] img', { scale: 1.16, yPercent: -4 }, { scale: 1, yPercent: 4, ease: 'none', scrollTrigger: { trigger: space, start: 'top bottom', end: 'bottom top', scrub: true } })
            gsap.from('.atelier-space__title', { y: 45, opacity: .5, ease: 'power3.out', duration: 1, clearProps: 'transform,opacity', scrollTrigger: { trigger: space, start: 'top 65%', once: true } })
          }
          gsap.utils.toArray<HTMLElement>('.atelier-journal .article-card').forEach((card, index) => {
            gsap.from(card.querySelector('.article-image-link'), { clipPath: 'inset(0 0 22% 0)', duration: 1.05, delay: desktop ? index * .12 : 0, clearProps: 'clipPath', ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%', once: true } })
            gsap.from(card.querySelector('.article-card-body'), { y: 20, opacity: .6, duration: .8, clearProps: 'transform,opacity', ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 78%', once: true } })
          })
          gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
            if (element.closest('.atelier-home') || element.getBoundingClientRect().top < innerHeight) return
            gsap.from(element, { y: 22, opacity: .6, duration: .75, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 94%', once: true }, clearProps: 'transform,opacity' })
          })
        })
        return () => context.revert()
      })
      dispose = () => media.revert()
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh() })
    }).catch(() => { /* The static composition remains usable if motion cannot load. */ })
    return () => { cancelled = true; dispose() }
  }, [pathname])
  return null
}
