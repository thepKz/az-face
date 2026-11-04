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
    const header = document.querySelector<HTMLElement>('.az-header')
    const measureHeader = () => section.style.setProperty('--journey-top', `${header?.getBoundingClientRect().height ?? 112}px`)
    const observer = new ResizeObserver(measureHeader)
    if (header) observer.observe(header)
    measureHeader()
    let cancelled = false
    let dispose = () => {}

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const media = gsap.matchMedia()
      media.add('(min-width: 901px) and (min-height: 701px) and (prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          section.querySelectorAll<HTMLElement>('[data-journey-chapter]').forEach((chapter, index) => {
            // Native sticky owns the chapter; only the photograph moves inside it.
            gsap.fromTo(chapter.querySelector('[data-journey-image]'),
              { scale: 1.18, yPercent: index % 2 ? -4 : 4 },
              { scale: 1, yPercent: 0, ease: 'none', scrollTrigger: { trigger: chapter, start: 'top bottom', end: 'top 20%', scrub: .65 } })
            gsap.fromTo(chapter.querySelector('[data-journey-line]'), { scaleX: .08 },
              { scaleX: 1, ease: 'none', scrollTrigger: { trigger: chapter, start: 'top 75%', end: 'top 20%', scrub: .4 } })
          })
        }, section)
        return () => context.revert()
      })
      dispose = () => media.revert()
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh() })
    }).catch(() => { /* The chapters stay in reading order without motion. */ })

    return () => { cancelled = true; observer.disconnect(); dispose() }
  }, [])

  return <section className="journey-cinema" id="trai-nghiem" ref={root} aria-label={locale === 'en' ? 'From your goals to your decision' : 'Từ mong muốn đến lựa chọn của bạn'}>
    {chapters.map((chapter, index) => {
      const copy = chapter[locale]
      return <article className={`journey-cinema__chapter journey-cinema__chapter--${index + 1}`} id={`journey-${chapter.id}`} key={chapter.id} data-journey-chapter>
        <figure className="journey-cinema__picture"><img src={chapter.image} alt={copy.alt} width="1024" height="1280" loading="lazy" data-journey-image /></figure>
        <div className="journey-cinema__copy">
          <h2>{copy.verb}</h2>
          <span className="journey-cinema__line" data-journey-line aria-hidden="true" />
          <h3>{copy.title}</h3>
          <p>{copy.body}</p>
          <ul>{copy.questions.map(question => <li key={question}>{question}</li>)}</ul>
          <Link className="journey-cinema__action" href={chapter.href}>{copy.action}<ArrowIcon /></Link>
        </div>
      </article>
    })}
  </section>
}
