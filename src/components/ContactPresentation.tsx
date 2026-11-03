import Link from 'next/link'
import type { Service } from '@/content/site'
import { ContactForm } from './ContactForm'
import { ArrowIcon } from './Icons'
import { JournalMotion } from './JournalMotion'
import './contact-presentation.css'

export function ContactPresentation({ services, initialService }: { services: Service[]; initialService: string }) {
  return <JournalMotion className="cp-page">
    <nav className="cp-breadcrumb" aria-label="Đường dẫn"><Link href="/">Trang chủ</Link><span aria-hidden="true">/</span><span>Trao đổi nhu cầu</span></nav>
    <section className="cp-layout">
      <div className="cp-visual" data-journal-reveal><div className="cp-visual-image" data-journal-parallax><img src="/images/journey-contact-hero.webp" alt="" width="1200" height="1600" fetchPriority="high" /></div><div className="cp-visual-title" data-journal-arrival><h1>Một câu hỏi. <em>Một khởi đầu.</em></h1><p>Dành một khoảng để nói về điều bạn cần, theo cách của riêng bạn.</p></div></div>
      <div className="cp-form-area"><ContactForm key={initialService} services={services} initialService={initialService} /></div>
    </section>
    <section className="cp-prepare"><div><h2>Không cần biết hết. <em>Chỉ cần bắt đầu.</em></h2><p>Bạn đang tìm hiểu chăm sóc da, dáng mày hay sắc môi? Một vài ghi chú sẽ giúp cuộc trao đổi rõ ràng hơn.</p><ul><li>Điều bạn quan tâm nhất ở thời điểm này.</li><li>Những gì bạn muốn giữ lại trong diện mạo của mình.</li><li>Câu hỏi về phạm vi, các bước hoặc chi phí.</li></ul><Link href="/kien-thuc" className="cp-reading-link">Đọc thêm trước khi lựa chọn<ArrowIcon /></Link></div><figure data-journal-reveal><img src="/images/journey-contact-detail.webp" alt="" width="1000" height="1200" loading="lazy" /></figure></section>
  </JournalMotion>
}
