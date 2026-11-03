'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowIcon } from './Icons'
import './beauty-gallery.css'

const scenes = [
  {
    key: 'skin', label: 'Làn da', title: 'Hiểu làn da trước khi lựa chọn.',
    description: 'Tìm hiểu tình trạng da, mục tiêu cải thiện và phương pháp phù hợp trước khi lựa chọn dịch vụ.',
    image: '/images/campaign-gallery-skin-main.webp',
    alt: 'Chân dung người trưởng thành với làn da tự nhiên, ảnh minh họa',
    detail: '/images/campaign-gallery-skin-detail.webp',
    detailAlt: 'Giọt dưỡng chất trong bát thủy tinh dưới ánh sáng tự nhiên',
    href: '/dich-vu', link: 'Khám phá các dịch vụ',
  },
  {
    key: 'brows', label: 'Dáng nét', title: 'Đường nét hài hòa với gương mặt.',
    description: 'Cân nhắc dáng mày và sắc môi trong tổng thể gương mặt, theo sở thích và kết quả bạn mong muốn.',
    image: '/images/campaign-gallery-brows-main.webp',
    alt: 'Chi tiết gương mặt người trưởng thành minh họa dáng mày và sắc môi',
    detail: '/images/campaign-gallery-brows-detail.webp',
    detailAlt: 'Chi tiết đường nét chân mày tự nhiên',
    href: '/dich-vu', link: 'Tìm dịch vụ bạn quan tâm',
  },
  {
    key: 'ritual', label: 'Trước khi lựa chọn', title: 'Hiểu rõ phương pháp và chi phí.',
    description: 'Làm rõ các bước thực hiện, thời gian hồi phục và cách chăm sóc sau dịch vụ trong buổi tư vấn.',
    image: '/images/campaign-gallery-ritual-main.webp',
    alt: 'Người phụ nữ thư giãn cùng khăn mềm trong không gian yên tĩnh',
    detail: '/images/campaign-gallery-ritual-detail.webp',
    detailAlt: 'Nước được rót từ bình gốm vào bát xanh ngọc',
    href: '/dich-vu', link: 'Khám phá trải nghiệm chăm sóc',
  },
] as const

export function BeautyGallery() {
  const [active, setActive] = useState<(typeof scenes)[number]['key']>('skin')
  const sectionRef = useRef<HTMLElement>(null)
  const previousScene = useRef(active)
  const id = useId()

  useEffect(() => {
    if (previousScene.current === active) return
    previousScene.current = active
    const scene = sectionRef.current?.querySelector<HTMLElement>(`[data-beauty-scene="${active}"]`)
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!scene || preference.matches) return
    let cancelled = false
    let restore = () => {}
    const onPreference = () => {
      if (preference.matches) {
        cancelled = true
        restore()
      }
    }
    preference.addEventListener('change', onPreference)
    import('gsap').then(({ gsap }) => {
      if (cancelled || preference.matches) return
      const context = gsap.context(() => {
        // Scroll motion owns the wrappers; scene changes touch only their images.
        gsap.timeline()
          .fromTo(scene.querySelectorAll('[data-beauty-layer] img'),
            { opacity: 0.5, clipPath: 'inset(0% 0% 8% 0%)' },
            { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, ease: 'power3.out', clearProps: 'opacity,clipPath' }, 0)
          .fromTo(scene.querySelector('.beauty-gallery__story'),
            { y: 8, opacity: 0.7 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', clearProps: 'transform,opacity' }, 0.1)
      }, scene)
      restore = () => context.revert()
    }).catch(() => { /* Selected content stays visible if the motion chunk cannot load. */ })
    return () => {
      cancelled = true
      preference.removeEventListener('change', onPreference)
      restore()
    }
  }, [active])

  return (
    <section ref={sectionRef} className="beauty-gallery" id="khong-gian-cham-soc" aria-labelledby={`${id}-title`} data-beauty-gallery>
      <div className="beauty-gallery__inner">
        <header className="beauty-gallery__heading">
          <h2 id={`${id}-title`}>Cảm hứng <em>cho bạn.</em></h2>
          <fieldset className="beauty-gallery__choices">
            <legend>Chọn một góc nhìn</legend>
            {scenes.map(scene => (
              <label key={scene.key} className="beauty-gallery__choice">
                <input type="radio" name={`${id}-scene`} value={scene.key} checked={active === scene.key}
                  aria-controls={`${id}-${scene.key}`} onChange={() => setActive(scene.key)} />
                <span>{scene.label}</span>
              </label>
            ))}
          </fieldset>
        </header>

        {scenes.map(scene => (
          <div key={scene.key} id={`${id}-${scene.key}`} className={`beauty-gallery__scene beauty-gallery__scene--${scene.key}`}
            hidden={active !== scene.key} data-beauty-scene={scene.key}>
            <figure className="beauty-gallery__composition">
              <div className="beauty-gallery__art" data-beauty-art>
                <div className="beauty-gallery__botanical" aria-hidden="true" data-beauty-layer="botanical">
                  <img src="/images/campaign-botanical.webp" alt="" width="1024" height="1280" loading="lazy" />
                </div>
                <div className="beauty-gallery__main" data-beauty-layer="main">
                  <img src={scene.image} alt={scene.alt} width="1024" height="1280" loading="lazy" />
                </div>
                <div className="beauty-gallery__detail" data-beauty-layer="detail">
                  <img src={scene.detail} alt={scene.detailAlt} width="1024" height="1280" loading="lazy" />
                </div>
              </div>
            </figure>
            <div className="beauty-gallery__story">
              <div><h3>{scene.title}</h3><p>{scene.description}</p></div>
              <Link href={scene.href} className="beauty-gallery__link">{scene.link}<ArrowIcon /></Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
