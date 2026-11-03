'use client'

import { pageText } from '@/i18n/page-messages'
import { useLocale } from 'next-intl'

import { useEffect, useRef, useState } from 'react'
import Link from '@/i18n/Link'
import type { Service } from '@/content/site'
import { ArrowIcon, CheckIcon } from './Icons'

export function ContactForm({ initialService = '', services }: { initialService?: string; services: Service[] }) {
  const locale = useLocale()
  const t = pageText(locale)

  const [interactive, setInteractive] = useState(false)
  useEffect(() => { setInteractive(true) }, [])
  const [selection, setSelection] = useState(services.some(s => s.slug === initialService) ? initialService : '')
  const [complete, setComplete] = useState(false)
  const [summary, setSummary] = useState({ name: '', note: '', service: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const success = useRef<HTMLHeadingElement>(null)
  const form = useRef<HTMLFormElement>(null)
  useEffect(() => {
    if (complete) success.current?.focus()
    else if (summary.name) form.current?.querySelector<HTMLInputElement>('[name="name"]')?.focus()
  }, [complete, summary.name])
  if (complete) return <div className="form-success"><span className="success-mark"><CheckIcon /></span><h3 ref={success} tabIndex={-1}>{t("Nội dung trao đổi của bạn.")}</h3><p><strong>{summary.name}</strong> · {summary.service}</p>{summary.note && <p>{summary.note}</p>}<p role="status">{t("Kiểm tra nội dung và điều chỉnh nếu cần.")}</p><button className="button button-dark" onClick={() => { setComplete(false); setErrors({}) }}>{t("Chỉnh sửa nội dung")} <ArrowIcon /></button><Link href="/dich-vu" className="text-link">{t("Tiếp tục khám phá dịch vụ")}</Link></div>
  return <form ref={form} className="contact-form" noValidate onSubmit={event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const nextErrors: Record<string, string> = {}
    if (String(data.get('name') || '').trim().length < 2) nextErrors.name = t("Nhập tên xưng hô có ít nhất 2 ký tự.")
    if (!selection) nextErrors.service = t("Chọn điều bạn muốn tìm hiểu.")
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      const target = nextErrors.name ? '[name="name"]' : '[name="service"]'
      form.current?.querySelector<HTMLElement>(target)?.focus()
      return
    }
    setSummary({ name: String(data.get('name') || '').trim(), note: String(data.get('note') || '').trim(), service: services.find(service => service.slug === selection)?.title || t("Tôi muốn tìm hiểu thêm") })
    setComplete(true)
  }}>
    <div className="form-intro"><h3>{t("Bắt đầu bằng điều bạn quan tâm.")}</h3><p>{t("Chọn nhu cầu và ghi lại câu hỏi để xem lại trước khi trao đổi.")}</p></div>
    <noscript><p>{t("Bật JavaScript để xem nội dung trao đổi trên thiết bị của bạn.")}</p></noscript>
    <fieldset disabled={!interactive} className="demo-fields">
    <div className="field"><label htmlFor="demo-name">{t("Tên xưng hô")}</label><input id="demo-name" name="name" autoComplete="off" maxLength={80} defaultValue={summary.name} placeholder={t("Bạn muốn được gọi như thế nào?")} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} required />{errors.name && <p className="field-error" id="name-error">{errors.name}</p>}</div>
    <div className="field"><label htmlFor="demo-service">{t("Bạn muốn tìm hiểu về")}</label><select id="demo-service" name="service" value={selection} onChange={e => setSelection(e.target.value)} aria-invalid={!!errors.service} aria-describedby={errors.service ? 'service-error' : undefined} required><option value="">{t("Chọn nhóm nhu cầu")}</option>{services.map(s => <option value={s.slug} key={s.slug}>{s.title}</option>)}<option value="tim-hieu-them">{t("Tôi muốn tìm hiểu thêm")}</option></select>{errors.service && <p className="field-error" id="service-error">{errors.service}</p>}</div>
    <div className="field"><label htmlFor="demo-note">{t("Điều muốn trao đổi")} <span>{t("(không bắt buộc)")}</span></label><textarea id="demo-note" name="note" rows={3} maxLength={300} defaultValue={summary.note} placeholder={t("Ví dụ: Tôi muốn hiểu các bước của một buổi chăm sóc.")} /></div>
    <button className="button button-dark form-submit" type="submit">{t("Xem nội dung trao đổi")} <ArrowIcon /></button>
    </fieldset>
    <p className="form-privacy"><Link href="/chinh-sach-bao-mat">{t("Quyền riêng tư của bạn.")}</Link></p>
  </form>
}
