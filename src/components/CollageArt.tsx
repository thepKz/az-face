'use client'

import { useEffect, useId, useRef } from 'react'
import './collage-art.css'

type Variant = 'bloom' | 'glass' | 'silk' | 'atelier' | 'ribbon'
const materials: Record<Variant, string[]> = {
  bloom: ['pearl-orchid', 'champagne-arc', 'pearl-cluster'],
  glass: ['glass-drop', 'champagne-petal', 'pearl-cluster'],
  silk: ['teal-silk', 'pearl-orchid', 'champagne-petal'],
  atelier: ['stone-plinth', 'champagne-arc', 'pearl-orchid'],
  ribbon: ['champagne-arc', 'teal-silk', 'pearl-cluster'],
}
const outlines = [
  'M0 80 C170 10 280 20 430 180 C620 390 770 40 1000 70 L1000 700 C780 610 690 430 460 560 C230 710 100 600 0 680 Z',
  'M0 190 C180 330 290 60 470 100 C650 150 830 320 1000 120 L1000 540 C790 720 670 620 450 640 C230 660 120 410 0 510 Z',
]

export function CollageArt({ variant = 'bloom', className = '' }: { variant?: Variant; className?: string }) {
  const root = useRef<HTMLDivElement>(null)
  const id = `material-${useId().replace(/:/g, '')}`
  useEffect(() => {
    const art = root.current
    const host = art?.parentElement
    if (!art || !host) return
    let cancelled = false
    let cleanup = () => {}
    Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('gsap/MorphSVGPlugin')]).then(([{ gsap }, { ScrollTrigger }, { MorphSVGPlugin }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)
      const media = gsap.matchMedia()
      media.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 901px)' }, match => {
        if (!match.conditions?.motion) return
        const distance = match.conditions.desktop ? 1 : .45
        const loops: gsap.core.Tween[] = []
        const context = gsap.context(() => {
          const scene = gsap.timeline({ scrollTrigger: { id: `collage-${variant}-${id}`, trigger: host, start: 'top bottom', end: 'bottom top', scrub: .65 } })
          scene.fromTo('.collage-art__contour', { attr: { d: outlines[0] } }, { morphSVG: outlines[1], duration: 1, ease: 'sine.inOut' }, 0)
          art.querySelectorAll<HTMLElement>('.collage-art__object').forEach((object, index) => {
            const side = index % 2 ? -1 : 1
            scene.fromTo(object, { yPercent: side * 35 * distance, xPercent: -side * 12 * distance, rotation: side * -22 * distance, scale: .82 }, { yPercent: -side * 30 * distance, xPercent: side * 9 * distance, rotation: side * 18 * distance, scale: 1.08, duration: 1, ease: 'none' }, index * .035)
            loops.push(gsap.to(object.querySelector('img'), { y: (index % 2 ? -1 : 1) * 12 * distance, rotation: side * 3, duration: 5 + index, ease: 'sine.inOut', repeat: -1, yoyo: true, paused: true }))
          })
        }, art)
        let visible = false
        const playback = () => {
          const playing = visible && !document.hidden
          art.dataset.motion = playing ? 'running' : 'paused'
          loops.forEach(loop => playing ? loop.resume() : loop.pause())
        }
        const observer = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? false; playback() })
        observer.observe(host)
        document.addEventListener('visibilitychange', playback)
        return () => { observer.disconnect(); document.removeEventListener('visibilitychange', playback); context.revert(); art.dataset.motion = 'static' }
      })
      cleanup = () => media.revert()
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh() })
    }).catch(() => { /* The complete collage remains visible without animation. */ })
    return () => { cancelled = true; cleanup() }
  }, [variant, id])
  return <div ref={root} className={`collage-art collage-art--${variant} ${className}`} aria-hidden="true" data-motion="static">
    <svg className="collage-art__material" viewBox="0 0 1000 700" preserveAspectRatio="none"><defs><pattern id={id} width="1" height="1" patternContentUnits="objectBoundingBox"><image href={`/images/elements/${variant === 'silk' || variant === 'ribbon' ? 'teal-liquid' : 'pearl-paper'}.webp`} width="1" height="1" preserveAspectRatio="xMidYMid slice" /></pattern></defs><path className="collage-art__contour" d={outlines[0]} fill={`url(#${id})`} /></svg>
    <span className="collage-art__foil" />
    {materials[variant].map((asset, index) => <span className={`collage-art__object collage-art__object--${index + 1}`} key={asset}><img src={`/images/elements/${asset}.webp`} alt="" width="1000" height="1000" loading="lazy" decoding="async" /></span>)}
  </div>
}
