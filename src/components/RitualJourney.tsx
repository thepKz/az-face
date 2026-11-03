import Link from 'next/link'
import { ArrowIcon } from './Icons'

export function RitualJourney() {
  return <section className="ritual-journey" id="trai-nghiem" aria-labelledby="ritual-title">
    <div className="ritual-journey__visual" data-ritual-visual>
      <img src="/images/campaign-ritual-wide.webp" alt="Khoảnh khắc chăm sóc trong không gian yên tĩnh" width="1600" height="1000" loading="lazy" />
      <div className="ritual-journey__inset" data-ritual-inset><img src="/images/journal-care.webp" alt="Tĩnh vật chăm sóc cá nhân minh họa" width="600" height="750" loading="lazy" /></div>
    </div>
    <div className="ritual-journey__copy"><h2 id="ritual-title">Hiểu rõ <em>trước khi chọn.</em></h2><p>Một buổi tư vấn cần giúp bạn hiểu lựa chọn của mình.</p>
      <ol className="ritual-steps">
        <li data-ritual-step><span>01</span><div><h3>Trao đổi mong muốn</h3><p>Nêu vùng bạn muốn cải thiện và kết quả bạn mong đợi.</p></div></li>
        <li data-ritual-step><span>02</span><div><h3>Tìm hiểu phương pháp</h3><p>Làm rõ phạm vi, chi phí, thời gian hồi phục và rủi ro.</p></div></li>
        <li data-ritual-step><span>03</span><div><h3>Cân nhắc quyết định</h3><p>Hỏi lại những điểm chưa rõ trước khi lựa chọn dịch vụ.</p></div></li>
      </ol>
      <Link href="/lien-he" className="button button-outline-light">Trao đổi cùng AZ FACE <ArrowIcon /></Link>
    </div>
  </section>
}
