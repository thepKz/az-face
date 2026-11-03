import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowIcon } from '@/components/Icons'
import { RouteMotion } from '@/components/RouteMotion'
import { Consultation } from '@/components/Consultation'
import '@/components/JourneyPages.css'

export const metadata: Metadata = { title: 'Trải nghiệm' }

export default function ExperiencePage() {
  return <div className="experience-page" id="experience-page">
    <section className="experience-opening" data-route-hero>
      <figure><img src="/images/journey-experience-arrival.webp" width="1600" height="1000" alt="Không gian đón tiếp với ánh sáng dịu và vật liệu tự nhiên" fetchPriority="high" data-route-hero-image /></figure>
      <div className="experience-opening__copy page-width"><span className="journey-label">Trải nghiệm tại AZ FACE</span><h1>Chậm lại một chút.</h1><p>Dành thời gian cho làn da, cho cảm giác dễ chịu và cho những điều bạn muốn chăm chút.</p><a href="#lang-nghe" className="button button-light">Bắt đầu hành trình<ArrowIcon /></a></div>
      <span className="experience-opening__index" aria-hidden="true">01 — 03</span>
    </section>
    <section className="experience-chapter page-width" id="lang-nghe">
      <div className="experience-chapter__copy" data-route-copy><span className="journey-label">01 / Lắng nghe</span><h2>Bắt đầu bằng câu chuyện của bạn.</h2><p>Bạn đang quan tâm đến điều gì? Thói quen chăm sóc hiện tại có điểm nào chưa phù hợp? Một cuộc trao đổi rõ ràng giúp bạn biết mình cần hỏi gì trước khi lựa chọn.</p><Link href="/lien-he" className="text-link">Chuẩn bị nội dung trao đổi<ArrowIcon /></Link></div>
      <figure className="experience-chapter__image" data-route-frame><img src="/images/journey-experience-rest.webp" width="1024" height="1280" loading="lazy" alt="Khoảnh khắc nghỉ ngơi trong không gian chăm sóc" /></figure>
    </section>
    <section className="experience-ritual">
      <div className="page-width experience-ritual__heading" data-route-copy><span className="journey-label">02 / Chăm chút</span><h2>Mỗi chi tiết đều có ý nghĩa.</h2><p>Ánh sáng dịu. Nhịp độ vừa đủ. Một khoảng thời gian để bạn chú ý hơn đến cảm nhận của mình.</p></div>
      <figure data-route-frame><img src="/images/edition-experience-ritual.webp" width="1600" height="1000" alt="Khăn mềm và vật dụng chăm sóc trong ánh sáng tự nhiên" loading="lazy" /></figure>
      <div className="experience-ritual__detail page-width"><span>Chọn điều phù hợp với mình.</span><Link href="/dich-vu" className="text-link">Tìm hiểu dịch vụ<ArrowIcon /></Link></div>
    </section>
    <section className="experience-close page-width"><figure data-route-drift><img src="/images/edition-experience-botanical.webp" width="1024" height="1280" alt="Hoa sen và chất liệu đá trong ánh sáng dịu" loading="lazy" /></figure><div data-route-copy><span className="journey-label">03 / Tiếp nối</span><h2>Chăm sóc là một thói quen.</h2><p>Những lựa chọn nhỏ mỗi ngày cũng đáng được quan tâm. Đọc thêm về cách xây dựng thói quen chăm sóc và những câu hỏi nên chuẩn bị trước buổi tư vấn.</p><Link href="/kien-thuc" className="text-link">Ghé góc kiến thức<ArrowIcon /></Link></div></section>
    <Consultation /><RouteMotion targetId="experience-page" />
  </div>
}
