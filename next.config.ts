import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
const config: NextConfig = {
  reactStrictMode: true, poweredByHeader: false, devIndicators: false,
  agentRules: false,
  turbopack: { root: process.cwd() },
  async headers() { return [{ source: '/:path*', headers: [
    { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  ] }] },
}
export default createNextIntlPlugin('./src/i18n/request.ts')(config)
