'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useLocale } from 'next-intl'
import Link from '@/i18n/Link'
import type { Service } from '@/content/site'
import { ArrowIcon } from './Icons'
import './immersive-services.css'

const chapters = [
  { slug: 'cham-soc-da-mat', image: 'campaign-gallery-skin-main', detail: 'edition-collection-skin', vi: 'Làn da.', en: 'Your skin.', labelVi: 'Làn da', labelEn: 'Skin' },
  { slug: 'cham-soc-da-chuyen-sau', image: 'campaign-gallery-ritual-main', detail: 'edition-menu-stilllife', vi: 'Chuyên sâu.', en: 'A closer look.', labelVi: 'Chuyên sâu', labelEn: 'In depth' },
  { slug: 'dang-may-va-sac-moi', image: 'campaign-gallery-brows-main', detail: 'edition-collection-brow-detail', vi: 'Mày & môi.', en: 'Brows & lips.', labelVi: 'Mày & môi', labelEn: 'Brows & lips' },
]

export function ImmersiveServices({ services }: { services: Service[] }) {
  const en = useLocale() === 'en'
  const [ready, setReady] = useState(false)
  const [current, setCurrent] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const available = chapters.flatMap(chapter => {
    const service = services.find(item => item.slug === chapter.slug)
    return service ? [{ ...chapter, service }] : []
  })
  useEffect(() => { setReady(true) }, [])
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

  return <section className="immersive-services" id="dich-vu" data-ready={ready} aria-labelledby="immersive-services-title">
    <header className="immersive-services__heading">
      <h2 id="immersive-services-title">{en ? 'What would you like to explore?' : 'Bạn muốn chăm chút điều gì?'}</h2>
      <p>{en ? 'Choose a focus. See the details. Take the time you need.' : 'Chọn điều bạn quan tâm, nhìn kỹ hơn và tìm hiểu theo nhịp của bạn.'}</p>
    </header>
    {ready && available.length > 0 && <div className="immersive-services__navigation" role="tablist" aria-label={en ? 'Service focus' : 'Nhóm dịch vụ'}>
      {available.map((chapter, index) => <button key={chapter.slug} ref={element => { tabs.current[index] = element }} type="button" role="tab" id={`service-tab-${chapter.slug}`} aria-controls={`home-service-${chapter.slug}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setCurrent(index)} onKeyDown={event => selectWithKeyboard(event, index)}><span>{en ? chapter.labelEn : chapter.labelVi}</span><ArrowIcon /></button>)}
    </div>}
    {available.length ? <div className="immersive-services__scenes">
      {available.map((chapter, index) => <article key={chapter.slug} className="immersive-services__chapter" id={`home-service-${chapter.slug}`} role={ready ? 'tabpanel' : undefined} aria-labelledby={ready ? `service-tab-${chapter.slug}` : undefined} aria-hidden={ready && active !== index} inert={ready && active !== index} data-active={!ready || active === index}>
        <div className="immersive-services__copy"><h3>{en ? chapter.en : chapter.vi}</h3><p>{chapter.service.summary}</p><Link href={`/dich-vu/${chapter.slug}`} className="immersive-services__link"><span>{en ? 'Explore this service' : 'Tìm hiểu dịch vụ'}</span><ArrowIcon /></Link></div>
        <div className="immersive-services__composition">
          <figure className="immersive-services__picture"><img src={`/images/${chapter.image}.webp`} alt={en ? `Illustrative portrait: ${chapter.labelEn.toLowerCase()}` : `Chân dung minh họa: ${chapter.labelVi.toLowerCase()}`} width="1024" height="1280" loading="lazy" /></figure>
          <figure className="immersive-services__detail" aria-hidden="true"><img src={`/images/${chapter.detail}.webp`} alt="" width="800" height="1000" loading="lazy" /></figure>
          <span className="immersive-services__caption">{en ? 'Illustrative imagery' : 'Hình ảnh minh họa'}</span>
        </div>
      </article>)}
    </div> : <div className="immersive-services__empty"><p>{en ? 'Our service information is being updated.' : 'Thông tin dịch vụ đang được cập nhật.'}</p><Link href="/lien-he">{en ? 'Discuss your needs' : 'Trao đổi nhu cầu'} <ArrowIcon /></Link></div>}
  </section>
}
