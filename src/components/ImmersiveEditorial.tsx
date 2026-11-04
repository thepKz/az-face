'use client'

import { useEffect, useRef } from 'react'
import { useLocale } from 'next-intl'
import Link from '@/i18n/Link'
import type { PublicPost } from '@/lib/cms'
import { ArrowIcon } from './Icons'
import './immersive-editorial.css'

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
      const context = gsap.context(() => {
        const media = gsap.matchMedia()
        media.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
          const frames = root.current!.querySelectorAll<HTMLElement>('.im-editorial-photo')
          const offsets = [{ x: -30, y: 36, r: -13 }, { x: -12, y: -28, r: 9 }, { x: 18, y: 30, r: -8 }, { x: 32, y: -22, r: 12 }]
          const scene = gsap.timeline({ scrollTrigger: { trigger: root.current!.querySelector('.im-editorial-sheet'), start: 'top 88%', once: true } })
          frames.forEach((frame, index) => {
            const offset = offsets[index]
            scene.fromTo(frame, { xPercent: offset.x, yPercent: offset.y, rotation: offset.r, rotateY: index % 2 ? -12 : 12, scale: .82, clipPath: 'inset(7% 4% 7% 4%)' }, { xPercent: 0, yPercent: 0, rotation: 0, rotateY: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: 'power3.out', duration: 1 }, index * .06)
          })
        })
      }, root)
      dispose = () => context.revert()
    }).catch(() => { /* The composed photographs remain visible if motion cannot load. */ })
    return () => { cancelled = true; dispose() }
  }, [])

  return <div ref={root} className="im-editorial">
    <section className="im-editorial-gallery" aria-labelledby="im-gallery-title">
      <div className="im-editorial-heading"><h2 id="im-gallery-title">{english ? 'Beauty, from every angle.' : 'Đẹp trong từng góc nhìn.'}</h2><p>{english ? 'A closer look at skin, brows and the details that make a face your own.' : 'Nhìn gần hơn vào làn da, dáng mày và những chi tiết làm nên nét riêng của gương mặt.'}</p></div>
      <div className="im-editorial-sheet">{photographs.map((photo, index) => <figure className={`im-editorial-photo im-editorial-photo--${index + 1}`} key={photo.image}><img src={`/images/${photo.image}.webp`} alt={english ? photo.en : photo.vi} width="800" height="1000" loading="lazy" /><figcaption>{english ? photo.en : photo.vi}</figcaption></figure>)}</div>
      <div className="im-editorial-gallery-bottom"><span>{english ? 'AZ FACE — Illustrative imagery' : 'AZ FACE — Hình ảnh minh họa'}</span><Link href="/bo-suu-tap" className="im-editorial-link">{english ? 'Explore the collection' : 'Khám phá bộ sưu tập'}<ArrowIcon /></Link></div>
    </section>
    <section className="im-editorial-journal" aria-labelledby="im-journal-title">
      <header><h2 id="im-journal-title">{english ? 'Understand your options.' : 'Hiểu trước khi chọn.'}</h2><Link className="im-editorial-link" href="/kien-thuc">{english ? 'All articles' : 'Tất cả bài viết'}<ArrowIcon /></Link></header>
      {posts.length ? <div className="im-editorial-stories">{posts.slice(0, 3).map(post => <article key={post.slug}><Link href={`/kien-thuc/${post.slug}`} className="im-editorial-story"><div className="im-editorial-thumb"><img src={post.image} alt="" width="360" height="240" loading="lazy" /></div><div className="im-editorial-story-copy"><div className="im-editorial-meta"><span>{post.category}</span><span>{post.readTime}</span></div><h3>{post.title}</h3><p>{post.excerpt}</p></div><span className="im-editorial-read"><span>{english ? 'Read article' : 'Đọc bài viết'}</span><ArrowIcon /></span></Link></article>)}</div> : <p>{english ? 'New articles are being prepared. Explore our services while you wait.' : 'Bài viết mới đang được chuẩn bị. Bạn có thể tìm hiểu dịch vụ trong lúc này.'}</p>}
    </section>
  </div>
}
