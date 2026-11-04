import { CollageArt } from '@/components/CollageArt'
import { pageText } from '@/i18n/page-messages'
import { useLocale } from 'next-intl'
import { getLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from '@/i18n/Link'
import { ArrowIcon } from '@/components/Icons'
import { ExperienceMotion } from '@/components/ExperienceMotion'
import { Consultation } from '@/components/Consultation'
import '@/components/JourneyPages.css'
import '@/components/experience-motion.css'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = pageText(locale)
 return { title: t("Trải nghiệm") } }

export default function ExperiencePage() {
  const locale = useLocale()
  const t = pageText(locale)

  return <div className="experience-page" id="experience-page">
    <section className="experience-opening collage-host"><CollageArt variant="bloom" />
      <figure><img src="/images/journey-experience-arrival.webp" width="1600" height="1000" alt={t("Không gian đón tiếp với ánh sáng dịu và vật liệu tự nhiên")} fetchPriority="high" /></figure>
      <div className="experience-opening__copy page-width"><h1>{t("Chậm lại một chút.")}</h1><p>{t("Dành thời gian cho làn da, cho cảm giác dễ chịu và cho những điều bạn muốn chăm chút.")}</p><a href="#lang-nghe" className="button button-light">{t("Bắt đầu hành trình")}<ArrowIcon /></a></div>
      <span className="experience-opening__index" aria-hidden="true">01 — 03</span>
    </section>
    <nav className="experience-compass" aria-label={locale === 'en' ? 'Your visit, in three stages' : 'Ba chặng trải nghiệm'}>
      <a href="#lang-nghe" data-experience-link="0">{t("01 / Lắng nghe")}</a>
      <a href="#cham-chut" data-experience-link="1">{t("02 / Chăm chút")}</a>
      <a href="#tiep-noi" data-experience-link="2">{t("03 / Tiếp nối")}</a>
      <span className="experience-compass__track" aria-hidden="true"><span /></span>
    </nav>
    <section className="experience-chapter page-width collage-host" id="lang-nghe"><CollageArt variant="glass" />
      <div className="experience-chapter__copy" data-route-copy><span className="journey-label">{t("01 / Lắng nghe")}</span><h2>{t("Bắt đầu bằng câu chuyện của bạn.")}</h2><p>{t("Bạn đang quan tâm đến điều gì? Thói quen chăm sóc hiện tại có điểm nào chưa phù hợp? Một cuộc trao đổi rõ ràng giúp bạn biết mình cần hỏi gì trước khi lựa chọn.")}</p><Link href="/lien-he" className="text-link">{t("Chuẩn bị nội dung trao đổi")}<ArrowIcon /></Link></div>
      <figure className="experience-chapter__image" data-route-frame><img src="/images/journey-experience-rest.webp" width="1024" height="1280" loading="lazy" alt={t("Khoảnh khắc nghỉ ngơi trong không gian chăm sóc")} /></figure>
    </section>
    <section className="experience-ritual collage-host" id="cham-chut"><CollageArt variant="silk" />
      <div className="page-width experience-ritual__heading" data-route-copy><span className="journey-label">{t("02 / Chăm chút")}</span><h2>{t("Mỗi chi tiết đều có ý nghĩa.")}</h2><p>{t("Ánh sáng dịu. Nhịp độ vừa đủ. Một khoảng thời gian để bạn chú ý hơn đến cảm nhận của mình.")}</p></div>
      <figure data-route-frame><img src="/images/edition-experience-ritual.webp" width="1600" height="1000" alt={t("Khăn mềm và vật dụng chăm sóc trong ánh sáng tự nhiên")} loading="lazy" /></figure>
      <div className="experience-ritual__detail page-width"><span>{t("Chọn điều phù hợp với mình.")}</span><Link href="/dich-vu" className="text-link">{t("Tìm hiểu dịch vụ")}<ArrowIcon /></Link></div>
    </section>
    <section className="experience-close page-width collage-host" id="tiep-noi"><CollageArt variant="atelier" /><figure><img src="/images/edition-experience-botanical.webp" width="1024" height="1280" alt={t("Hoa sen và chất liệu đá trong ánh sáng dịu")} loading="lazy" /></figure><div><span className="journey-label">{t("03 / Tiếp nối")}</span><h2>{t("Chăm sóc là một thói quen.")}</h2><p>{t("Những lựa chọn nhỏ mỗi ngày cũng đáng được quan tâm. Đọc thêm về cách xây dựng thói quen chăm sóc và những câu hỏi nên chuẩn bị trước buổi tư vấn.")}</p><Link href="/kien-thuc" className="text-link">{t("Ghé góc kiến thức")}<ArrowIcon /></Link></div></section>
    <Consultation /><ExperienceMotion />
  </div>
}
