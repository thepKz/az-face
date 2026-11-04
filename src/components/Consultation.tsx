import { pageText } from '@/i18n/page-messages'
import { useLocale } from 'next-intl'
import Link from '@/i18n/Link'
import { ArrowIcon } from './Icons'
import { CollageArt } from './CollageArt'

export function Consultation() {
  const locale = useLocale()
  const t = pageText(locale)

  return <section className="consultation-section collage-host"><CollageArt variant="ribbon" /><div className="page-width consultation-inner"><h2>{t("Bạn muốn cải thiện")} <em>{t("điều gì?")}</em></h2><div><Link href="/lien-he" className="button button-light">{t("Trao đổi nhu cầu")} <ArrowIcon /></Link></div></div></section>
}
