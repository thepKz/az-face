export function SectionBridge({ tone }: { tone: 'sage' | 'forest' }) {
  return <div className={`section-bridge section-bridge--${tone}`} aria-hidden="true" data-section-bridge>
    <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
      <path data-morph-edge d="M0 130 C360 10 960 200 1440 45 L1440 200 L0 200 Z" />
    </svg>
  </div>
}
