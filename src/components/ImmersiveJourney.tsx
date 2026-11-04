'use client'

import { useEffect, useId, useRef } from 'react'
import { useLocale } from 'next-intl'
import Link from '@/i18n/Link'
import { ArrowIcon } from './Icons'
import { CollageArt } from './CollageArt'
import './immersive-journey.css'

const chapters = [
  {
    id: 'lang-nghe', image: '/images/brand-listening-scene.webp',
    vi: {
      verb: 'Lắng nghe.', title: 'Bắt đầu bằng điều bạn muốn.',
      body: 'Một vùng da bạn muốn chăm sóc kỹ hơn. Một dáng mày bạn đang cân nhắc. Hay chỉ là mong muốn hiểu gương mặt mình hơn. Hãy bắt đầu từ điều ấy.',
      questions: ['Điều bạn muốn cải thiện', 'Nét riêng bạn muốn giữ', 'Những điều bạn còn băn khoăn'],
      action: 'Ghi lại mong muốn', alt: 'Hình ảnh minh họa hai người phụ nữ trao đổi mong muốn chăm sóc khuôn mặt',
    },
    en: {
      verb: 'Listen.', title: 'Start with what matters to you.',
      body: 'An area of skin you would like to care for. A brow shape you are considering. Or simply a wish to understand your own features better. Start there.',
      questions: ['What you would like to refine', 'The features you want to keep', 'The questions on your mind'],
      action: 'Put your goals into words', alt: 'Illustrative scene of two women discussing facial care preferences',
    },
    href: '/lien-he',
  },
  {
    id: 'hieu-ro', image: '/images/brand-care-stilllife.webp',
    vi: {
      verb: 'Hiểu rõ.', title: 'Hỏi đến khi mọi thứ rõ ràng.',
      body: 'Tên gọi của một dịch vụ chưa nói lên tất cả. Tìm hiểu các bước, phạm vi thực hiện và những điều cần cân nhắc để biết lựa chọn đó có phù hợp với mình hay không.',
      questions: ['Các bước và phạm vi thực hiện', 'Chi phí, thời gian và rủi ro', 'Những lưu ý sau khi thực hiện'],
      action: 'Tìm hiểu từng dịch vụ', alt: 'Đồ dùng chăm sóc được sắp đặt trong ánh sáng tự nhiên, hình ảnh minh họa',
    },
    en: {
      verb: 'Understand.', title: 'Ask until the picture is clear.',
      body: 'A service name only tells part of the story. Understand the steps, the scope and the considerations that help you decide whether an option is right for you.',
      questions: ['The steps and scope of the service', 'Costs, timing and risks', 'What to consider afterwards'],
      action: 'Explore each service', alt: 'Illustrative arrangement of care essentials in natural light',
    },
    href: '/dich-vu',
  },
  {
    id: 'lua-chon', image: '/images/brand-choice-kbeauty.webp',
    vi: {
      verb: 'Lựa chọn.', title: 'Quyết định theo nhịp của bạn.',
      body: 'Bạn có thể tìm hiểu thêm, hỏi lại hoặc dành thời gian cân nhắc. Một cuộc trao đổi có ý nghĩa giúp bạn hiểu lựa chọn của mình trước khi quyết định.',
      questions: ['Đối chiếu với mong muốn ban đầu', 'Hỏi lại những điểm chưa rõ', 'Giữ quyền chủ động quyết định'],
      action: 'Chuẩn bị cuộc trao đổi', alt: 'Chân dung minh họa người phụ nữ trưởng thành trong ánh sáng dịu',
    },
    en: {
      verb: 'Choose.', title: 'Make the decision in your own time.',
      body: 'You can read more, ask again or take time to consider. A useful conversation helps you understand your options before you decide.',
      questions: ['Return to your original goals', 'Clarify anything you are unsure of', 'Keep the decision in your hands'],
      action: 'Prepare your conversation', alt: 'Illustrative portrait of an adult woman in soft natural light',
    },
    href: '/lien-he',
  },
]

export function ImmersiveJourney() {
  const locale = useLocale() === 'en' ? 'en' : 'vi'
  const root = useRef<HTMLElement>(null)
  const clipId = useId().replace(/:/g, '')
  const windows = [
    'M150 18 C230 0 480 0 550 90 C598 150 594 490 560 600 C520 700 350 718 180 700 C40 686 8 590 12 390 C14 210 38 42 150 18 Z',
    'M18 100 C90 18 220 28 300 50 C390 76 510 0 580 70 L580 620 C480 700 350 660 280 680 C180 710 80 680 18 620 Z',
    'M300 10 C450 10 590 110 590 300 L590 690 L10 690 L10 300 C10 110 150 10 300 10 Z',
  ]

  useEffect(() => {
    const section = root.current
    if (!section) return
    let cancelled = false
    let dispose = () => {}

    Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('gsap/MorphSVGPlugin')]).then(([{ gsap }, { ScrollTrigger }, { MorphSVGPlugin }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)
      const media = gsap.matchMedia()
      media.add({
        desktop: '(min-width: 901px)',
        mobile: '(max-width: 900px)',
        motion: '(prefers-reduced-motion: no-preference)',
      }, mediaContext => {
        if (!mediaContext.conditions?.motion) return
        const desktop = mediaContext.conditions.desktop
        const context = gsap.context(() => {
          section.querySelectorAll<HTMLElement>('[data-journey-chapter]').forEach((chapter, index) => {
            const picture = chapter.querySelector('[data-journey-window]')
            const image = chapter.querySelector('[data-journey-image]')
            const detail = chapter.querySelector('[data-journey-detail]')
            const amount = desktop ? 1 : .5
            const mask = chapter.querySelector('[data-journey-mask]')
            const compressed = [
              'M268 50 C300 20 342 20 360 90 C390 150 390 490 360 600 C340 680 300 700 270 680 C230 650 210 590 215 390 C220 210 230 82 268 50 Z',
              'M18 285 C90 250 220 280 300 280 C390 280 510 250 580 285 L580 445 C480 470 350 450 280 470 C180 490 80 470 18 445 Z',
              'M300 190 C390 190 470 270 470 390 L470 590 L130 590 L130 390 C130 270 210 190 300 190 Z',
            ]
            const openings = [
              { rotationY: -38 * amount, rotationX: 0, rotation: -12 * amount, scale: .86, xPercent: -14 * amount, yPercent: 5 * amount },
              { rotationY: 20 * amount, rotationX: 0, rotation: 7 * amount, scale: .9, xPercent: 15 * amount, yPercent: 0 },
              { rotationY: 0, rotationX: 32 * amount, rotation: 10 * amount, scale: .78, xPercent: 0, yPercent: 16 * amount },
            ]
            const scene = gsap.timeline({
              defaults: { ease: 'power2.out', duration: 1 },
              scrollTrigger: {
                id: `az-journey-morph-${index + 1}`,
                trigger: chapter,
                start: 'top 82%', end: 'center 28%', scrub: desktop ? .8 : .45,
                invalidateOnRefresh: true,
              },
            })
            scene.fromTo(picture, openings[index],
              { rotationY: 0, rotationX: 0, rotation: index === 1 ? 3 : -3, scale: 1, xPercent: 0, yPercent: 0 }, 0)
              .fromTo(image, { scale: desktop ? 1.2 : 1.1, transformOrigin: '50% 50%' }, { scale: 1, duration: 1.35 }, 0)
            if (mask) scene.fromTo(mask, { attr: { d: compressed[index] } }, { morphSVG: windows[index], duration: 1.35, ease: 'power2.inOut' }, 0)
            // Keep the title's travel inside the smallest responsive chapter gutter.
            scene.fromTo(chapter.querySelector('h2'), { x: () => (index === 1 ? 1 : -1) * Math.min(32, window.innerWidth * .025) }, { x: 0, duration: 1.5, ease: 'none' }, 0)
            if (detail) scene.fromTo(detail,
              { yPercent: 35 * amount, xPercent: (index === 1 ? 70 : -65) * amount, rotationY: (index === 1 ? -48 : 48) * amount, rotation: (index === 1 ? -12 : 12) * amount, scale: .75, opacity: .35 },
              { yPercent: 0, xPercent: 0, rotationY: 0, rotation: index === 1 ? -7 : 7, scale: 1, opacity: 1, duration: .85 }, .15)
          })
        }, section)
        return () => context.revert()
      })
      dispose = () => media.revert()
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh() })
    }).catch(() => { /* The chapters stay in reading order without motion. */ })

    return () => { cancelled = true; dispose() }
  }, [])

  return <section className="journey-cinema" id="trai-nghiem" ref={root} aria-label={locale === 'en' ? 'From your goals to your decision' : 'Từ mong muốn đến lựa chọn của bạn'}>
    {chapters.map((chapter, index) => {
      const copy = chapter[locale]
      return <article className={`journey-cinema__chapter journey-cinema__chapter--${index + 1} collage-host`} id={`journey-${chapter.id}`} key={chapter.id} data-journey-chapter>
        <CollageArt variant={index === 0 ? 'bloom' : index === 1 ? 'atelier' : 'ribbon'} />
        <h2>{copy.verb}</h2>
        <div className="journey-cinema__composition">
          <figure className="journey-cinema__picture" data-journey-window><svg viewBox="0 0 600 720" role="img" aria-label={copy.alt}><defs><clipPath id={`${clipId}-${index}`}><path data-journey-mask d={windows[index]} /></clipPath></defs><g clipPath={`url(#${clipId}-${index})`}><image href={chapter.image} width="600" height="720" preserveAspectRatio="xMidYMid slice" data-journey-image /></g></svg></figure>
          <figure className="journey-cinema__detail" data-journey-detail aria-hidden="true"><img src={['/images/journey-experience-arrival.webp', '/images/journey-service-skin-detail.webp', '/images/journey-about-detail.webp'][index]} alt="" width="768" height="1024" loading="lazy" /></figure>
        </div>
        <div className="journey-cinema__copy">
          <h3>{copy.title}</h3>
          <p>{copy.body}</p>
          <ul>{copy.questions.map(question => <li key={question}>{question}</li>)}</ul>
          <Link className="journey-cinema__action" href={chapter.href}>{copy.action}<ArrowIcon /></Link>
        </div>
      </article>
    })}
  </section>
}
