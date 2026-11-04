'use client'

import { pageText } from '@/i18n/page-messages'
import { useLocale } from 'next-intl'

import { useEffect, useRef, useState } from 'react'
import { ArrowIcon } from './Icons'
import { CollageArt } from './CollageArt'
import './collection-gallery-motion.css'
import './collection-cinematic.css'

const photographs = [
  { src: 'edition-collection-skin', title: 'Làn da dưới nắng', category: 'Làn da', alt: 'Chân dung với làn da tự nhiên trong ánh sáng mềm' },
  { src: 'journey-gallery-fabric', title: 'Chuyển động của lụa', category: 'Cảm hứng', alt: 'Nếp vải mềm trong bảng màu xanh và kem' },
  { src: 'edition-collection-brows', title: 'Một nét riêng', category: 'Đường nét', alt: 'Chân dung cận với đường chân mày tự nhiên' },
  { src: 'edition-collection-rest', title: 'Dành cho chính mình', category: 'Cảm hứng', alt: 'Khoảnh khắc chăm sóc nhẹ nhàng' },
  { src: 'edition-collection-brow-detail', title: 'Góc nhìn gần', category: 'Đường nét', alt: 'Chi tiết đường chân mày trong ánh sáng ban ngày' },
  { src: 'journey-gallery-texture', title: 'Mềm như ánh sáng', category: 'Làn da', alt: 'Kết cấu kem chăm sóc trên bề mặt sáng' },
]
const filters = ['Tất cả', 'Làn da', 'Đường nét', 'Cảm hứng']

export function CollectionGallery() {
  const locale = useLocale()
  const t = pageText(locale)

  const [filter, setFilter] = useState('Tất cả')
  const [selected, setSelected] = useState<number | null>(null)
  const grid = useRef<HTMLDivElement>(null)
  const controls = useRef<HTMLFieldSetElement>(null)
  const previousPositions = useRef<Map<string, DOMRect>>(new Map())
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement | null>(null)
  const openingRect = useRef<DOMRect | null>(null)
  const slideDirection = useRef(1)
  const openedIndex = useRef<number | null>(null)
  const motionEngine = useRef<typeof import('gsap').gsap | null>(null)
  const closingTween = useRef<{ kill: () => void } | null>(null)
  const visible = photographs.filter(photo => filter === 'Tất cả' || photo.category === filter)
  const visibleIndexes = visible.map(photo => photographs.indexOf(photo))
  useEffect(() => {
    let cancelled = false
    let cleanup = () => {}
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          const intro = document.querySelector('.collection-intro')
          if (!intro) return
          const images = intro.querySelectorAll('.collection-intro__composition img')
          const mobile = window.matchMedia('(max-width: 760px)').matches
          const sequence = gsap.timeline({ scrollTrigger: { id: 'collection-aperture-sweep', trigger: intro, start: 'top 75%', end: 'bottom 20%', scrub: .8 } })
          images.forEach((image, index) => {
            sequence.fromTo(image, {
              clipPath: index ? 'inset(90% 0% 0% 0% round 45% 45% 4% 4%)' : 'ellipse(10% 46% at 50% 50%)',
              rotation: index ? 22 : -20, xPercent: index ? -18 : 18, scale: .8,
            }, {
              clipPath: index ? 'inset(0% 0% 0% 0% round 45% 45% 4% 4%)' : 'ellipse(70% 72% at 50% 50%)',
              rotation: index ? 5 : -5, xPercent: 0, scale: 1,
              duration: 1, ease: 'power2.inOut',
            }, index * .22)
            sequence.to(image, { yPercent: index ? (mobile ? -7 : -18) : (mobile ? 5 : 12), duration: .65, ease: 'none' }, .8)
          })
        })
        return () => context.revert()
      })
      cleanup = () => media.revert()
    }).catch(() => {})
    return () => { cancelled = true; cleanup() }
  }, [])
  useEffect(() => {
    let cancelled = false
    let cleanup = () => {}
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !grid.current) return
      gsap.registerPlugin(ScrollTrigger)
      motionEngine.current = gsap
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          const positions = previousPositions.current
          const photos = Array.from(grid.current!.querySelectorAll<HTMLElement>('[data-collection-photo]'))
          // Surviving photographs retain their visual position before settling into the new selection.
          photos.forEach((photo, index) => {
            const before = positions.get(photo.dataset.collectionPhoto || '')
            const after = photo.getBoundingClientRect()
            if (before) {
              gsap.fromTo(photo, { x: before.left - after.left, y: before.top - after.top }, {
                x: 0, y: 0, duration: .42, ease: 'power3.out', clearProps: 'transform',
              })
            } else {
              gsap.fromTo(photo, { opacity: .35 }, { opacity: 1, duration: .32, delay: Math.min(index * .035, .14), clearProps: 'opacity' })
              gsap.fromTo(photo.querySelector('img'), { scale: 1.045 }, { scale: 1, duration: .5, ease: 'power3.out', clearProps: 'transform' })
            }
            // The button owns the scroll fan; figure transforms remain reserved for filter FLIP.
            if (positions.size === 0) {
              const button = photo.querySelector('button')
              const mobile = window.matchMedia('(max-width: 760px)').matches
              gsap.fromTo(button, {
                rotation: (index % 2 ? 1 : -1) * (mobile ? 7 : 16),
                y: mobile ? 44 : 110, scale: .8,
                clipPath: 'inset(0% 0% 65% 0% round 42% 42% 4% 4%)',
              }, {
                rotation: 0, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 0%)', ease: 'power2.out',
                scrollTrigger: { id: `collection-fan-${index}`, trigger: photo, start: 'top 98%', end: 'top 55%', scrub: .6 },
              })
            }
          })
        }, grid)
        return () => context.revert()
      })
      cleanup = () => media.revert()
    }).catch(() => {})
    return () => { cancelled = true; cleanup() }
  }, [filter])

  useEffect(() => {
    const fieldset = controls.current
    if (!fieldset) return
    const indicator = fieldset.querySelector<HTMLElement>('[data-filter-indicator]')
    const selectedLabel = fieldset.querySelector<HTMLInputElement>('input:checked')?.parentElement
    if (!indicator || !selectedLabel) return
    let cancelled = false
    let cleanup = () => {}
    import('gsap').then(({ gsap }) => {
      if (cancelled) return
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const position = (animate: boolean) => {
          const from = fieldset.getBoundingClientRect()
          const to = selectedLabel.getBoundingClientRect()
          gsap.to(indicator, { x: to.left - from.left, y: to.bottom - from.top - 1, scaleX: to.width, duration: animate ? .28 : 0, ease: 'power3.out', overwrite: true })
        }
        const wasReady = indicator.style.transform !== ''
        fieldset.dataset.motionReady = 'true'
        position(wasReady)
        let measuredWidth = fieldset.getBoundingClientRect().width
        const observer = new ResizeObserver(() => {
          const width = fieldset.getBoundingClientRect().width
          if (Math.abs(width - measuredWidth) > .5) { measuredWidth = width; position(false) }
        })
        observer.observe(fieldset)
        return () => { observer.disconnect(); gsap.killTweensOf(indicator); delete fieldset.dataset.motionReady }
      })
      cleanup = () => media.revert()
    }).catch(() => {})
    return () => { cancelled = true; cleanup() }
  }, [filter])

  const changeFilter = (value: string) => {
    previousPositions.current = new Map(Array.from(grid.current?.querySelectorAll<HTMLElement>('[data-collection-photo]') || []).map(photo => [photo.dataset.collectionPhoto || '', photo.getBoundingClientRect()]))
    setFilter(value)
  }

  useEffect(() => () => { closingTween.current?.kill() }, [])

  useEffect(() => {
    if (selected === null) return
    let cancelled = false
    let cleanup = () => {}
    const picture = dialog.current?.querySelector<HTMLImageElement>('figure img')
    if (!picture) return
    Promise.all([import('gsap'), picture.decode().catch(() => {})]).then(([{ gsap }]) => {
      if (cancelled || closingTween.current || !picture.naturalWidth) return
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          const from = openingRect.current
          openingRect.current = null
          if (from) {
            const to = picture.getBoundingClientRect()
            gsap.from(picture, { x: from.left - to.left, y: from.top - to.top, scaleX: from.width / to.width, scaleY: from.height / to.height, transformOrigin: 'top left', borderRadius: '22px', duration: .55, ease: 'power3.inOut', clearProps: 'transform,transformOrigin,borderRadius' })
          } else {
            gsap.from(picture, { x: slideDirection.current * 24, clipPath: slideDirection.current > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)', duration: .45, ease: 'power3.out', clearProps: 'transform,clipPath' })
          }
        })
        return () => context.revert()
      })
      cleanup = () => media.revert()
    }).catch(() => {})
    return () => { cancelled = true; cleanup() }
  }, [selected])

  const open = (index: number, button: HTMLButtonElement) => {
    trigger.current = button
    openingRect.current = button.getBoundingClientRect()
    openedIndex.current = index
    setSelected(index)
    dialog.current?.showModal()
  }
  const close = () => {
    const picture = dialog.current?.querySelector<HTMLImageElement>('figure img')
    const gsap = motionEngine.current
    if (!picture || !gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches || closingTween.current) {
      dialog.current?.close()
      return
    }
    gsap.killTweensOf(picture)
    gsap.set(picture, { clearProps: 'transform,clipPath' })
    const target = trigger.current?.getBoundingClientRect()
    const current = picture.getBoundingClientRect()
    const returnToSource = selected === openedIndex.current && target && target.top >= 0 && target.bottom <= innerHeight
    closingTween.current = gsap.to(picture, returnToSource ? {
      x: target.left - current.left, y: target.top - current.top,
      scaleX: target.width / current.width, scaleY: target.height / current.height,
      transformOrigin: 'top left', opacity: .3, duration: .32, ease: 'power3.inOut', onComplete: () => dialog.current?.close(),
    } : { opacity: 0, duration: .16, onComplete: () => dialog.current?.close() })
  }
  const navigate = (step: number) => {
    closingTween.current?.kill()
    closingTween.current = null
    openingRect.current = null
    slideDirection.current = step
    setSelected(current => current === null ? visibleIndexes[0] : visibleIndexes[(visibleIndexes.indexOf(current) + step + visibleIndexes.length) % visibleIndexes.length])
  }

  return <section className="page-width collection-gallery collage-host" aria-label={t("Thư viện ảnh")}><CollageArt variant="ribbon" />
    <fieldset className="collection-filters" ref={controls}><legend className="sr-only">{t("Chọn chủ đề ảnh")}</legend>{filters.map(value => <label key={value}><input type="radio" name="collection-filter" value={value} checked={filter === value} onChange={() => changeFilter(value)} /><span>{t(value)}</span></label>)}<span className="collection-filter-indicator" data-filter-indicator aria-hidden="true" /></fieldset>
    <p className="collection-count" aria-live="polite">{visible.length} {t("góc nhìn")}</p>
    <div className="collection-grid" ref={grid}>{visible.map(photo => <figure className="collection-photo" key={photo.src} data-collection-photo={photo.src}><button aria-label={`${t('Xem ảnh:')} ${t(photo.title)}`} onClick={event => open(photographs.indexOf(photo), event.currentTarget)}><img src={`/images/${photo.src}.webp`} width="1024" height="1280" alt={t(photo.alt)} loading="lazy" /><span className="collection-photo__open" aria-hidden="true"><ArrowIcon /></span></button><figcaption><span>{t(photo.title)}</span><small>{t(photo.category)}</small></figcaption></figure>)}</div>
    <dialog className="collection-lightbox" ref={dialog} aria-label={t("Xem ảnh bộ sưu tập")} onClose={() => { closingTween.current?.kill(); closingTween.current = null; setSelected(null); trigger.current?.focus() }} onClick={event => { if (event.target === event.currentTarget) close() }} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); navigate(1) } if (event.key === 'ArrowLeft') { event.preventDefault(); navigate(-1) } }}>
      <button className="collection-lightbox__close" onClick={close} autoFocus>{t("Đóng ×")}</button>
      {selected !== null && <figure key={selected}><div className="collection-lightbox__art"><img src={`/images/${photographs[selected].src}.webp`} alt={t(photographs[selected].alt)} width="1024" height="1280" /></div><figcaption aria-live="polite">{t(photographs[selected].title)}</figcaption></figure>}
      <div className="collection-lightbox__controls"><button onClick={() => navigate(-1)} aria-label={t("Ảnh trước")}>←</button><span>{selected === null ? 0 : visibleIndexes.indexOf(selected) + 1} / {visible.length}</span><button onClick={() => navigate(1)} aria-label={t("Ảnh tiếp theo")}>→</button></div>
    </dialog>
  </section>
}
