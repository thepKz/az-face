'use client'

import { useEffect, useRef } from 'react'
import { useLocale } from 'next-intl'
import Link from '@/i18n/Link'
import type { PublicPost } from '@/lib/cms'
import { ArrowIcon } from './Icons'
import { CollageArt } from './CollageArt'
import './immersive-editorial.css'
import './editorial-stage.css'

const photographs = [
  { image: 'edition-collection-skin', vi: 'Làn da', en: 'Skin' },
  { image: 'edition-collection-brow-detail', vi: 'Đường nét', en: 'Details' },
  { image: 'edition-collection-brows', vi: 'Dáng mày', en: 'Brows' },
  { image: 'edition-collection-rest', vi: 'Thần thái', en: 'Expression' },
]

export function ImmersiveEditorial({ posts }: { posts: PublicPost[] }) {
  const root = useRef<HTMLDivElement>(null)
  const english = useLocale() === 'en'
  useEffect(() => {
    let cancelled = false
    let dispose = () => {}
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !root.current) return
      gsap.registerPlugin(ScrollTrigger)
      const media = gsap.matchMedia()
      media.add({ desktop: '(min-width: 900px)', mobile: '(max-width: 899px)', motion: '(prefers-reduced-motion: no-preference)' }, match => {
        if (!match.conditions?.motion) return
        const desktop = match.conditions.desktop
        const context = gsap.context(() => {
          const frames = root.current!.querySelectorAll<HTMLElement>('.im-editorial-photo')
          const offsets = desktop
            ? [{ x: 116, y: 18, r: -28 }, { x: 36, y: 10, r: -13 }, { x: -42, y: 18, r: 14 }, { x: -122, y: 8, r: 29 }]
            : [{ x: 35, y: 20, r: -18 }, { x: -35, y: 18, r: 17 }, { x: -28, y: -14, r: 15 }, { x: 28, y: -18, r: -16 }]
          const restingAngles = desktop ? [-10, -4, 5, 11] : [-4, 4, 3, -3]
          // One photographic fan opens across the stage; labels move with their own print.
          const scene = gsap.timeline({ scrollTrigger: {
            id: 'az-gallery-assemble',
            trigger: root.current!.querySelector('.im-editorial-sheet'),
            start: desktop ? 'center center' : 'top 88%',
            end: desktop ? () => `+=${Math.round(window.innerHeight * .7)}` : 'bottom 45%',
            pin: Boolean(desktop && window.innerHeight >= 650), pinSpacing: true, scrub: .8, refreshPriority: 10,
            invalidateOnRefresh: true,
          } })
          frames.forEach((frame, index) => {
            const offset = offsets[index]
            scene.fromTo(frame,
              { xPercent: offset.x, yPercent: offset.y, rotation: offset.r, rotateY: desktop ? (index % 2 ? -48 : 48) : 0, scale: desktop ? .72 : .84 },
              { xPercent: 0, yPercent: 0, rotation: restingAngles[index], rotateY: 0, scale: 1, ease: 'power2.inOut', duration: 1 }, index * .07)
            scene.fromTo(frame.querySelector('img'), { scale: 1.2, yPercent: index % 2 ? -5 : 5 }, { scale: 1, yPercent: 0, ease: 'none', duration: 1.2 }, index * .07)
          })
          root.current!.querySelectorAll<HTMLElement>('.im-editorial-stories article').forEach((article, index) => {
            const sheet = gsap.timeline({ scrollTrigger: { id: `az-journal-sheet-${index + 1}`, trigger: article, start: 'top 95%', end: 'top 20%', scrub: .65 } })
            sheet.fromTo(article.querySelector('.im-editorial-thumb'), { clipPath: 'inset(0% 48% 0% 48% round 45%)', rotationY: desktop ? -42 : 0 }, { clipPath: 'inset(0% 0% 0% 0% round 0%)', rotationY: 0, duration: 1, ease: 'power2.inOut' }, 0)
              .fromTo(article.querySelector('img'), { scale: 1.35, xPercent: index % 2 ? 12 : -12 }, { scale: 1, xPercent: 0, duration: 1, ease: 'power2.out' }, 0)
              .fromTo(article.querySelector('.im-editorial-story-copy'), { x: desktop ? 60 : 0, y: desktop ? 0 : 20 }, { x: 0, y: 0, duration: .8, ease: 'power2.out' }, .15)
            if (desktop && index < 2) gsap.to(article, { scale: .94, rotation: index % 2 ? 2 : -2, transformOrigin: '50% 0%', ease: 'none', scrollTrigger: { id: `az-journal-stack-${index}`, trigger: article.nextElementSibling, start: 'top 85%', end: 'top 24%', scrub: .6 } })
          })
        }, root)
        return () => context.revert()
      })
      dispose = () => media.revert()
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh() })
    }).catch(() => { /* The composed photographs remain visible if motion cannot load. */ })
    return () => { cancelled = true; dispose() }
  }, [])

  return <div ref={root} className="im-editorial">
    <section className="im-editorial-gallery collage-host" aria-labelledby="im-gallery-title">
      <CollageArt variant="bloom" />
      <div className="im-editorial-heading"><h2 id="im-gallery-title">{english ? 'Beauty, from every angle.' : 'Đẹp trong từng góc nhìn.'}</h2><p>{english ? 'A closer look at skin, brows and the details that make a face your own.' : 'Nhìn gần hơn vào làn da, dáng mày và những chi tiết làm nên nét riêng của gương mặt.'}</p></div>
      <div className="im-editorial-sheet">{photographs.map((photo, index) => <figure className={`im-editorial-photo im-editorial-photo--${index + 1}`} key={photo.image}><img src={`/images/${photo.image}.webp`} alt={english ? photo.en : photo.vi} width="800" height="1000" loading="lazy" /><figcaption>{english ? photo.en : photo.vi}</figcaption></figure>)}</div>
      <div className="im-editorial-gallery-bottom"><span>{english ? 'AZ FACE — Illustrative imagery' : 'AZ FACE — Hình ảnh minh họa'}</span><Link href="/bo-suu-tap" className="im-editorial-link">{english ? 'Explore the collection' : 'Khám phá bộ sưu tập'}<ArrowIcon /></Link></div>
    </section>
    <section className="im-editorial-journal collage-host" aria-labelledby="im-journal-title">
      <div className="im-editorial-material" aria-hidden="true"><img src="/images/elements/teal-silk.webp" alt="" width="1000" height="1000" loading="lazy" /><img src="/images/elements/champagne-petal.webp" alt="" width="1000" height="1000" loading="lazy" /></div>
      <header><h2 id="im-journal-title">{english ? 'Understand your options.' : 'Hiểu trước khi chọn.'}</h2><Link className="im-editorial-link" href="/kien-thuc">{english ? 'All articles' : 'Tất cả bài viết'}<ArrowIcon /></Link></header>
      {posts.length ? <div className="im-editorial-stories">{posts.slice(0, 3).map(post => <article key={post.slug}><Link href={`/kien-thuc/${post.slug}`} className="im-editorial-story"><div className="im-editorial-thumb"><img src={post.image} alt="" width="360" height="240" loading="lazy" /></div><div className="im-editorial-story-copy"><div className="im-editorial-meta"><span>{post.category}</span><span>{post.readTime}</span></div><h3>{post.title}</h3><p>{post.excerpt}</p></div><span className="im-editorial-read"><span>{english ? 'Read article' : 'Đọc bài viết'}</span><ArrowIcon /></span></Link></article>)}</div> : <p>{english ? 'New articles are being prepared. Explore our services while you wait.' : 'Bài viết mới đang được chuẩn bị. Bạn có thể tìm hiểu dịch vụ trong lúc này.'}</p>}
    </section>
  </div>
}
