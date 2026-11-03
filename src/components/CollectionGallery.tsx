'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowIcon } from './Icons'

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
  const [filter, setFilter] = useState('Tất cả')
  const [selected, setSelected] = useState<number | null>(null)
  const grid = useRef<HTMLDivElement>(null)
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
    import('gsap').then(({ gsap }) => {
      if (cancelled || !grid.current) return
      motionEngine.current = gsap
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          gsap.from('.collection-photo', { y: 30, rotation: index => index % 2 ? 2 : -2, opacity: .4, stagger: .07, duration: .75, ease: 'power3.out', clearProps: 'transform,opacity' })
          gsap.from('.collection-photo img', { scale: 1.08, duration: 1, ease: 'power3.out', clearProps: 'transform' })
        }, grid)
        return () => context.revert()
      })
      cleanup = () => media.revert()
    }).catch(() => {})
    return () => { cancelled = true; cleanup() }
  }, [filter])

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

  return <section className="page-width collection-gallery" aria-label="Thư viện ảnh">
    <fieldset className="collection-filters"><legend className="sr-only">Chọn chủ đề ảnh</legend>{filters.map(value => <label key={value}><input type="radio" name="collection-filter" value={value} checked={filter === value} onChange={() => setFilter(value)} /><span>{value}</span></label>)}</fieldset>
    <p className="collection-count" aria-live="polite">{visible.length} góc nhìn</p>
    <div className="collection-grid" ref={grid}>{visible.map(photo => <figure className="collection-photo" key={photo.src}><button aria-label={`Xem ảnh: ${photo.title}`} onClick={event => open(photographs.indexOf(photo), event.currentTarget)}><img src={`/images/${photo.src}.webp`} width="1024" height="1280" alt={photo.alt} loading="lazy" /><span className="collection-photo__open" aria-hidden="true"><ArrowIcon /></span></button><figcaption><span>{photo.title}</span><small>{photo.category}</small></figcaption></figure>)}</div>
    <dialog className="collection-lightbox" ref={dialog} aria-label="Xem ảnh bộ sưu tập" onClose={() => { closingTween.current?.kill(); closingTween.current = null; setSelected(null); trigger.current?.focus() }} onClick={event => { if (event.target === event.currentTarget) close() }} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); navigate(1) } if (event.key === 'ArrowLeft') { event.preventDefault(); navigate(-1) } }}>
      <button className="collection-lightbox__close" onClick={close} autoFocus>Đóng ×</button>
      {selected !== null && <figure key={selected}><div className="collection-lightbox__art"><img src={`/images/${photographs[selected].src}.webp`} alt={photographs[selected].alt} width="1024" height="1280" /></div><figcaption aria-live="polite">{photographs[selected].title}</figcaption></figure>}
      <div className="collection-lightbox__controls"><button onClick={() => navigate(-1)} aria-label="Ảnh trước">←</button><span>{selected === null ? 0 : visibleIndexes.indexOf(selected) + 1} / {visible.length}</span><button onClick={() => navigate(1)} aria-label="Ảnh tiếp theo">→</button></div>
    </dialog>
  </section>
}
