'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
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

export function ImmersiveServices({ services }: { services: Service[] }) {
  const en = useLocale() === 'en'
  const [ready, setReady] = useState(false)
  const [current, setCurrent] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const root = useRef<HTMLElement>(null)
  const available = chapters.flatMap(chapter => {
    const service = services.find(item => item.slug === chapter.slug)
    return service ? [{ ...chapter, service }] : []
  })
  useEffect(() => { setReady(true) }, [])
  useEffect(() => {
    if (!ready || !root.current) return
    let cancelled = false
    let dispose = () => {}
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !root.current) return
      gsap.registerPlugin(ScrollTrigger)
      const media = gsap.matchMedia()
      media.add({ desktop: '(min-width: 901px)', mobile: '(max-width: 900px)', motion: '(prefers-reduced-motion: no-preference)' }, match => {
        if (!match.conditions?.motion) return
        const context = gsap.context(() => {
          const scene = gsap.timeline({ scrollTrigger: { id: 'az-service-panorama', trigger: root.current!.querySelector('.immersive-services__navigation'), start: 'top 96%', end: 'top 30%', scrub: .55 } })
          tabs.current.forEach((tab, index) => {
            if (!tab) return
            scene.fromTo(tab, { yPercent: index === 1 ? 25 : 12, rotationX: match.conditions?.desktop ? -32 : -15, rotationZ: index === 1 ? 0 : (index === 0 ? -7 : 7), scale: .88 }, { yPercent: 0, rotationX: 0, rotationZ: 0, scale: 1, duration: 1, ease: 'power2.out' }, index * .09)
          })
        }, root)
        return () => context.revert()
      })
      dispose = () => media.revert()
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh() })
    }).catch(() => {})
    return () => { cancelled = true; dispose() }
  }, [ready, services.length])
  const active = Math.min(current, Math.max(0, available.length - 1))
  const selectWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % available.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + available.length) % available.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = available.length - 1
    else return
    event.preventDefault()
    setCurrent(next)
    tabs.current[next]?.focus()
  }

  return <section className="immersive-services" id="dich-vu" ref={root} data-ready={ready} aria-labelledby="immersive-services-title">
    <header className="immersive-services__heading">
      <h2 id="immersive-services-title">{en ? 'What would you like to explore?' : 'Bạn muốn chăm chút điều gì?'}</h2>
      <p>{en ? 'Choose a focus. See the details. Take the time you need.' : 'Chọn điều bạn quan tâm, nhìn kỹ hơn và tìm hiểu theo nhịp của bạn.'}</p>
    </header>
    {ready && available.length > 0 && <div className="immersive-services__navigation" role="tablist" style={{ gridTemplateColumns: available.map((_, index) => index === active ? '1.65fr' : '1fr').join(' ') }} aria-label={en ? 'Service focus' : 'Nhóm dịch vụ'}>
      {available.map((chapter, index) => <button key={chapter.slug} ref={element => { tabs.current[index] = element }} type="button" role="tab" id={`service-tab-${chapter.slug}`} aria-controls={`home-service-${chapter.slug}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setCurrent(index)} onKeyDown={event => selectWithKeyboard(event, index)}><img src={`/images/${chapter.image}.webp`} width="1024" height="1280" loading="lazy" alt="" /><span className="immersive-services__tab-label">{en ? chapter.labelEn : chapter.labelVi}<ArrowIcon /></span><span className="immersive-services__tab-action" aria-hidden="true">{active === index ? (en ? 'Selected' : 'Đang xem') : (en ? 'Explore' : 'Khám phá')}</span></button>)}
    </div>}
    {ready && available.length > 0 && <p className="immersive-services__image-note">{en ? 'Illustrative imagery' : 'Hình ảnh minh họa'}</p>}
    {available.length ? <div className="immersive-services__scenes">
      {available.map((chapter, index) => <article key={chapter.slug} className="immersive-services__chapter" id={`home-service-${chapter.slug}`} role={ready ? 'tabpanel' : undefined} aria-labelledby={ready ? `service-tab-${chapter.slug}` : undefined} aria-hidden={ready && active !== index} inert={ready && active !== index} data-active={!ready || active === index}>
        <div className="immersive-services__copy"><h3>{en ? chapter.en : chapter.vi}</h3><p>{chapter.service.summary}</p><Link href={`/dich-vu/${chapter.slug}`} className="immersive-services__link"><span>{en ? 'Explore this service' : 'Tìm hiểu dịch vụ'}</span><ArrowIcon /></Link></div>
        <div className="immersive-services__composition">
          <figure className="immersive-services__picture"><img src={`/images/${chapter.image}.webp`} alt={en ? `Illustrative image: ${chapter.labelEn.toLowerCase()}` : `Hình ảnh minh họa: ${chapter.labelVi.toLowerCase()}`} width="1024" height="1280" loading="lazy" /></figure>
          <figure className="immersive-services__detail" aria-hidden="true"><img src={`/images/${chapter.detail}.webp`} alt="" width="800" height="1000" loading="lazy" /></figure>
          <span className="immersive-services__caption">{en ? 'Illustrative imagery' : 'Hình ảnh minh họa'}</span>
        </div>
      </article>)}
    </div> : <div className="immersive-services__empty"><p>{en ? 'Our service information is being updated.' : 'Thông tin dịch vụ đang được cập nhật.'}</p><Link href="/lien-he">{en ? 'Discuss your needs' : 'Trao đổi nhu cầu'} <ArrowIcon /></Link></div>}
  </section>
}
