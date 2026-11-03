import Link from 'next/link'
import { ArrowIcon } from './Icons'

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-top page-width">
      <div><Link className="footer-wordmark" href="/">AZ FACE</Link><p>Chăm chút nét riêng của bạn.</p></div>
      <nav aria-label="Điều hướng cuối trang"><Link href="/gioi-thieu">Về AZ FACE</Link><Link href="/dich-vu">Dịch vụ</Link><Link href="/trai-nghiem">Trải nghiệm</Link><Link href="/bo-suu-tap">Bộ sưu tập</Link><Link href="/kien-thuc">Kiến thức</Link><Link href="/lien-he">Trao đổi nhu cầu <ArrowIcon /></Link></nav>
      <div className="footer-legal"><p>CÔNG TY TNHH AZ FACE</p><p>Mã số thuế: 0402246363</p></div>
    </div>
    <div className="footer-bottom page-width"><span>© {new Date().getFullYear()} AZ FACE</span><Link href="/chinh-sach-bao-mat">Quyền riêng tư</Link><a href="#top">Về đầu trang ↑</a></div>
  </footer>
}
