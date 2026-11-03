'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ArrowIcon } from './Icons'
import { ContourCanvas } from './ContourCanvas'
import './identity-hero.css'

export function IdentityHero() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    let cancelled = false
    let dispose = () => {}
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !root.current) return
      gsap.registerPlugin(ScrollTrigger)
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          gsap.timeline({ defaults: { ease: 'expo.out' } })
            .from('.identity-hero__portrait', { clipPath: 'inset(0 48% 0 48%)', duration: 1.3, clearProps: 'clipPath' })
            .from('.identity-hero h1', { y: 28, opacity: .55, duration: 1.05, clearProps: 'transform,opacity' }, .08)
            .from('.identity-hero__detail', { rotation: -9, y: 30, opacity: .3, duration: 1.2, clearProps: 'transform,opacity' }, .25)
          // Entrance owns the frame; scroll owns only the image and the inset wrapper.
          gsap.fromTo('.identity-hero__portrait img', { scale: 1.09, yPercent: -2 }, {
            scale: 1, yPercent: 3, ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
          })
          gsap.to('.identity-hero__detail-wrap', { yPercent: -20, rotation: 5, ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
          })
        }, root)
        return () => context.revert()
      })
      dispose = () => media.revert()
    }).catch(() => { /* The complete composition is visible without animation. */ })
    return () => { cancelled = true; dispose() }
  }, [])

  return <section className="identity-hero" aria-labelledby="identity-title" ref={root}>
    <div className="identity-hero__stage">
      <ContourCanvas className="identity-hero__contours" />
      <h1 id="identity-title">Đẹp hơn. <em>Vẫn là bạn.</em></h1>
      <figure className="identity-hero__portrait">
        <img src="/images/campaign-hero-main.webp" alt="Chân dung minh họa vẻ đẹp tự nhiên của người phụ nữ trưởng thành" width="1600" height="1067" fetchPriority="high" />
      </figure>
      <div className="identity-hero__detail-wrap" aria-hidden="true"><figure className="identity-hero__detail"><img src="/images/campaign-hero-detail.webp" alt="" width="1000" height="1000" /><figcaption>Nét riêng của bạn.</figcaption></figure></div>
      <span className="identity-hero__signature" aria-hidden="true">AZ FACE</span>
    </div>
    <div className="identity-hero__action">
      <p><strong>Thẩm mỹ khuôn mặt</strong> bắt đầu từ điều bạn muốn cải thiện: làn da, dáng mày hay sắc môi.</p>
      <a href="#dich-vu" className="button identity-hero__cta">Tìm lựa chọn của bạn <ArrowIcon /></a>
      <Link href="/gioi-thieu" className="identity-hero__about">Tinh thần AZ FACE <ArrowIcon /></Link>
    </div>
  </section>
}
