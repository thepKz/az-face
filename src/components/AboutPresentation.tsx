'use client'

import { useEffect, useRef, useState } from 'react'
import { pageText } from '@/i18n/page-messages'
import { useLocale } from 'next-intl'
import Link from '@/i18n/Link'
import { ArrowIcon } from './Icons'
import { BrandSignature } from './BrandSignature'
import { Consultation } from './Consultation'
import { RouteMotion } from './RouteMotion'
import './about-presentation.css'

export function AboutPresentation() {
  const locale = useLocale()
  const t = pageText(locale)
  const principles = useRef<HTMLElement>(null)
  const [activePrinciple, setActivePrinciple] = useState(0)

  useEffect(() => {
    const root = principles.current
    if (!root) return
    let cancelled = false
    let dispose = () => {}
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const media = gsap.matchMedia()
      media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          root.querySelectorAll<HTMLElement>('[data-about-principle]').forEach((chapter, index) => {
            ScrollTrigger.create({
              trigger: chapter, start: 'top 60%', end: 'bottom 60%',
              onEnter: () => setActivePrinciple(index),
              onEnterBack: () => setActivePrinciple(index),
            })
            gsap.fromTo(chapter.querySelector('.az-about__reading-line'), { scaleX: 0 }, {
              scaleX: 1, ease: 'none',
              scrollTrigger: { trigger: chapter, start: 'top 75%', end: 'top 35%', scrub: true },
            })
          })
        }, root)
        return () => context.revert()
      })
      dispose = () => media.revert()
    }).catch(() => { /* The three principles remain readable without motion. */ })
    return () => { cancelled = true; dispose() }
  }, [])

  return <div className="az-about" id="az-about-route">
    <RouteMotion targetId="az-about-route" />
    <section className="az-about__hero" data-route-hero>
      <img src="/images/journey-about-hero.webp" alt={t("Không gian hành lang với ánh sáng tự nhiên và vật liệu sáng")} width="1600" height="1000" fetchPriority="high" data-route-hero-image />
      <div className="az-about__hero-copy"><h1>{t("AZ FACE. Thẩm mỹ khuôn mặt.")}</h1><p>{t("Tập trung vào làn da và đường nét gương mặt, từ điều bạn muốn cải thiện đến nét riêng bạn muốn giữ.")}</p><a href="#cau-chuyen-az" className="az-about__explore">{t("Bước vào câu chuyện")} <ArrowIcon /></a></div>
    </section>
    <section className="az-about__opening" id="cau-chuyen-az">
      <h2 data-route-copy>{t("Vẻ đẹp bắt đầu từ sự thấu hiểu.")}</h2>
      <div data-route-copy><p>{t("Điều bạn muốn thay đổi, điều bạn muốn giữ lại. Mỗi cuộc trò chuyện bắt đầu từ chính bạn.")}</p><Link href="/dich-vu" className="text-link">{t("Tìm hiểu cách chăm sóc")} <ArrowIcon /></Link></div>
    </section>
    <section className="az-about__mosaic" aria-label={t("Tinh thần chăm sóc tại AZ FACE")}>
      <figure className="az-about__mosaic-tall" data-route-frame><img src="/images/journey-about-portrait.webp" alt={t("Chân dung người trưởng thành trong ánh sáng dịu")} width="1024" height="1280" loading="lazy" /></figure>
      <div className="az-about__mosaic-copy" data-route-copy><h2>{t("Giữ nét riêng.")}<em> {t("Thêm sự chăm chút.")}</em></h2><p>{t("Không cần một khuôn mẫu chung. Có những lựa chọn phù hợp với sở thích và nhịp sống của bạn.")}</p></div>
      <figure className="az-about__mosaic-detail" data-route-drift><img src="/images/journey-about-detail.webp" alt={t("Đôi tay nâng bát gốm màu xanh trong ánh nắng")} width="1000" height="1000" loading="lazy" /></figure>
    </section>
    <section className="az-about__philosophy" ref={principles}>
      <div className="az-about__philosophy-art" data-active-principle={activePrinciple}>
        <img src="/images/journey-about-atmosphere.webp" alt="" width="1400" height="1100" loading="lazy" className={activePrinciple === 0 ? 'is-current' : ''} />
        <img src="/images/journey-service-tools.webp" alt="" width="1000" height="1000" loading="lazy" className={activePrinciple === 1 ? 'is-current' : ''} />
        <img src="/images/journey-about-portrait.webp" alt="" width="1024" height="1280" loading="lazy" className={activePrinciple === 2 ? 'is-current' : ''} />
        <span className="az-about__art-caption" aria-hidden="true">{[t('Lắng nghe trước.'), t('Giải thích dễ hiểu.'), t('Giữ sự chủ động.')][activePrinciple]}</span>
      </div>
      <div className="az-about__principles"><h2 data-route-copy>{t("Chăm sóc bằng sự rõ ràng.")}</h2>
        <div data-about-principle data-active={activePrinciple === 0}><span className="az-about__reading-line" aria-hidden="true" /><h3>{t("Lắng nghe trước.")}</h3><p>{t("Nói về điều bạn quan tâm và những câu hỏi còn để ngỏ.")}</p></div>
        <div data-about-principle data-active={activePrinciple === 1}><span className="az-about__reading-line" aria-hidden="true" /><h3>{t("Giải thích dễ hiểu.")}</h3><p>{t("Biết phạm vi, từng bước và điều cần cân nhắc trước khi chọn.")}</p></div>
        <div data-about-principle data-active={activePrinciple === 2}><span className="az-about__reading-line" aria-hidden="true" /><h3>{t("Giữ sự chủ động.")}</h3><p>{t("Dành thời gian tìm hiểu. Quyết định theo nhịp của bạn.")}</p></div>
      </div>
    </section>
    <BrandSignature />
    <p className="az-about__legal">{t("CÔNG TY TNHH AZ FACE · Mã số thuế 0402246363.")}</p>
    <Consultation />
  </div>
}
