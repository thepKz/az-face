import Link from 'next/link'
import { ArrowIcon } from './Icons'
import { FooterMotion } from './FooterMotion'
import './footer.css'

export function Footer() {
  return <footer className="az-footer-climax" id="az-footer-climax">
    <FooterMotion />
    <div className="az-footer-invitation">
      <Link className="az-footer-logo" href="/" aria-label="AZ FACE - Trang chủ"><img src="/brand/logo.svg" alt="" width="80" height="80" /></Link>
      <div><h2><Link href="/lien-he">Nói về điều bạn muốn thay đổi.<span className="az-footer-cta-icon"><ArrowIcon /></span></Link></h2><p className="az-footer-promise">Bắt đầu từ làn da, dáng mày và sắc môi của bạn.</p></div>
    </div>
    <div className="az-footer-stage">
      <div className="az-footer-utilities">
        <div className="az-footer-identity"><p>Tôn nét hài hòa. Giữ dấu ấn riêng.</p><span>CÔNG TY TNHH AZ FACE</span><span>Mã số thuế: 0402246363</span></div>
        <nav aria-label="Khám phá AZ FACE"><h3>Khám phá</h3><Link href="/gioi-thieu">Về AZ FACE</Link><Link href="/dich-vu">Dịch vụ</Link><Link href="/trai-nghiem">Trải nghiệm</Link></nav>
        <nav aria-label="Tìm hiểu thêm"><h3>Góc nhìn của bạn</h3><Link href="/bo-suu-tap">Bộ sưu tập</Link><Link href="/kien-thuc">Kiến thức</Link><Link href="/lien-he">Tư vấn khuôn mặt <ArrowIcon /></Link></nav>
      </div>
      <Link href="/" className="az-footer-display" aria-label="AZ FACE - Trang chủ"><span aria-hidden="true" className="az-footer-display-group">{'AZ'.split('').map((letter,index) => <span className="az-footer-letter" key={index}>{letter}</span>)}</span><span aria-hidden="true" className="az-footer-display-group">{'FACE'.split('').map((letter,index) => <span className="az-footer-letter" key={index}>{letter}</span>)}</span></Link>
      <div className="az-footer-baseline"><span>© {new Date().getFullYear()} AZ FACE</span><Link href="/chinh-sach-bao-mat">Quyền riêng tư</Link><a href="#top">Về đầu trang <ArrowIcon /></a></div>
    </div>
  </footer>
}
