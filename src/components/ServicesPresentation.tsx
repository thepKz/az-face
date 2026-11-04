'use client'

import { pageText } from '@/i18n/page-messages'
import { useLocale } from 'next-intl'

import { useEffect, useId, useRef, useState } from 'react'
import Link from '@/i18n/Link'
import type { Service } from '@/content/site'
import { ArrowIcon } from './Icons'
import { FAQ } from './FAQ'
import { Consultation } from './Consultation'
import { CollageArt } from './CollageArt'
import { ServiceCollageMotion } from './ServiceCollageMotion'
import './services-presentation.css'

const detailImages: Record<string, { src: string; alt: string }> = {
  'cham-soc-da-mat': { src: '/images/journey-service-skin-detail.webp', alt: 'Chi tiết chăm sóc làn da trong ánh sáng tự nhiên' },
  'cham-soc-da-chuyen-sau': { src: '/images/journey-service-care-detail.webp', alt: 'Khoảnh khắc chăm sóc và thư giãn' },
  'dang-may-va-sac-moi': { src: '/images/journey-service-brows-detail.webp', alt: 'Đường nét dáng mày và sắc môi của người trưởng thành' },
}
const detailImage = (service: Service) => detailImages[service.slug] || { src: service.image, alt: service.imageAlt }
const serviceWindow = 'M130 28 C240 0 460 0 570 28 C660 48 684 160 684 300 L684 560 C684 714 602 780 350 780 C98 780 16 714 16 560 L16 300 C16 160 40 48 130 28 Z'

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
    Promise.all([import('gsap'), import('gsap/MorphSVGPlugin')]).then(([{ gsap }, { MorphSVGPlugin }]) => {
      if (cancelled) return
      gsap.registerPlugin(MorphSVGPlugin)
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          gsap.fromTo(root.querySelector('[data-selected-mask]'), { attr: { d: 'M300 30 C330 12 370 12 400 30 C430 70 440 200 440 340 L440 560 C440 714 410 780 350 780 C290 780 260 714 260 560 L260 340 C260 200 270 70 300 30 Z' } }, { morphSVG: serviceWindow, duration: .9, ease: 'expo.out' })
          gsap.fromTo(root.querySelector('[data-selected-image]'), { opacity: .45 }, { opacity: 1, duration: .5, clearProps: 'opacity' })
          gsap.fromTo(root.querySelector('[data-selected-copy]'), { opacity: .45, y: 12 }, { opacity: 1, y: 0, duration: .4, ease: 'power2.out', clearProps: 'opacity,transform' })
        }, root)
        return () => context.revert()
      })
      dispose = () => media.revert()
    }).catch(() => { /* Selection works without its optional transition. */ })
    return () => { cancelled = true; dispose() }
  }, [selected])

  return <div className="az-services" id="az-services-route">
    <ServiceCollageMotion targetId="az-services-route" />
    <header className="az-services__intro"><h1>{t("Dịch vụ thẩm mỹ khuôn mặt.")}</h1><p>{t("Tìm hiểu từng nhóm dịch vụ, các bước thực hiện và những câu hỏi cần trao đổi trước khi quyết định.")}</p></header>
    {active ? <section className="az-services__selector collage-host" aria-label={t("Khám phá nhóm dịch vụ")}>
      <CollageArt variant="glass" />
      <fieldset className="az-services__choices"><legend>{t("Điều bạn đang quan tâm")}</legend>{services.map(service => <label key={service.slug} className="az-services__choice">
        <input type="radio" name={`${id}-service`} checked={active.slug === service.slug} onChange={() => setSelected(service.slug)} aria-controls={`${id}-selected`} />
        <span>{service.title}</span><ArrowIcon />
      </label>)}</fieldset>
      <div className="az-services__selected" id={`${id}-selected`} ref={stage}>
        <div className="az-services__visual"><svg viewBox="0 0 700 800" role="img" aria-label={active.imageAlt}><defs><clipPath id={`${id}-window`}><path d={serviceWindow} data-selected-mask /></clipPath></defs><image key={active.image} href={active.image} width="700" height="800" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${id}-window)`} data-selected-image /></svg><img className="az-services__selected-object" src="/images/elements/glass-drop.webp" alt="" width="700" height="900" aria-hidden="true" /></div>
        <div className="az-services__selected-copy">{services.map(service => <div key={service.slug} className="az-services__copy-panel" data-selected-copy={active.slug === service.slug ? '' : undefined} aria-hidden={active.slug !== service.slug} inert={active.slug !== service.slug}><p>{service.summary}</p><Link href={`/dich-vu/${service.slug}`}>{t("Khám phá")} {service.shortTitle.toLocaleLowerCase(locale)}<ArrowIcon /></Link></div>)}</div>
      </div>
    </section> : <div className="az-services__empty"><p>{t("Danh mục dịch vụ đang được cập nhật.")}</p><Link href="/lien-he" className="text-link">{t("Trao đổi nhu cầu")} <ArrowIcon /></Link></div>}
    <div className="az-services__panels">{services.map((service, index) => {
      const image = detailImage(service)
      return <article key={service.slug} className="az-services__panel collage-host">
        <CollageArt variant={(['bloom', 'silk', 'atelier'] as const)[index % 3]} />
        <div className="az-services__panel-composition"><div className="az-services__panel-image"><img src={image.src} alt={t(image.alt)} width="1024" height="1280" loading="lazy" /></div><img className="az-services__panel-object" src={`/images/elements/${['pearl-orchid', 'champagne-arc', 'pearl-cluster'][index % 3]}.webp`} alt="" width="800" height="900" loading="lazy" aria-hidden="true" /></div>
        <div className="az-services__panel-copy"><h2>{service.title}</h2><p>{service.summary}</p><Link href={`/dich-vu/${service.slug}`} className="text-link">{t("Xem từng bước trải nghiệm")} <ArrowIcon /></Link></div>
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
  const windowId = `detail-window-${useId().replace(/:/g, '')}`
  return <div className="az-service-detail" id={routeId}>
    <ServiceCollageMotion targetId={routeId} />
    <nav className="az-service-detail__breadcrumb" aria-label={t("Đường dẫn")}><Link href="/dich-vu">{t("Dịch vụ")}</Link><span aria-hidden="true">/</span><span aria-current="page">{service.title}</span></nav>
    <section className="az-service-detail__hero collage-host">
      <CollageArt variant="bloom" />
      <div className="az-service-detail__hero-copy"><h1>{service.title}</h1><p>{service.summary}</p><Link href={`/lien-he?nhu-cau=${encodeURIComponent(service.slug)}`} className="button button-dark">{t("Trao đổi nhu cầu")} <ArrowIcon /></Link><span className="az-service-detail__duration">{service.duration}</span></div>
      <div className="az-service-detail__hero-composition"><svg className="az-service-detail__hero-visual" viewBox="0 0 700 800" role="img" aria-label={service.imageAlt}><defs><clipPath id={windowId}><path d={serviceWindow} data-detail-window /></clipPath></defs><image href={service.image} width="700" height="800" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${windowId})`} /></svg><img className="az-service-detail__hero-object" src="/images/elements/champagne-arc.webp" alt="" width="900" height="900" aria-hidden="true" /></div>
    </section>
    <nav className="az-service-detail__anchors" aria-label={t("Nội dung dịch vụ")}><a href="#tim-hieu">{t("Phạm vi chăm sóc")}</a><a href="#trai-nghiem">{t("Từng bước trải nghiệm")}</a><a href="#chi-phi">{t("Chi phí")}</a><a href="#cau-hoi">{t("Câu hỏi của bạn")}</a></nav>
    <section className="az-service-detail__scope collage-host" id="tim-hieu">
      <CollageArt variant="glass" />
      <div data-route-copy><h2>{t("Hiểu rõ trước khi chọn.")}</h2><p>{service.description}</p></div>
      <div className="az-service-detail__details">{service.details.map((detail, index) => <details key={`${detail.title}-${index}`} open={index === 0}>
        <summary>{detail.title}<ArrowIcon /></summary><p>{detail.text}</p>
      </details>)}</div>
    </section>
    <section className="az-service-detail__journey collage-host" id="trai-nghiem">
      <CollageArt variant="silk" />
      <div className="az-service-detail__sticky"><figure data-route-drift><img src={image.src} alt={t(image.alt)} width="1024" height="1280" loading="lazy" /></figure></div>
      <div className="az-service-detail__steps"><h2>{t("Từng bước, thật rõ ràng.")}</h2><ol>{service.steps.map((step, index) => <li key={`${step.title}-${index}`} data-route-copy><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></div>
    </section>
    <section className="az-service-detail__cost collage-host" id="chi-phi"><CollageArt variant="ribbon" /><h2>{t("Chi phí đi cùng phạm vi.")}</h2><div><p>{t("Hỏi rõ các bước được bao gồm, sản phẩm sử dụng và phần phát sinh nếu có. Ghi lại điều kiện thay đổi lựa chọn trước khi quyết định.")}</p><Link href={`/lien-he?nhu-cau=${encodeURIComponent(service.slug)}`} className="text-link">{t("Chuẩn bị cuộc trao đổi")} <ArrowIcon /></Link></div></section>
    <section className="az-service-detail__questions collage-host" id="cau-hoi"><CollageArt variant="atelier" /><div className="az-service-detail__questions-art"><img src="/images/journey-service-tools.webp" alt={t("Đồ dùng chăm sóc được sắp đặt trên bề mặt sáng")} width="1000" height="1000" loading="lazy" /></div><div><h2>{t("Câu hỏi của bạn.")}</h2><FAQ items={service.faq} /><Link href="/dich-vu" className="text-link">{t("Khám phá dịch vụ khác")} <ArrowIcon /></Link></div></section>
    <Consultation />
  </div>
}
