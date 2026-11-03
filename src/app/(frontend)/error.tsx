'use client'

import { pageText } from '@/i18n/page-messages'
import { useLocale } from 'next-intl'

import Link from '@/i18n/Link'
import { ArrowIcon } from '@/components/Icons'
import '@/components/quiet-pages.css'
export default function ErrorPage({ reset }: { reset: () => void }) {
  const locale = useLocale()
  const t = pageText(locale)

  return <section className="qp-failure"><img src="/brand/logo.svg" alt="" width="85" height="85" /><h1>{t("Hãy dành một khoảng.")} <em>{t("Chúng ta thử lại nhé.")}</em></h1><p>{t("Trang chưa thể tải đầy đủ vào lúc này. Bạn có thể tải lại hoặc trở về trang chủ để tiếp tục.")}</p><div><button className="button button-dark" onClick={reset}>{t("Thử tải lại")}<ArrowIcon /></button><Link href="/" className="qp-link">{t("Về trang chủ")}<ArrowIcon /></Link></div></section>
}
