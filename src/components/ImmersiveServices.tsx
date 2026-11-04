'use client'

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { useLocale } from 'next-intl'
import Link from '@/i18n/Link'
import type { Service } from '@/content/site'
import { ArrowIcon } from './Icons'
import './immersive-services.css'

const chapters = [
  { slug: 'cham-soc-da-mat', image: 'campaign-service-skin', detail: 'campaign-gallery-skin-detail', vi: 'Làn da.', en: 'Your skin.', labelVi: 'Làn da', labelEn: 'Skin' },
  { slug: 'cham-soc-da-chuyen-sau', image: 'campaign-service-care', detail: 'campaign-gallery-ritual-detail', vi: 'Chuyên sâu.', en: 'A closer look.', labelVi: 'Chuyên sâu', labelEn: 'In depth' },
  { slug: 'dang-may-va-sac-moi', image: 'campaign-service-brows', detail: 'campaign-gallery-brows-detail', vi: 'Mày & môi.', en: 'Brows & lips.', labelVi: 'Mày & môi', labelEn: 'Brows & lips' },
]

const serviceWindows = [
  'M130 20 C260 0 490 0 550 110 C600 220 580 500 520 610 C460 690 220 710 100 640 C20 590 0 370 20 200 C30 100 50 40 130 20 Z',
  'M40 100 C150 20 340 50 520 20 C580 60 590 220 560 360 C530 480 580 610 510 650 C350 710 150 650 40 680 C0 490 60 300 40 100 Z',
  'M300 10 C470 10 590 150 590 330 L590 650 C420 710 180 710 10 650 L10 330 C10 150 130 10 300 10 Z',
]

export function ImmersiveServices({ services }: { services: Service[] }) {
  const en = useLocale() === 'en'
  const [ready, setReady] = useState(false)
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const root = useRef<HTMLElement>(null)
  const available = chapters.flatMap(chapter => {
    const service = services.find(item => item.slug === chapter.slug)
    return service ? [{ ...chapter, service }] : []
  })
  const clipId = useId().replace(/:/g, '')
  const seek = useRef<((index: number) => void) | null>(null)
  useEffect(() => { setReady(true) }, [])
  useEffect(() => {
    const section = root.current
    if (!ready || !section || !available.length) return
    let cancelled = false
    let dispose = () => {}
    Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('gsap/MorphSVGPlugin')]).then(([{ gsap }, { ScrollTrigger }, { MorphSVGPlugin }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)
      const media = gsap.matchMedia()
      media.add('(min-width: 1100px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)', () => {
        let context: ReturnType<typeof gsap.context> | undefined
        let resizeTimer: ReturnType<typeof setTimeout> | undefined
        let disposed = false
        let verifyFrame = 0
        let viewport = `${window.innerWidth}x${window.innerHeight}`
        const rebuild = () => {
          if (disposed) return
          cancelAnimationFrame(verifyFrame)
          seek.current = null
          context?.revert()
          context = undefined
          setTransitioning(false)
          section.dataset.theater = 'true'
          const panels = [...section.querySelectorAll<HTMLElement>('.immersive-services__chapter')]
          const stage = section.querySelector<HTMLElement>('.immersive-services__scenes')!
          // Measure every reading surface, including inactive panels. Decorative transforms
          // intentionally extend past the stage and must not determine text-fit fallback.
          const contentOverflows = () => panels.some(panel => {
            const copy = panel.querySelector<HTMLElement>('.immersive-services__copy')!
            const link = panel.querySelector<HTMLElement>('.immersive-services__link')!
            const bounds = panel.getBoundingClientRect()
            const copyBounds = copy.getBoundingClientRect()
            const linkBounds = link.getBoundingClientRect()
            const style = getComputedStyle(panel)
            const top = bounds.top + parseFloat(style.paddingTop)
            const bottom = bounds.bottom - parseFloat(style.paddingBottom)
            return stage.clientHeight < 1 || copyBounds.top < top - 1 || copyBounds.bottom > bottom + 1 || linkBounds.bottom > bottom + 1 || copy.scrollHeight > copy.clientHeight + 1
          })
          const fallback = () => {
            seek.current = null
            context?.revert()
            context = undefined
            delete section.dataset.theater
            setTransitioning(false)
            ScrollTrigger.refresh()
          }
          if (contentOverflows()) { fallback(); return }
          context = gsap.context(() => {
            const scene = gsap.timeline({ scrollTrigger: { id: 'az-service-theater', trigger: section, start: 'top top', end: () => `+=${Math.round(window.innerHeight * panels.length * .85)}`, pin: true, pinSpacing: true, scrub: .7, invalidateOnRefresh: true, refreshPriority: 20 } })
            panels.forEach((panel, index) => {
              const start = index * 2
              if (index) {
                gsap.set(panel, { clipPath: 'inset(100% 0% 0% 0% round 48% 48% 0% 0%)' })
                scene.to(panel, { clipPath: 'inset(0% 0% 0% 0% round 0% 0% 0% 0%)', duration: 1, ease: 'power3.inOut' }, start - 1)
                scene.to(panels[index - 1].querySelector('.immersive-services__composition'), { scale: .74, rotationY: -24, xPercent: -18, duration: 1, ease: 'power2.inOut' }, start - 1)
              }
              scene.fromTo(panel.querySelector('.immersive-services__portrait'), { rotation: index === 1 ? 17 : -16, scale: .7, rotationY: index === 2 ? -35 : 28 }, { rotation: index === 1 ? 5 : -4, scale: 1, rotationY: 0, duration: 1.6, ease: 'power2.inOut' }, Math.max(0, start - .8))
              scene.fromTo(panel.querySelector('[data-service-mask]'), { attr: { d: 'M260 40 C280 10 320 10 340 40 L350 600 C350 680 250 680 250 600 Z' } }, { morphSVG: serviceWindows[index % 3], duration: 1.3, ease: 'power2.inOut' }, Math.max(0, start - .7))
              scene.fromTo(panel.querySelector('.immersive-services__detail'), { xPercent: index === 1 ? -90 : 90, yPercent: 45, rotation: 35, scale: .55 }, { xPercent: 0, yPercent: 0, rotation: index === 1 ? -12 : 12, scale: 1, duration: 1.4, ease: 'power3.out' }, Math.max(0, start - .6))
              scene.fromTo(panel.querySelector('.immersive-services__object'), { yPercent: 40, rotation: -35, scale: .65 }, { yPercent: -8, rotation: 16, scale: 1.15, duration: 1.7, ease: 'none' }, Math.max(0, start - .7))
            })
            scene.to({}, { duration: .1 }, panels.length * 2 - 1)
            scene.eventCallback('onUpdate', () => {
              const time = scene.time()
              setCurrent(Math.min(panels.length - 1, Math.max(0, Math.floor((time + .45) / 2))))
              // A partly revealed new CTA must never click through to the outgoing service.
              setTransitioning(panels.some((_, index) => index > 0 && time > index * 2 - 1 && time < index * 2))
            })
            seek.current = index => {
              const trigger = scene.scrollTrigger!
              const time = Math.min(scene.duration(), index * 2 + .7)
              // Native smooth scrolling must not race an explicit timeline seek.
              const html = document.documentElement
              const previousBehavior = html.style.scrollBehavior
              html.style.scrollBehavior = 'auto'
              try {
                trigger.scroll(trigger.start + time / scene.duration() * (trigger.end - trigger.start))
                trigger.update()
                trigger.getTween()?.progress(1)
                scene.time(time)
              } finally { html.style.scrollBehavior = previousBehavior }
              setCurrent(index)
            }
          }, section)
          ScrollTrigger.refresh()
          // Pin measurement and React's selected state settle after the first layout.
          verifyFrame = requestAnimationFrame(() => {
            verifyFrame = requestAnimationFrame(() => { if (!disposed && contentOverflows()) fallback() })
          })
        }
        const resize = () => {
          const next = `${window.innerWidth}x${window.innerHeight}`
          if (next === viewport) return
          viewport = next
          clearTimeout(resizeTimer)
          resizeTimer = setTimeout(rebuild, 160)
        }
        rebuild()
        window.addEventListener('resize', resize)
        if (document.fonts.status !== 'loaded') document.fonts.ready.then(() => { if (!disposed) rebuild() })
        return () => {
          disposed = true
          clearTimeout(resizeTimer)
          cancelAnimationFrame(verifyFrame)
          window.removeEventListener('resize', resize)
          seek.current = null
          context?.revert()
          delete section.dataset.theater
          setTransitioning(false)
        }
      })
      dispose = () => media.revert()

    }).catch(() => { delete section.dataset.theater })
    return () => { cancelled = true; seek.current = null; dispose() }
  }, [ready, services.length])
  const select = (index: number) => { setCurrent(index); seek.current?.(index) }
  const active = Math.min(current, Math.max(0, available.length - 1))
  const selectWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % available.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + available.length) % available.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = available.length - 1
    else return
    event.preventDefault()
    select(next)
    tabs.current[next]?.focus({ preventScroll: true })
  }

  return <section className="immersive-services collage-host" id="dich-vu" ref={root} data-ready={ready} data-transitioning={transitioning} aria-labelledby="immersive-services-title">
    <header className="immersive-services__heading">
      <h2 id="immersive-services-title">{en ? 'What would you like to explore?' : 'Bạn muốn chăm chút điều gì?'}</h2>
      <p>{en ? 'Choose a focus. See the details. Take the time you need.' : 'Chọn điều bạn quan tâm, nhìn kỹ hơn và tìm hiểu theo nhịp của bạn.'}</p>
    </header>
    {ready && available.length > 0 && <div className="immersive-services__navigation" role="tablist" aria-label={en ? 'Service focus' : 'Nhóm dịch vụ'}>
      {available.map((chapter, index) => <button key={chapter.slug} ref={element => { tabs.current[index] = element }} type="button" role="tab" id={`service-tab-${chapter.slug}`} aria-controls={`home-service-${chapter.slug}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => select(index)} onKeyDown={event => selectWithKeyboard(event, index)}><span>{en ? chapter.labelEn : chapter.labelVi}</span><ArrowIcon /></button>)}
    </div>}
    {available.length ? <div className="immersive-services__scenes">
      {available.map((chapter, index) => <article key={chapter.slug} className={`immersive-services__chapter immersive-services__chapter--${index + 1}`} id={`home-service-${chapter.slug}`} role={ready ? 'tabpanel' : undefined} aria-labelledby={ready ? `service-tab-${chapter.slug}` : undefined} aria-hidden={ready && active !== index} inert={ready && active !== index} data-active={!ready || active === index}>
        <div className="immersive-services__copy"><h3>{en ? chapter.en : chapter.vi}</h3><p>{chapter.service.summary}</p><Link href={`/dich-vu/${chapter.slug}`} className="immersive-services__link" aria-disabled={transitioning || undefined} tabIndex={transitioning ? -1 : undefined} onClick={event => { if (transitioning) event.preventDefault() }}><span>{en ? 'Explore this service' : 'Tìm hiểu dịch vụ'}</span><ArrowIcon /></Link></div>
        <div className="immersive-services__composition">
          <svg className="immersive-services__portrait" viewBox="0 0 600 700" role="img" aria-label={en ? `Illustrative portrait: ${chapter.labelEn}` : `Chân dung minh họa: ${chapter.labelVi}`}><defs><clipPath id={`${clipId}-${index}`}><path data-service-mask d={serviceWindows[index % 3]} /></clipPath></defs><image href={`/images/${chapter.image}.webp`} width="600" height="700" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${clipId}-${index})`} /></svg>
          <figure className="immersive-services__detail"><img src={`/images/${chapter.detail}.webp`} alt="" width="1024" height="1280" loading="lazy" /></figure>
          <img className="immersive-services__object" src={`/images/elements/${['glass-drop', 'teal-silk', 'champagne-petal'][index % 3]}.webp`} alt="" width="800" height="800" loading="lazy" />
          <span className="immersive-services__caption">{en ? 'Illustrative imagery' : 'Hình ảnh minh họa'}</span>
        </div>
      </article>)}
    </div> : <div className="immersive-services__empty"><p>{en ? 'Our service information is being updated.' : 'Thông tin dịch vụ đang được cập nhật.'}</p><Link href="/lien-he">{en ? 'Discuss your needs' : 'Trao đổi nhu cầu'} <ArrowIcon /></Link></div>}
  </section>
}
