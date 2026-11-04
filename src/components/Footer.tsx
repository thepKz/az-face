import Link from '@/i18n/Link'
import { getTranslations } from 'next-intl/server'
import { ArrowIcon } from './Icons'
import { FooterMotion } from './FooterMotion'
import './footer.css'

export async function Footer() {
  const [t, f] = await Promise.all([getTranslations('common'), getTranslations('footer')])
  return <footer className="az-footer-climax" id="az-footer-climax">
    <FooterMotion />
    <div className="az-footer-invitation az-footer-finale">
      <Link className="az-footer-logo" href="/" aria-label={t('homeLabel')}><img src="/brand/logo.svg" alt="" width="80" height="80" /></Link>
      <div><h2><Link href="/lien-he">{f('invitation')}<span className="az-footer-cta-icon"><ArrowIcon /></span></Link></h2><p className="az-footer-promise">{f('promise')}</p></div>
      <div className="az-footer-art" aria-hidden="true">
        <span className="az-footer-orbit az-footer-orbit--outer" /><span className="az-footer-orbit az-footer-orbit--inner" />
        <img className="az-footer-arc" src="/images/elements/champagne-arc.webp" alt="" width="1000" height="1000" loading="lazy" />
        <svg className="az-footer-portrait" viewBox="0 0 600 700"><defs><clipPath id="footer-portrait-window"><path d="M80 40 C210 5 440 5 520 100 C585 180 585 500 520 610 C450 700 180 700 80 610 C5 530 5 180 80 40 Z" /></clipPath></defs><image href="/images/brand-choice-kbeauty.webp" width="600" height="700" preserveAspectRatio="xMidYMid slice" clipPath="url(#footer-portrait-window)" /></svg>
        <img className="az-footer-orchid" src="/images/elements/pearl-orchid.webp" alt="" width="1000" height="1000" loading="lazy" />
        <img className="az-footer-pearls" src="/images/elements/pearl-cluster.webp" alt="" width="1000" height="1000" loading="lazy" />
      </div>
    </div>
    <div className="az-footer-stage">
      <div className="az-footer-utilities">
        <div className="az-footer-identity"><p>{f('statement')}</p><span>CÔNG TY TNHH AZ FACE</span><span>{f('tax')}</span></div>
        <nav aria-label={f('exploreLabel')}><h3>{f('explore')}</h3><Link href="/gioi-thieu">{t('about')}</Link><Link href="/dich-vu">{t('services')}</Link><Link href="/trai-nghiem">{t('experience')}</Link></nav>
        <nav aria-label={f('moreLabel')}><h3>{f('more')}</h3><Link href="/bo-suu-tap">{t('collection')}</Link><Link href="/kien-thuc">{t('journal')}</Link><Link href="/lien-he">{f('contact')} <ArrowIcon /></Link></nav>
      </div>
      <Link href="/" className="az-footer-display" aria-label={t('homeLabel')}><span aria-hidden="true" className="az-footer-display-group">{'AZ'.split('').map((letter,index) => <span className="az-footer-letter" key={index}>{letter}</span>)}</span><span aria-hidden="true" className="az-footer-display-group">{'FACE'.split('').map((letter,index) => <span className="az-footer-letter" key={index}>{letter}</span>)}</span></Link>
      <div className="az-footer-baseline"><span>© {new Date().getFullYear()} AZ FACE</span><Link href="/chinh-sach-bao-mat">{t('privacy')}</Link><a href="#top">{t('top')} <ArrowIcon /></a></div>
    </div>
  </footer>
}
