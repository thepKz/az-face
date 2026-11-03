import Link from 'next/link'
import { ArrowIcon } from './Icons'
import './footer.css'

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-top page-width">
      <div className="footer-brand-block"><Link className="footer-brand" href="/" aria-label="AZ FACE - Trang chủ"><img src="/brand/logo.svg" alt="" width="80" height="80" /><span className="footer-wordmark">AZ FACE</span></Link><p className="footer-positioning">Thẩm mỹ khuôn mặt.</p><p>Tôn nét hài hòa. Giữ dấu ấn riêng.</p></div>
      <div className="footer-navigation"><h2>Khám phá AZ FACE</h2><nav aria-label="Điều hướng cuối trang"><Link href="/gioi-thieu">Về AZ FACE</Link><Link href="/dich-vu">Dịch vụ</Link><Link href="/trai-nghiem">Trải nghiệm</Link><Link href="/bo-suu-tap">Bộ sưu tập</Link><Link href="/kien-thuc">Kiến thức</Link></nav></div>
      <div className="footer-contact"><h2>Bạn cần tìm hiểu thêm?</h2><p>Chuẩn bị câu hỏi về phương pháp, chi phí và những điều cần cân nhắc.</p><Link href="/lien-he" className="button button-dark">Trao đổi nhu cầu <ArrowIcon /></Link><div className="footer-legal"><p>CÔNG TY TNHH AZ FACE</p><p>Mã số thuế: 0402246363</p></div></div>
    </div>
    <div className="footer-bottom page-width"><span>© {new Date().getFullYear()} AZ FACE</span><Link href="/chinh-sach-bao-mat">Quyền riêng tư</Link><a href="#top">Về đầu trang ↑</a></div>
  </footer>
}
