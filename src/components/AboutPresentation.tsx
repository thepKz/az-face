import Link from 'next/link'
import { ArrowIcon } from './Icons'
import { BrandSignature } from './BrandSignature'
import { Consultation } from './Consultation'
import { RouteMotion } from './RouteMotion'
import './about-presentation.css'

export function AboutPresentation() {
  return <div className="az-about" id="az-about-route">
    <RouteMotion targetId="az-about-route" />
    <section className="az-about__hero" data-route-hero>
      <img src="/images/journey-about-hero.webp" alt="Không gian hành lang với ánh sáng tự nhiên và vật liệu sáng" width="1600" height="1000" fetchPriority="high" data-route-hero-image />
      <div className="az-about__hero-copy"><h1>AZ FACE. Thẩm mỹ khuôn mặt.</h1><p>Tập trung vào làn da và đường nét gương mặt, từ điều bạn muốn cải thiện đến nét riêng bạn muốn giữ.</p><a href="#cau-chuyen-az" className="az-about__explore">Bước vào câu chuyện <ArrowIcon /></a></div>
    </section>
    <section className="az-about__opening" id="cau-chuyen-az">
      <h2 data-route-copy>Vẻ đẹp bắt đầu từ sự thấu hiểu.</h2>
      <div data-route-copy><p>Điều bạn muốn thay đổi, điều bạn muốn giữ lại. Mỗi cuộc trò chuyện bắt đầu từ chính bạn.</p><Link href="/dich-vu" className="text-link">Tìm hiểu cách chăm sóc <ArrowIcon /></Link></div>
    </section>
    <section className="az-about__mosaic" aria-label="Tinh thần chăm sóc tại AZ FACE">
      <figure className="az-about__mosaic-tall" data-route-frame><img src="/images/journey-about-portrait.webp" alt="Chân dung người trưởng thành trong ánh sáng dịu" width="1024" height="1280" loading="lazy" /></figure>
      <div className="az-about__mosaic-copy" data-route-copy><h2>Giữ nét riêng.<em> Thêm sự chăm chút.</em></h2><p>Không cần một khuôn mẫu chung. Có những lựa chọn phù hợp với sở thích và nhịp sống của bạn.</p></div>
      <figure className="az-about__mosaic-detail" data-route-drift><img src="/images/journey-about-detail.webp" alt="Đôi tay nâng bát gốm màu xanh trong ánh nắng" width="1000" height="1000" loading="lazy" /></figure>
    </section>
    <section className="az-about__philosophy">
      <div className="az-about__philosophy-art" data-route-drift><img src="/images/journey-about-atmosphere.webp" alt="Ánh sáng và không gian gợi cảm giác thư thái" width="1400" height="1100" loading="lazy" /></div>
      <div className="az-about__principles"><h2 data-route-copy>Chăm sóc bằng sự rõ ràng.</h2>
        <div data-route-copy><h3>Lắng nghe trước.</h3><p>Nói về điều bạn quan tâm và những câu hỏi còn để ngỏ.</p></div>
        <div data-route-copy><h3>Giải thích dễ hiểu.</h3><p>Biết phạm vi, từng bước và điều cần cân nhắc trước khi chọn.</p></div>
        <div data-route-copy><h3>Giữ sự chủ động.</h3><p>Dành thời gian tìm hiểu. Quyết định theo nhịp của bạn.</p></div>
      </div>
    </section>
    <BrandSignature />
    <p className="az-about__legal">CÔNG TY TNHH AZ FACE · Mã số thuế 0402246363.</p>
    <Consultation />
  </div>
}
