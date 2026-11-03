import Link from 'next/link'
import { ArrowIcon } from '@/components/Icons'
import '@/components/quiet-pages.css'
export default function NotFound() {
  return <section className="qp-missing"><div className="qp-missing-copy"><span className="qp-error-code" aria-label="Lỗi 404">404</span><h1>Một lối rẽ. <em>Một khám phá khác.</em></h1><p>Trang bạn tìm có thể đã thay đổi hoặc không còn được hiển thị. Bạn vẫn có thể tiếp tục hành trình từ đây.</p><Link href="/" className="button button-dark">Về trang chủ<ArrowIcon /></Link><Link href="/kien-thuc" className="qp-link">Tìm một bài đọc mới<ArrowIcon /></Link></div><figure className="qp-missing-image"><img src="/images/editorial-botanical.webp" alt="" width="1024" height="1280" /><span aria-hidden="true">AZ FACE</span></figure></section>
}
