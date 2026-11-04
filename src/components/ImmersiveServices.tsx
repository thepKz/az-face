'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import Link from '@/i18n/Link'
import type { Service } from '@/content/site'
import { ArrowIcon } from './Icons'
import './immersive-services.css'

const chapters = [
  { slug: 'cham-soc-da-mat', image: 'campaign-gallery-skin-main', vi: 'Làn da.', en: 'Your skin.', labelVi: 'Làn da', labelEn: 'Skin', tone: 'forest', altVi: 'Chân dung minh họa người trưởng thành với làn da tự nhiên dưới nắng dịu', altEn: 'Illustrative portrait of an adult with natural skin in soft sunlight' },
  { slug: 'cham-soc-da-chuyen-sau', image: 'campaign-gallery-ritual-main', vi: 'Chuyên sâu.', en: 'A closer look.', labelVi: 'Chuyên sâu', labelEn: 'In depth', tone: 'celadon', altVi: 'Khoảnh khắc thư giãn với khăn ấm, hình ảnh minh họa', altEn: 'Illustrative moment of rest with a warm towel' },
  { slug: 'dang-may-va-sac-moi', image: 'campaign-gallery-brows-main', vi: 'Mày & môi.', en: 'Brows & lips.', labelVi: 'Mày & môi', labelEn: 'Brows & lips', tone: 'ivory', altVi: 'Chân dung minh họa với đường chân mày tự nhiên và sắc môi trầm', altEn: 'Illustrative portrait with natural brows and a muted lip colour' },
]

export function ImmersiveServices({ services }: { services: Service[] }) {
  const en = useLocale() === 'en'
  const root = useRef<HTMLElement>(null)
  const jump = useRef<((index: number, immediate?: boolean) => void) | null>(null)
  const [current, setCurrent] = useState(0)
  const available = chapters.flatMap(chapter => {
    const service = services.find(item => item.slug === chapter.slug)
    return service ? [{ ...chapter, service }] : []
  })
  const chapterKey = available.map(chapter => chapter.slug).join(',')

  useEffect(() => {
    const section = root.current
    const stage = section?.querySelector<HTMLElement>('.immersive-services__stage')
    const track = section?.querySelector<HTMLElement>('.immersive-services__track')
    if (!section || !stage || !track || available.length < 2) return
    let cancelled = false
    let dispose = () => {}

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const media = gsap.matchMedia()
      media.add('(min-width: 1001px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)', () => {
        const header = document.querySelector<HTMLElement>('.az-header')
        const setHeaderHeight = () => section.style.setProperty('--services-header-height', `${header?.offsetHeight ?? 112}px`)
        setHeaderHeight()
        section.dataset.enhanced = 'true'
        section.style.setProperty('--services-chapters', String(available.length))
        let scroll: ReturnType<typeof ScrollTrigger.create> | undefined
        const context = gsap.context(() => {
          const movement = gsap.to(track, {
            xPercent: -(available.length - 1) * 100,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: () => `top top+=${header?.offsetHeight ?? 112}`,
              end: () => `+=${section.offsetHeight - stage.offsetHeight}`,
              scrub: .45,
              invalidateOnRefresh: true,
              onUpdate(self) {
                const index = Math.round(self.progress * (available.length - 1))
                setCurrent(previous => previous === index ? previous : index)
              },
            },
          })
          scroll = movement.scrollTrigger
        }, section)
        jump.current = (index, immediate = false) => {
          if (!scroll) return
          const progress = index / (available.length - 1)
          window.scrollTo({ top: scroll.start + progress * (scroll.end - scroll.start), behavior: immediate ? 'instant' : 'smooth' })
          if (immediate) {
            // Tab navigation brings its destination on screen before the focused CTA is used.
            ScrollTrigger.update()
            scroll.getTween()?.progress(1)
            scroll.animation?.progress(progress)
          }
        }
        const focusPanel = (event: FocusEvent) => {
          const panel = (event.target as HTMLElement).closest<HTMLElement>('[data-service-chapter]')
          if (panel) jump.current?.(Number(panel.dataset.serviceChapter), true)
        }
        section.addEventListener('focusin', focusPanel)
        const resize = new ResizeObserver(() => { setHeaderHeight(); ScrollTrigger.refresh() })
        if (header) resize.observe(header)
        ScrollTrigger.refresh()
        return () => {
          resize.disconnect()
          section.removeEventListener('focusin', focusPanel)
          jump.current = null
          context.revert()
          delete section.dataset.enhanced
          section.style.removeProperty('--services-header-height')
          section.style.removeProperty('--services-chapters')
        }
      })
      media.add('(max-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          section.querySelectorAll<HTMLElement>('.immersive-services__picture').forEach(picture => {
            gsap.fromTo(picture, { clipPath: 'inset(0 18% 0 0)' }, {
              clipPath: 'inset(0 0% 0 0)', duration: .9, ease: 'power3.out', clearProps: 'clipPath',
              scrollTrigger: { trigger: picture, start: 'top 88%', once: true },
            })
          })
        }, section)
        return () => context.revert()
      })
      dispose = () => media.revert()
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh() })
    }).catch(() => { /* Without motion, all service chapters remain in normal reading order. */ })
    return () => { cancelled = true; dispose() }
  }, [chapterKey, available.length])

  return <section className="immersive-services" id="dich-vu" ref={root} aria-labelledby="immersive-services-title">
    <div className="immersive-services__stage">
      <header className="immersive-services__heading">
        <h2 id="immersive-services-title">{en ? 'What matters to you?' : 'Bạn muốn chăm chút điều gì?'}</h2>
        <nav className="immersive-services__navigation" aria-label={en ? 'Explore service chapters' : 'Khám phá từng nhóm dịch vụ'}>
          {available.map((chapter, index) => <a key={chapter.slug} href={`#home-service-${chapter.slug}`} aria-current={current === index ? 'location' : undefined} onClick={event => {
            if (jump.current) { event.preventDefault(); jump.current(index) }
            setCurrent(index)
          }}><span>{en ? chapter.labelEn : chapter.labelVi}</span><ArrowIcon /></a>)}
        </nav>
      </header>
      {available.length ? <div className="immersive-services__viewport">
        <div className="immersive-services__track">
          {available.map((chapter, index) => <article key={chapter.slug} className={`immersive-services__chapter immersive-services__chapter--${chapter.tone}`} id={`home-service-${chapter.slug}`} data-service-chapter={index}>
            <figure className="immersive-services__picture"><img src={`/images/${chapter.image}.webp`} alt={en ? chapter.altEn : chapter.altVi} width="1024" height="1280" loading="lazy" /></figure>
            <div className="immersive-services__copy">
              <h3>{en ? chapter.en : chapter.vi}</h3>
              <p>{chapter.service.summary}</p>
              <Link href={`/dich-vu/${chapter.slug}`} className="immersive-services__link"><span>{en ? 'Explore this service' : 'Tìm hiểu dịch vụ'}</span><ArrowIcon /></Link>
            </div>
            <span className="immersive-services__running-word" aria-hidden="true">{en ? chapter.labelEn : chapter.labelVi}</span>
          </article>)}
        </div>
      </div> : <div className="immersive-services__empty"><p>{en ? 'Our service information is being updated.' : 'Thông tin dịch vụ đang được cập nhật.'}</p><Link href="/lien-he">{en ? 'Discuss your needs' : 'Trao đổi nhu cầu'} <ArrowIcon /></Link></div>}
    </div>
  </section>
}
