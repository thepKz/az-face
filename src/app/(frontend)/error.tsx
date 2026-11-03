'use client'
import Link from 'next/link'
import { ArrowIcon } from '@/components/Icons'
import '@/components/quiet-pages.css'
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <section className="qp-failure"><img src="/brand/logo.svg" alt="" width="85" height="85" /><h1>Hãy dành một khoảng. <em>Chúng ta thử lại nhé.</em></h1><p>Trang chưa thể tải đầy đủ vào lúc này. Bạn có thể tải lại hoặc trở về trang chủ để tiếp tục.</p><div><button className="button button-dark" onClick={reset}>Thử tải lại<ArrowIcon /></button><Link href="/" className="qp-link">Về trang chủ<ArrowIcon /></Link></div></section>
}
