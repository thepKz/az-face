'use client'

import { useEffect, useRef } from 'react'
import { useLocale } from 'next-intl'
import Link from '@/i18n/Link'
import { ArrowIcon } from './Icons'
import './immersive-journey.css'

const chapters = [
  {
    id: 'lang-nghe', image: '/images/journey-experience-rest.webp',
    vi: {
      verb: 'Lắng nghe.', title: 'Bắt đầu bằng điều bạn muốn.',
      body: 'Một vùng da bạn muốn chăm sóc kỹ hơn. Một dáng mày bạn đang cân nhắc. Hay chỉ là mong muốn hiểu gương mặt mình hơn. Hãy bắt đầu từ điều ấy.',
      questions: ['Điều bạn muốn cải thiện', 'Nét riêng bạn muốn giữ', 'Những điều bạn còn băn khoăn'],
      action: 'Ghi lại mong muốn', alt: 'Hình ảnh minh họa một khoảnh khắc nghỉ ngơi và chăm sóc bản thân',
    },
    en: {
      verb: 'Listen.', title: 'Start with what matters to you.',
      body: 'An area of skin you would like to care for. A brow shape you are considering. Or simply a wish to understand your own features better. Start there.',
      questions: ['What you would like to refine', 'The features you want to keep', 'The questions on your mind'],
      action: 'Put your goals into words', alt: 'Illustrative image of a quiet moment of rest and personal care',
    },
    href: '/lien-he',
  },
  {
    id: 'hieu-ro', image: '/images/journey-service-tools.webp',
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
    id: 'lua-chon', image: '/images/journey-about-portrait.webp',
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

  useEffect(() => {
    const section = root.current
    if (!section) return
    let cancelled = false
    let dispose = () => {}

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
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
            const direction = index % 2 ? -1 : 1
            const shapes = [
              ['48% 48% 6% 6%', '12% 42% 12% 42%'],
              ['6% 45% 6% 45%', '42% 10% 42% 10%'],
              ['45% 45% 40% 4%', '8% 44% 8% 44%'],
            ]
            // The curtain owns clip-path; scroll owns geometry and the two photo planes.
            const reveal = gsap.timeline({ scrollTrigger: { trigger: picture, start: 'top 88%', once: true } })
            reveal.fromTo(picture,
              { clipPath: index === 1 ? 'inset(0 0 100% 0)' : 'inset(0 100% 0 0)' },
              { clipPath: 'inset(0 0% 0% 0)', duration: 1.15, ease: 'expo.out' })
            if (detail) reveal.fromTo(detail, { opacity: 0 }, { opacity: 1, duration: .65, ease: 'power2.out' }, .2)

            const scene = gsap.timeline({
              defaults: { ease: 'none', duration: 1 },
              scrollTrigger: {
                id: `journey-depth-${index + 1}`,
                trigger: chapter.querySelector('.journey-cinema__composition'),
                start: 'top bottom', end: 'bottom top', scrub: desktop ? .7 : .4,
                invalidateOnRefresh: true,
              },
            })
            scene.fromTo(picture,
              { borderRadius: shapes[index][0], rotation: direction * (desktop ? -4 : -1.5) },
              { borderRadius: shapes[index][1], rotation: direction * (desktop ? 4 : 1.5) }, 0)
              .fromTo(image,
                { yPercent: direction * (desktop ? -7 : -4), scale: desktop ? 1.28 : 1.18 },
                { yPercent: direction * (desktop ? 7 : 4), scale: desktop ? 1.19 : 1.13 }, 0)
            if (detail) scene.fromTo(detail,
              { yPercent: desktop ? 32 : 14, xPercent: direction * (desktop ? -10 : -3), rotation: direction * (desktop ? -9 : -4) },
              { yPercent: desktop ? -32 : -14, xPercent: direction * (desktop ? 10 : 3), rotation: direction * (desktop ? 9 : 4) }, 0)
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
    <div className="journey-cinema__atmosphere" aria-hidden="true" />
    {chapters.map((chapter, index) => {
      const copy = chapter[locale]
      return <article className={`journey-cinema__chapter journey-cinema__chapter--${index + 1}`} id={`journey-${chapter.id}`} key={chapter.id} data-journey-chapter>
        <div className="journey-cinema__composition">
          <figure className="journey-cinema__picture" data-journey-window><img src={chapter.image} alt={copy.alt} width="1024" height="1280" loading="lazy" data-journey-image /></figure>
          <figure className="journey-cinema__detail" data-journey-detail aria-hidden="true"><img src={['/images/journey-experience-arrival.webp', '/images/journey-service-skin-detail.webp', '/images/journey-about-detail.webp'][index]} alt="" width="768" height="1024" loading="lazy" /></figure>
        </div>
        <div className="journey-cinema__copy">
          <h2>{copy.verb}</h2>
          <h3>{copy.title}</h3>
          <p>{copy.body}</p>
          <ul>{copy.questions.map(question => <li key={question}>{question}</li>)}</ul>
          <Link className="journey-cinema__action" href={chapter.href}>{copy.action}<ArrowIcon /></Link>
        </div>
      </article>
    })}
  </section>
}
