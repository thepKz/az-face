'use client'

import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import type { Service } from '@/content/site'
import { ArrowIcon } from './Icons'
import './face-focus.css'

const choices = [
  { slug: 'cham-soc-da-mat', label: 'Làn da', image: 'campaign-service-skin' },
  { slug: 'cham-soc-da-chuyen-sau', label: 'Chăm sóc chuyên sâu', image: 'campaign-service-care' },
  { slug: 'dang-may-va-sac-moi', label: 'Mày & môi', image: 'campaign-service-brows' },
]

export function FaceFocus({ services }: { services: Service[] }) {
  const [selected, setSelected] = useState(choices[0].slug)
  const imageFrame = useRef<HTMLDivElement>(null)
  const id = useId()
  const available = choices.flatMap(choice => {
    const service = services.find(item => item.slug === choice.slug)
    return service ? [{ ...choice, service }] : []
  })
  const active = available.find(choice => choice.slug === selected) ?? available[0]

  useEffect(() => {
    const frame = imageFrame.current
    if (!frame || !active) return
    let cancelled = false
    let dispose = () => {}
    import('gsap').then(({ gsap }) => {
      if (cancelled) return
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          gsap.fromTo(frame.querySelector('img'),
            { clipPath: 'inset(0 0 0 22%)', scale: 1.04, opacity: .65 },
            { clipPath: 'inset(0 0 0 0%)', scale: 1, opacity: 1, duration: .65, ease: 'power3.out', clearProps: 'clipPath,transform,opacity' })
        }, frame)
        return () => context.revert()
      })
      dispose = () => media.revert()
    }).catch(() => { /* Image selection remains available without motion. */ })
    return () => { cancelled = true; dispose() }
  }, [active?.slug])

  return <section className="face-focus" id="dich-vu" aria-labelledby={`${id}-heading`}>
    <div className="face-focus__layout">
      {active && <div className="face-focus__portrait" ref={imageFrame}>
        <img key={active.slug} src={`/images/${active.image}.webp`} alt={active.service.imageAlt} width="1024" height="1280" loading="lazy" />
        <span className="face-focus__image-note" aria-hidden="true">AZ FACE</span>
      </div>}
      <div className="face-focus__content">
        <h2 id={`${id}-heading`}>Bạn muốn chăm chút điều gì?</h2>
        {active ? <>
          <div className="face-focus__choices" role="group" aria-label="Chọn nhu cầu chăm sóc">
            {choices.map(choice => {
              const enabled = available.some(item => item.slug === choice.slug)
              return <button key={choice.slug} type="button" disabled={!enabled} aria-pressed={active.slug === choice.slug} aria-controls={`${id}-detail`} onClick={() => setSelected(choice.slug)}>
                <span>{choice.label}</span><ArrowIcon />
              </button>
            })}
          </div>
          <div className="face-focus__detail" id={`${id}-detail`}>
            <div aria-live="polite" aria-atomic="true"><h3>{active.service.title}</h3><p>{active.service.summary}</p></div>
            <div className="face-focus__actions"><Link className="face-focus__primary" href={`/dich-vu/${active.slug}`}>Tìm hiểu dịch vụ <ArrowIcon /></Link><Link className="face-focus__contact" href={`/lien-he?nhu-cau=${encodeURIComponent(active.slug)}`}>Tư vấn nhu cầu này <ArrowIcon /></Link></div>
          </div>
        </> : <div className="face-focus__empty"><p>Danh mục dịch vụ đang được cập nhật.</p><Link className="face-focus__primary" href="/lien-he">Trao đổi nhu cầu <ArrowIcon /></Link></div>}
      </div>
    </div>
  </section>
}
