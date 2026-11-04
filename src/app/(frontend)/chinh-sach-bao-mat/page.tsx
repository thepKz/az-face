import { CollageArt } from '@/components/CollageArt'
import { pageText } from '@/i18n/page-messages'
import { useLocale } from 'next-intl'
import { getLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from '@/i18n/Link'
import { ArrowIcon } from '@/components/Icons'
import { JournalMotion } from '@/components/JournalMotion'
import '@/components/quiet-pages.css'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = pageText(locale)
 return { title: t("Quyền riêng tư") } }
export default function PrivacyPage() {
  const locale = useLocale()
  const t = pageText(locale)

  return <JournalMotion className="qp-page"><div className="qp-shell"><nav className="qp-breadcrumb" aria-label={t("Đường dẫn")}><Link href="/">{t("Trang chủ")}</Link><span aria-hidden="true">/</span><span>{t("Quyền riêng tư")}</span></nav><header className="qp-heading collage-host" data-journal-arrival><CollageArt variant="atelier" /><div><h1>{t("Sự riêng tư.")} <em>{t("Sự an tâm.")}</em></h1><p>{t("Cách AZ FACE xử lý thông tin khi bạn đọc nội dung và chuẩn bị một cuộc trao đổi.")}</p><time dateTime="2026-11-03">{t("Cập nhật ngày 03/11/2026")}</time></div><div className="qp-brand-frame" aria-hidden="true"><img src="/brand/logo.svg" alt="" width="140" height="140" /><span>{t("AZ FACE")}</span></div></header><div className="qp-reading-layout"><aside className="qp-contents"><p>{t("Nội dung trang")}</p><nav aria-label={t("Mục lục quyền riêng tư")}><a href="#noi-dung-trao-doi">{t("Nội dung trao đổi")}</a><a href="#thong-tin-rieng">{t("Thông tin cá nhân")}</a><a href="#cookie">{t("Cookie và dữ liệu kỹ thuật")}</a><a href="#thay-doi">{t("Thay đổi chức năng")}</a></nav></aside><article className="qp-reading"><section id="noi-dung-trao-doi"><h2>{t("Nội dung trao đổi trên thiết bị của bạn.")}</h2><p>{t("Biểu mẫu “Trao đổi nhu cầu” giúp bạn chuẩn bị và xem lại câu hỏi. Nội dung chỉ được xử lý trong bộ nhớ của trang đang mở, không gửi tới máy chủ, email, CRM hoặc cơ sở dữ liệu.")}</p><p>{t("Chức năng này không tạo lịch hẹn. Tải lại hoặc rời trang sẽ xóa trạng thái biểu mẫu.")}</p></section><section id="thong-tin-rieng"><h2>{t("Thông tin nên giữ riêng.")}</h2><p>{t("Không nhập hồ sơ sức khỏe, ảnh cá nhân, số điện thoại hoặc thông tin nhạy cảm vào phần ghi chú. Bạn không cần cung cấp những dữ liệu này để đọc nội dung hoặc chuẩn bị câu hỏi.")}</p></section><section id="cookie"><h2>{t("Cookie và dữ liệu kỹ thuật.")}</h2><p>{t("Website không cài pixel quảng cáo, analytics bên thứ ba hoặc session replay. Khu vực quản trị sử dụng cookie phiên cần thiết để đăng nhập và bảo vệ nội dung.")}</p><p>{t("Máy chủ hoặc hạ tầng lưu trữ có thể tạo log kỹ thuật khi phục vụ trang; nội dung biểu mẫu không được đưa vào log.")}</p></section><section id="thay-doi"><h2>{t("Thay đổi chức năng.")}</h2><p>{t("Nếu website bổ sung chức năng tiếp nhận liên hệ, thông tin về mục đích xử lý, người tiếp nhận, thời hạn lưu trữ và quyền của người dùng cần được công bố trước khi dữ liệu được thu thập.")}</p></section><Link href="/lien-he" className="qp-link">{t("Trở lại nội dung trao đổi")}<ArrowIcon /></Link></article></div></div></JournalMotion>
}
