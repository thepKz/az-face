import Link from 'next/link'
import { ArrowIcon } from './Icons'

export function RitualJourney() {
  return <section className="ritual-journey" id="trai-nghiem" aria-labelledby="ritual-title">
    <div className="ritual-journey__visual" data-ritual-visual>
      <img src="/images/campaign-ritual-wide.webp" alt="Khoảnh khắc chăm sóc trong không gian yên tĩnh" width="1600" height="1000" loading="lazy" />
      <div className="ritual-journey__inset" data-ritual-inset><img src="/images/journal-care.webp" alt="Tĩnh vật chăm sóc cá nhân minh họa" width="600" height="750" loading="lazy" /></div>
    </div>
    <div className="ritual-journey__copy"><h2 id="ritual-title">Chậm lại <em>một chút.</em></h2><p>Mỗi trải nghiệm bắt đầu bằng sự lắng nghe.</p>
      <ol className="ritual-steps">
        <li data-ritual-step><span>01</span><div><h3>Gặp gỡ</h3><p>Chia sẻ điều bạn muốn chăm sóc.</p></div></li>
        <li data-ritual-step><span>02</span><div><h3>Thấu hiểu</h3><p>Làm rõ lựa chọn, phạm vi và chi phí.</p></div></li>
        <li data-ritual-step><span>03</span><div><h3>Nâng niu</h3><p>Cân nhắc trải nghiệm theo nhu cầu của bạn.</p></div></li>
      </ol>
      <Link href="/lien-he" className="button button-outline-light">Trao đổi cùng AZ FACE <ArrowIcon /></Link>
    </div>
  </section>
}
