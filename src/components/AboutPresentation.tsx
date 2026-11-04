'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { pageText } from '@/i18n/page-messages'
import { useLocale } from 'next-intl'
import Link from '@/i18n/Link'
import { ArrowIcon } from './Icons'
import { BrandSignature } from './BrandSignature'
import { Consultation } from './Consultation'
import { CollageArt } from './CollageArt'
import './about-presentation.css'

const portraitWindow = 'M90 28 C240 0 490 12 590 86 C684 156 688 340 670 520 C654 720 548 786 350 786 C132 786 24 710 24 530 L24 230 C24 108 38 52 90 28 Z'
const wideWindow = 'M82 145 C240 120 480 120 618 145 C668 154 680 190 680 246 L680 600 C680 650 652 680 602 686 L98 686 C48 682 20 652 20 600 L20 246 C20 190 34 154 82 145 Z'

export function AboutPresentation() {
  const locale = useLocale()
  const t = pageText(locale)
  const root = useRef<HTMLDivElement>(null)
  const clipId = `about-window-${useId().replace(/:/g, '')}`
  const [activePrinciple, setActivePrinciple] = useState(0)

  useEffect(() => {
    const section = root.current
    if (!section) return
    let cancelled = false
    let dispose = () => {}
    Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('gsap/MorphSVGPlugin')]).then(([{ gsap }, { ScrollTrigger }, { MorphSVGPlugin }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)
      const media = gsap.matchMedia()
      media.add({ desktop: '(min-width: 901px)', motion: '(prefers-reduced-motion: no-preference)' }, match => {
        if (!match.conditions?.motion) return
        const desktop = Boolean(match.conditions.desktop)
        const context = gsap.context(() => {
          const hero = gsap.timeline({ scrollTrigger: { id: 'az-about-collage-opening', trigger: '.az-about__hero', start: 'top top', end: 'bottom top', scrub: .7 } })
          hero.to('.az-about__window-path', { morphSVG: wideWindow, ease: 'power1.inOut', duration: 1 }, 0)
            .to('.az-about__hero-portrait', { rotation: desktop ? -9 : -4, scale: desktop ? 1.1 : 1.04, yPercent: -8, ease: 'none', duration: 1 }, 0)
            .to('.az-about__hero-room', { xPercent: desktop ? 24 : 8, yPercent: -28, rotation: 12, ease: 'none', duration: 1 }, 0)
          const mosaic = gsap.timeline({ scrollTrigger: { id: 'az-about-collage-mosaic', trigger: '.az-about__mosaic', start: 'top 92%', end: 'center 38%', scrub: .65 } })
          mosaic.fromTo('.az-about__mosaic-tall', { rotation: -12, scale: .8, clipPath: 'inset(12% 18% 8% 4% round 35% 35% 6% 6%)' }, { rotation: -3, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 36% 6% 6% 6%)', duration: 1, ease: 'power2.out' }, 0)
            .fromTo('.az-about__mosaic-detail', { rotation: 20, xPercent: desktop ? -48 : -22, yPercent: 28, scale: .72 }, { rotation: 8, xPercent: 0, yPercent: 0, scale: 1, duration: 1, ease: 'power2.out' }, .12)
          const philosophy = section.querySelector('.az-about__philosophy')!
          if (desktop) {
            gsap.timeline({ scrollTrigger: { id: 'az-about-principle-window', trigger: philosophy, start: 'top 70%', end: 'bottom 65%', scrub: .8 } })
              .fromTo('.az-about__philosophy-art', { borderRadius: '44% 44% 5% 5%', rotation: -4 }, { borderRadius: '4% 42% 4% 42%', rotation: 3, duration: 1 })
              .to('.az-about__philosophy-art', { borderRadius: '42% 4% 42% 4%', rotation: -3, duration: 1 })
          }
          section.querySelectorAll<HTMLElement>('[data-about-principle]').forEach((chapter, index) => {
            ScrollTrigger.create({ id: `az-about-principle-${index + 1}`, trigger: chapter, start: 'top 65%', end: 'bottom 65%', onEnter: () => setActivePrinciple(index), onEnterBack: () => setActivePrinciple(index) })
            gsap.fromTo(chapter.querySelector('.az-about__reading-line'), { scaleX: .12 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: chapter, start: 'top 86%', end: 'top 45%', scrub: true } })
          })
        }, section)
        return () => context.revert()
      })
      dispose = () => media.revert()
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh() })
    }).catch(() => { /* The complete collage and all principle copy remain available. */ })
    return () => { cancelled = true; dispose() }
  }, [])

  return <div className="az-about" id="az-about-route" ref={root}>
    <section className="az-about__hero collage-host">
      <CollageArt variant="bloom" />
      <div className="az-about__hero-copy"><h1>{t('AZ FACE. Thẩm mỹ khuôn mặt.')}</h1><p>{t('Tập trung vào làn da và đường nét gương mặt, từ điều bạn muốn cải thiện đến nét riêng bạn muốn giữ.')}</p><a href="#cau-chuyen-az" className="az-about__explore">{t('Bước vào câu chuyện')} <span><ArrowIcon /></span></a></div>
      <div className="az-about__hero-composition">
        <svg className="az-about__hero-portrait" viewBox="0 0 700 800" role="img" aria-label={locale === 'en' ? 'Illustrative beauty portrait in pearl and teal light' : 'Chân dung beauty minh họa trong ánh sáng ngọc trai và xanh ngọc'}>
          <defs><clipPath id={clipId}><path className="az-about__window-path" d={portraitWindow} /></clipPath></defs>
          <image href="/images/brand-personal-kbeauty.webp" width="700" height="800" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${clipId})`} />
        </svg>
        <figure className="az-about__hero-room"><img src="/images/journey-about-hero.webp" alt={t('Không gian hành lang với ánh sáng tự nhiên và vật liệu sáng')} width="1600" height="1000" fetchPriority="high" /></figure>
      </div>
    </section>
    <section className="az-about__opening" id="cau-chuyen-az"><h2>{t('Vẻ đẹp bắt đầu từ sự thấu hiểu.')}</h2><div><p>{t('Điều bạn muốn thay đổi, điều bạn muốn giữ lại. Mỗi cuộc trò chuyện bắt đầu từ chính bạn.')}</p><Link href="/dich-vu" className="text-link">{t('Tìm hiểu cách chăm sóc')} <ArrowIcon /></Link></div></section>
    <section className="az-about__mosaic collage-host" aria-label={t('Tinh thần chăm sóc tại AZ FACE')}>
      <CollageArt variant="glass" />
      <figure className="az-about__mosaic-tall"><img src="/images/journey-about-portrait.webp" alt={t('Chân dung người trưởng thành trong ánh sáng dịu')} width="1024" height="1280" loading="lazy" /></figure>
      <div className="az-about__mosaic-copy"><h2>{t('Giữ nét riêng.')}<em> {t('Thêm sự chăm chút.')}</em></h2><p>{t('Không cần một khuôn mẫu chung. Có những lựa chọn phù hợp với sở thích và nhịp sống của bạn.')}</p></div>
      <figure className="az-about__mosaic-detail"><img src="/images/journey-about-detail.webp" alt={t('Đôi tay nâng bát gốm màu xanh trong ánh nắng')} width="1000" height="1000" loading="lazy" /></figure>
    </section>
    <section className="az-about__philosophy collage-host">
      <CollageArt variant="silk" />
      <div className="az-about__philosophy-art" data-active-principle={activePrinciple}>
        <img src="/images/brand-listening-scene.webp" alt="" width="1400" height="1100" loading="lazy" className={activePrinciple === 0 ? 'is-current' : ''} />
        <img src="/images/brand-care-stilllife.webp" alt="" width="1200" height="1500" loading="lazy" className={activePrinciple === 1 ? 'is-current' : ''} />
        <img src="/images/brand-choice-kbeauty.webp" alt="" width="1200" height="1500" loading="lazy" className={activePrinciple === 2 ? 'is-current' : ''} />
        <span className="az-about__art-caption" aria-hidden="true">{[t('Lắng nghe trước.'), t('Giải thích dễ hiểu.'), t('Giữ sự chủ động.')][activePrinciple]}</span>
      </div>
      <div className="az-about__principles"><h2>{t('Chăm sóc bằng sự rõ ràng.')}</h2>
        <div data-about-principle data-active={activePrinciple === 0}><span className="az-about__reading-line" aria-hidden="true" /><h3>{t('Lắng nghe trước.')}</h3><p>{t('Nói về điều bạn quan tâm và những câu hỏi còn để ngỏ.')}</p></div>
        <div data-about-principle data-active={activePrinciple === 1}><span className="az-about__reading-line" aria-hidden="true" /><h3>{t('Giải thích dễ hiểu.')}</h3><p>{t('Biết phạm vi, từng bước và điều cần cân nhắc trước khi chọn.')}</p></div>
        <div data-about-principle data-active={activePrinciple === 2}><span className="az-about__reading-line" aria-hidden="true" /><h3>{t('Giữ sự chủ động.')}</h3><p>{t('Dành thời gian tìm hiểu. Quyết định theo nhịp của bạn.')}</p></div>
      </div>
    </section>
    <BrandSignature />
    <p className="az-about__legal">{t('CÔNG TY TNHH AZ FACE · Mã số thuế 0402246363.')}</p>
    <Consultation />
  </div>
}
