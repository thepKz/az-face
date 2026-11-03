import Link from '@/i18n/Link'
import { useLocale } from 'next-intl'
import { ArrowIcon } from './Icons'

export function RitualJourney() {
  const en = useLocale() === 'en'
  return <section className="ritual-journey" id="trai-nghiem" aria-labelledby="ritual-title">
    <div className="ritual-journey__visual" data-ritual-visual>
      <img src="/images/campaign-ritual-wide.webp" alt={en ? 'Illustrative skin care moment in a calm setting' : 'Khoảnh khắc chăm sóc trong không gian yên tĩnh'} width="1600" height="1000" loading="lazy" />
      <div className="ritual-journey__inset" data-ritual-inset><img src="/images/journal-care.webp" alt={en ? 'Illustrative skin care still life' : 'Tĩnh vật chăm sóc cá nhân minh họa'} width="600" height="750" loading="lazy" /></div>
    </div>
    <div className="ritual-journey__copy"><h2 id="ritual-title">{en ? 'Understand ' : 'Hiểu rõ '}<em>{en ? 'before you choose.' : 'trước khi chọn.'}</em></h2><p>{en ? 'A consultation should help you understand your options.' : 'Một buổi tư vấn cần giúp bạn hiểu lựa chọn của mình.'}</p>
      <ol className="ritual-steps">
        <li data-ritual-step><span>01</span><div><h3>{en ? 'Share your goals' : 'Trao đổi mong muốn'}</h3><p>{en ? 'Describe the area you want to address and the result you have in mind.' : 'Nêu vùng bạn muốn cải thiện và kết quả bạn mong đợi.'}</p></div></li>
        <li data-ritual-step><span>02</span><div><h3>{en ? 'Understand the approach' : 'Tìm hiểu phương pháp'}</h3><p>{en ? 'Ask about the scope, costs, recovery time and risks.' : 'Làm rõ phạm vi, chi phí, thời gian hồi phục và rủi ro.'}</p></div></li>
        <li data-ritual-step><span>03</span><div><h3>{en ? 'Consider your decision' : 'Cân nhắc quyết định'}</h3><p>{en ? 'Clarify anything you are unsure of before choosing a service.' : 'Hỏi lại những điểm chưa rõ trước khi lựa chọn dịch vụ.'}</p></div></li>
      </ol>
      <Link href="/lien-he" className="button button-outline-light">{en ? 'Talk to AZ FACE' : 'Trao đổi cùng AZ FACE'} <ArrowIcon /></Link>
    </div>
  </section>
}
