'use client'

import { usePathname } from 'next/navigation'

export function RouteArrival() {
  const pathname = usePathname()
  return <div key={pathname} className="route-arrival" aria-hidden="true"><span /><span /></div>
}
