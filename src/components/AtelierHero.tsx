import Link from 'next/link'
import { ArrowIcon } from './Icons'

export function AtelierHero() {
  return <section className="atelier-hero" aria-labelledby="atelier-title">
    <div className="atelier-hero__copy">
      <h1 id="atelier-title">Thẩm mỹ <em>khuôn mặt.</em></h1>
      <p>Tôn đường nét, cải thiện làn da. Tìm hiểu lựa chọn phù hợp với gương mặt và mong muốn của bạn.</p>
      <Link href="/dich-vu" className="button button-dark atelier-hero__cta">Khám phá dịch vụ <ArrowIcon /></Link>
      <a href="#bo-suu-tap" className="atelier-hero__discover"><span className="atelier-scroll-symbol" aria-hidden="true"><ArrowIcon /></span>Khám phá thế giới AZ FACE</a>
    </div>
    <div className="atelier-hero__composition" data-hero-composition>
      <figure className="atelier-hero__portrait" data-hero-main><img src="/images/campaign-hero-main.webp" alt="Vẻ đẹp tự nhiên trong ánh sáng buổi sớm" width="1600" height="1067" fetchPriority="high" /></figure>
      <figure className="atelier-hero__detail" data-hero-detail><img src="/images/campaign-hero-detail.webp" alt="Chi tiết làn da trong ánh sáng dịu" width="1000" height="1000" /></figure>
      <span className="atelier-hero__signature" aria-hidden="true">AZ FACE</span>
    </div>
    <div className="atelier-hero__bottom"><span>Tôn nét hài hòa. Giữ dấu ấn riêng.</span><a href="#dich-vu" aria-label="Cuộn đến dịch vụ"><ArrowIcon /></a></div>
  </section>
}
