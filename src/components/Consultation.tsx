import Link from 'next/link'
import { ArrowIcon } from './Icons'

export function Consultation() {
  return <section className="consultation-section"><div className="page-width consultation-inner"><h2>Một cuộc hẹn <em>với chính mình.</em></h2><div><Link href="/lien-he" className="button button-light">Trao đổi nhu cầu <ArrowIcon /></Link></div></div></section>
}
