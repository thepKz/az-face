'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import type { Service } from '@/content/site'
import { ArrowIcon, PlusIcon } from './Icons'

export function ServiceExplorer({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0)
  const id = useId()
  return <div className="service-explorer" data-reveal>
    <figure className="explorer-image">
      {services.map((service, index) => <img key={service.slug} src={service.image} alt={index === active ? service.imageAlt : ''} aria-hidden={index !== active} width="900" height="1080" loading="lazy" className={index === active ? 'is-active' : ''} />)}
      <figcaption>Hình ảnh minh họa</figcaption>
    </figure>
    <div className="explorer-options"><p className="explorer-instruction">Chọn điều bạn muốn tìm hiểu.</p>{services.map((service, index) => <div className={`explorer-option${index === active ? ' is-active' : ''}`} key={service.slug}>
      <h3><button type="button" id={`${id}-button-${index}`} aria-expanded={active === index} aria-controls={`${id}-panel-${index}`} onClick={() => setActive(index)}>{service.title}<PlusIcon /></button></h3>
      <div id={`${id}-panel-${index}`} aria-labelledby={`${id}-button-${index}`} hidden={active !== index}><p>{service.summary}</p><Link href={`/dich-vu/${service.slug}`} className="text-link">Tìm hiểu trải nghiệm <ArrowIcon /></Link></div>
    </div>)}<Link href="/dich-vu" className="explorer-all text-link">Xem tất cả dịch vụ <ArrowIcon /></Link></div>
  </div>
}
