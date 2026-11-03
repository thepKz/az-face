import Link from 'next/link'
import type { Service } from '@/content/site'
import { ArrowIcon } from './Icons'

export function ServicePortraits({ services }: { services: Service[] }) {
  return <section className="portrait-services page-width" id="dich-vu" aria-labelledby="service-portraits-title">
    <div className="atelier-section-title"><h2 id="service-portraits-title">Chăm sóc <em>nét riêng.</em></h2><Link href="/dich-vu" className="text-link">Tất cả dịch vụ <ArrowIcon /></Link></div>
    <div className="portrait-services__grid">{services.map(service => <Link href={`/dich-vu/${service.slug}`} className="portrait-service" key={service.slug} data-portrait-service>
      <div className="portrait-service__image"><img src={service.image} alt={service.imageAlt} width="900" height="1120" loading="lazy" /><span className="portrait-service__action"><ArrowIcon /></span></div>
      <div className="portrait-service__title"><h3>{service.title}</h3></div>
    </Link>)}</div>
  </section>
}
