'use client'

import Link from '@/i18n/Link'
import { useLocale } from 'next-intl'
import { useEffect, useId, useRef, useState } from 'react'
import type { Service } from '@/content/site'
import { ArrowIcon } from './Icons'
import './face-focus.css'

const choices = [
  { slug: 'cham-soc-da-mat', label: 'Làn da', image: 'campaign-service-skin' },
  { slug: 'cham-soc-da-chuyen-sau', label: 'Chăm sóc chuyên sâu', image: 'campaign-service-care' },
  { slug: 'dang-may-va-sac-moi', label: 'Mày & môi', image: 'campaign-service-brows' },
]

// Four cubic segments in every contour make numeric path interpolation predictable.
const contours = [
  'M .48 .02 C .78 -.01 .99 .22 .96 .49 C .99 .77 .81 .98 .53 .97 C .25 1 .03 .82 .04 .53 C .01 .25 .19 .05 .48 .02 Z',
  'M .48 .04 C .82 .04 .91 .18 .98 .46 C 1 .76 .72 .92 .48 .99 C .17 .98 .08 .79 .02 .51 C .01 .2 .19 .01 .48 .04 Z',
  'M .48 .01 C .74 .02 .99 .29 .93 .55 C .88 .86 .75 .99 .47 .95 C .16 .99 .01 .75 .06 .47 C .08 .16 .22 .04 .48 .01 Z',
]

export function FaceFocus({ services }: { services: Service[] }) {
  const en = useLocale() === 'en'
  const labels = en ? ['Skin', 'Advanced skin care', 'Brows & lips'] : choices.map(choice => choice.label)
  const [selected, setSelected] = useState(choices[0].slug)
  const imageFrame = useRef<HTMLDivElement>(null)
  const shape = useRef<SVGPathElement>(null)
  const currentContour = useRef(contours[0])
  const id = useId()
  const clipId = `face-window-${id.replace(/[^a-zA-Z0-9_-]/g, '')}`
  const available = choices.flatMap(choice => {
    const service = services.find(item => item.slug === choice.slug)
    return service ? [{ ...choice, service }] : []
  })
  const active = available.find(choice => choice.slug === selected) ?? available[0]

  useEffect(() => {
    const frame = imageFrame.current
    const path = shape.current
    if (!frame || !path || !active) return
    const contour = contours[choices.findIndex(choice => choice.slug === active.slug)]
    let cancelled = false
    let dispose = () => {}
    import('gsap').then(({ gsap }) => {
      if (cancelled) return
      path.setAttribute('d', currentContour.current)
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: reduce)', () => { path.setAttribute('d', contour) })
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          gsap.to(path, { attr: { d: contour }, duration: .95, ease: 'power3.inOut' })
          gsap.fromTo(frame.querySelector('img'),
            { clipPath: 'ellipse(20% 26% at 52% 45%)', scale: 1.18, rotation: -5, opacity: .65 },
            { clipPath: 'ellipse(80% 85% at 52% 45%)', scale: 1, rotation: 0, opacity: 1, duration: .9, ease: 'power3.out', clearProps: 'clipPath,transform,opacity' })
        }, frame)
        return () => context.revert()
      })
      dispose = () => media.revert()
    }).catch(() => { if (!cancelled) path.setAttribute('d', contour) })
    return () => {
      cancelled = true
      currentContour.current = path.getAttribute('d') ?? contour
      dispose()
      path.setAttribute('d', currentContour.current)
    }
  }, [active?.slug])

  return <section className="face-focus" id="dich-vu" aria-labelledby={`${id}-heading`}>
    <svg className="face-focus__clip-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs><clipPath id={clipId} clipPathUnits="objectBoundingBox"><path ref={shape} d={contours[0]} /></clipPath></defs></svg>
    <div className="face-focus__layout">
      {active && <div className="face-focus__portrait" ref={imageFrame} style={{ clipPath: `url(#${clipId})` }}>
        <img key={active.slug} src={`/images/${active.image}.webp`} alt={active.service.imageAlt} width="1024" height="1280" loading="lazy" />
        <span className="face-focus__image-note" aria-hidden="true">AZ FACE</span>
      </div>}
      <div className="face-focus__content">
        <h2 id={`${id}-heading`}>{en ? 'What would you like to focus on?' : 'Bạn muốn chăm chút điều gì?'}</h2>
        {active ? <>
          <div className="face-focus__choices" role="group" aria-label={en ? 'Choose your area of interest' : 'Chọn nhu cầu chăm sóc'}>
            {choices.map((choice, index) => {
              const enabled = available.some(item => item.slug === choice.slug)
              return <button key={choice.slug} type="button" disabled={!enabled} aria-pressed={active.slug === choice.slug} aria-controls={`${id}-detail`} onClick={() => setSelected(choice.slug)}>
                <span>{labels[index]}</span><ArrowIcon />
              </button>
            })}
          </div>
          <div className="face-focus__detail" id={`${id}-detail`} aria-live="polite">
            {available.map(choice => <div className="face-focus__detail-panel" key={choice.slug} data-active={choice.slug === active.slug} aria-hidden={choice.slug !== active.slug} inert={choice.slug !== active.slug}>
              <div><h3>{choice.service.title}</h3><p>{choice.service.summary}</p></div>
              <div className="face-focus__actions"><Link className="face-focus__primary" href={`/dich-vu/${choice.slug}`}>{en ? 'Explore this service' : 'Tìm hiểu dịch vụ'} <ArrowIcon /></Link><Link className="face-focus__contact" href={`/lien-he?nhu-cau=${encodeURIComponent(choice.slug)}`}>{en ? 'Discuss this option' : 'Tư vấn nhu cầu này'} <ArrowIcon /></Link></div>
            </div>)}
          </div>
        </> : <div className="face-focus__empty"><p>{en ? 'Our service information is being updated.' : 'Danh mục dịch vụ đang được cập nhật.'}</p><Link className="face-focus__primary" href="/lien-he">{en ? 'Discuss your needs' : 'Trao đổi nhu cầu'} <ArrowIcon /></Link></div>}
      </div>
    </div>
  </section>
}
