'use client'

import { pageText } from '@/i18n/page-messages'
import { useLocale } from 'next-intl'

import { useEffect, useId, useRef, useState } from 'react'
import Link from '@/i18n/Link'
import type { Service } from '@/content/site'
import { ArrowIcon } from './Icons'
import { FAQ } from './FAQ'
import { Consultation } from './Consultation'
import { RouteMotion } from './RouteMotion'
import './services-presentation.css'

const detailImages: Record<string, { src: string; alt: string }> = {
  'cham-soc-da-mat': { src: '/images/journey-service-skin-detail.webp', alt: 'Chi tiết chăm sóc làn da trong ánh sáng tự nhiên' },
  'cham-soc-da-chuyen-sau': { src: '/images/journey-service-care-detail.webp', alt: 'Khoảnh khắc chăm sóc và thư giãn' },
  'dang-may-va-sac-moi': { src: '/images/journey-service-brows-detail.webp', alt: 'Đường nét dáng mày và sắc môi của người trưởng thành' },
}
const detailImage = (service: Service) => detailImages[service.slug] || { src: service.image, alt: service.imageAlt }

export function ServicesPresentation({ services }: { services: Service[] }) {
  const locale = useLocale()
  const t = pageText(locale)

  const [selected, setSelected] = useState(services[0]?.slug ?? '')
  const stage = useRef<HTMLDivElement>(null)
  const previous = useRef(selected)
  const id = useId()
  const active = services.find(service => service.slug === selected) || services[0]

  useEffect(() => {
    if (previous.current === selected) return
    previous.current = selected
    const root = stage.current
    if (!root) return
    let cancelled = false
    let dispose = () => {}
    import('gsap').then(({ gsap }) => {
      if (cancelled) return
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          gsap.fromTo(root.querySelector('[data-selected-image]'), { clipPath: 'ellipse(18% 36% at 50% 50%)', scale: 1.12, rotation: -3 }, { clipPath: 'ellipse(80% 80% at 50% 50%)', scale: 1, rotation: 0, duration: .8, ease: 'power3.out', clearProps: 'clipPath,transform' })
          gsap.fromTo(root.querySelector('[data-selected-copy]'), { opacity: .45, y: 12 }, { opacity: 1, y: 0, duration: .4, ease: 'power2.out', clearProps: 'opacity,transform' })
        }, root)
        return () => context.revert()
      })
      dispose = () => media.revert()
    }).catch(() => { /* Selection works without its optional transition. */ })
    return () => { cancelled = true; dispose() }
  }, [selected])

  return <div className="az-services" id="az-services-route">
    <RouteMotion targetId="az-services-route" />
    <header className="az-services__intro"><h1>{t("Dịch vụ thẩm mỹ khuôn mặt.")}</h1><p>{t("Tìm hiểu từng nhóm dịch vụ, các bước thực hiện và những câu hỏi cần trao đổi trước khi quyết định.")}</p></header>
    {active ? <section className="az-services__selector" aria-label={t("Khám phá nhóm dịch vụ")}>
      <fieldset className="az-services__choices"><legend>{t("Điều bạn đang quan tâm")}</legend>{services.map(service => <label key={service.slug} className="az-services__choice">
        <input type="radio" name={`${id}-service`} checked={active.slug === service.slug} onChange={() => setSelected(service.slug)} aria-controls={`${id}-selected`} />
        <span>{service.title}</span><ArrowIcon />
      </label>)}</fieldset>
      <div className="az-services__selected" id={`${id}-selected`} ref={stage}>
        <img key={active.image} src={active.image} alt={active.imageAlt} width="1100" height="1200" fetchPriority="high" data-selected-image />
        <div className="az-services__selected-copy">{services.map(service => <div key={service.slug} className="az-services__copy-panel" data-selected-copy={active.slug === service.slug ? '' : undefined} aria-hidden={active.slug !== service.slug} inert={active.slug !== service.slug}><p>{service.summary}</p><Link href={`/dich-vu/${service.slug}`}>{t("Khám phá")} {service.shortTitle.toLocaleLowerCase(locale)}<ArrowIcon /></Link></div>)}</div>
      </div>
    </section> : <div className="az-services__empty"><p>{t("Danh mục dịch vụ đang được cập nhật.")}</p><Link href="/lien-he" className="text-link">{t("Trao đổi nhu cầu")} <ArrowIcon /></Link></div>}
    <div className="az-services__panels">{services.map(service => {
      const image = detailImage(service)
      return <article key={service.slug} className="az-services__panel">
        <div className="az-services__panel-image" data-route-frame><img src={image.src} alt={t(image.alt)} width="1024" height="1280" loading="lazy" /></div>
        <div className="az-services__panel-copy" data-route-copy><h2>{service.title}</h2><p>{service.summary}</p><Link href={`/dich-vu/${service.slug}`} className="text-link">{t("Xem từng bước trải nghiệm")} <ArrowIcon /></Link></div>
      </article>
    })}</div>
    <Consultation />
  </div>
}

export function ServiceDetailPresentation({ service }: { service: Service }) {
  const locale = useLocale()
  const t = pageText(locale)

  const image = detailImage(service)
  const routeId = `az-service-detail-${service.slug}`
  return <div className="az-service-detail" id={routeId}>
    <RouteMotion targetId={routeId} />
    <nav className="az-service-detail__breadcrumb" aria-label={t("Đường dẫn")}><Link href="/dich-vu">{t("Dịch vụ")}</Link><span aria-hidden="true">/</span><span aria-current="page">{service.title}</span></nav>
    <section className="az-service-detail__hero" data-route-hero>
      <div className="az-service-detail__hero-copy"><h1>{service.title}</h1><p>{service.summary}</p><Link href={`/lien-he?nhu-cau=${encodeURIComponent(service.slug)}`} className="button button-dark">{t("Trao đổi nhu cầu")} <ArrowIcon /></Link><span className="az-service-detail__duration">{service.duration}</span></div>
      <figure><img src={service.image} alt={service.imageAlt} width="1024" height="1280" fetchPriority="high" data-route-hero-image /></figure>
    </section>
    <nav className="az-service-detail__anchors" aria-label={t("Nội dung dịch vụ")}><a href="#tim-hieu">{t("Phạm vi chăm sóc")}</a><a href="#trai-nghiem">{t("Từng bước trải nghiệm")}</a><a href="#chi-phi">{t("Chi phí")}</a><a href="#cau-hoi">{t("Câu hỏi của bạn")}</a></nav>
    <section className="az-service-detail__scope" id="tim-hieu">
      <div data-route-copy><h2>{t("Hiểu rõ trước khi chọn.")}</h2><p>{service.description}</p></div>
      <div className="az-service-detail__details">{service.details.map((detail, index) => <details key={`${detail.title}-${index}`} open={index === 0}>
        <summary>{detail.title}<ArrowIcon /></summary><p>{detail.text}</p>
      </details>)}</div>
    </section>
    <section className="az-service-detail__journey" id="trai-nghiem">
      <div className="az-service-detail__sticky"><figure data-route-drift><img src={image.src} alt={t(image.alt)} width="1024" height="1280" loading="lazy" /></figure></div>
      <div className="az-service-detail__steps"><h2>{t("Từng bước, thật rõ ràng.")}</h2><ol>{service.steps.map((step, index) => <li key={`${step.title}-${index}`} data-route-copy><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></div>
    </section>
    <section className="az-service-detail__cost" id="chi-phi"><h2 data-route-copy>{t("Chi phí đi cùng phạm vi.")}</h2><div data-route-copy><p>{t("Hỏi rõ các bước được bao gồm, sản phẩm sử dụng và phần phát sinh nếu có. Ghi lại điều kiện thay đổi lựa chọn trước khi quyết định.")}</p><Link href={`/lien-he?nhu-cau=${encodeURIComponent(service.slug)}`} className="text-link">{t("Chuẩn bị cuộc trao đổi")} <ArrowIcon /></Link></div></section>
    <section className="az-service-detail__questions" id="cau-hoi"><div className="az-service-detail__questions-art" data-route-frame><img src="/images/journey-service-tools.webp" alt={t("Đồ dùng chăm sóc được sắp đặt trên bề mặt sáng")} width="1000" height="1000" loading="lazy" /></div><div><h2>{t("Câu hỏi của bạn.")}</h2><FAQ items={service.faq} /><Link href="/dich-vu" className="text-link">{t("Khám phá dịch vụ khác")} <ArrowIcon /></Link></div></section>
    <Consultation />
  </div>
}
