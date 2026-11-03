'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import logo from '../../public/brand/logo-layers.json'
import './brand-signature.css'

export function BrandSignature() {
  const en = useLocale() === 'en'
  const sectionRef = useRef<HTMLElement>(null)
  const playRef = useRef<(() => void) | null>(null)
  const [ready, setReady] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const id = useId()

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const layers = section.querySelectorAll<SVGGElement>('[data-signature-layer]')
    let disposed = false
    let played = false
    let observer: IntersectionObserver | undefined
    let stop = () => {}
    const onPreference = () => {
      setReduced(preference.matches)
      if (preference.matches) {
        played = true
        stop()
        observer?.disconnect()
      }
    }
    const onVisibility = () => {
      if (document.hidden) {
        played = true
        stop()
        observer?.disconnect()
      }
    }
    onPreference()
    preference.addEventListener('change', onPreference)
    document.addEventListener('visibilitychange', onVisibility)

    import('gsap').then(({ gsap }) => {
      if (disposed) return
      let timeline: ReturnType<typeof gsap.timeline> | undefined
      stop = () => {
        timeline?.kill()
        gsap.set(layers, { clearProps: 'opacity' })
      }
      const play = () => {
        if (preference.matches || document.hidden) return
        played = true
        observer?.disconnect()
        stop()
        // Keep the traced artwork registered; only light changes across its layers.
        timeline = gsap.timeline({ onComplete: () => gsap.set(layers, { clearProps: 'opacity' }) })
        timeline.fromTo(layers, { opacity: 0.25 }, {
          opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
        })
      }
      playRef.current = play
      setReady(true)
      if (!played && !preference.matches && !document.hidden && 'IntersectionObserver' in window) {
        observer = new IntersectionObserver(entries => {
          if (entries.some(entry => entry.isIntersecting) && !played) play()
        }, { threshold: 0.15 })
        observer.observe(section)
      }
    }).catch(() => {
      // The complete SVG remains visible when the optional animation cannot load.
    })

    return () => {
      disposed = true
      observer?.disconnect()
      preference.removeEventListener('change', onPreference)
      document.removeEventListener('visibilitychange', onVisibility)
      playRef.current = null
      stop()
    }
  }, [])

  return (
    <section className="brand-signature" ref={sectionRef} aria-labelledby={`${id}-heading`}>
      <div className="brand-signature__art">
        <svg viewBox={logo.viewBox} fill={logo.color} role="img" aria-labelledby={`${id}-logo-title`}>
          <title id={`${id}-logo-title`}>{en ? 'AZ FACE: facial contours and wordmark' : 'AZ FACE — đường nét gương mặt và chữ nhận diện'}</title>
          {(['hair', 'face', 'monogram', 'wordmark'] as const).map(layer => (
            <g key={layer} data-signature-layer={layer}><path d={logo.paths[layer]} /></g>
          ))}
        </svg>
        <button className="brand-signature__replay" type="button" disabled={!ready || reduced}
          onClick={() => playRef.current?.()} aria-describedby={`${id}-motion-note`}>
          {en ? 'Replay the logo animation' : 'Phát lại chuyển động logo'}
        </button>
        <p className="brand-signature__note" id={`${id}-motion-note`}>
          {reduced ? (en ? 'A still logo respects your reduced-motion preference.' : 'Logo tĩnh theo tùy chọn giảm chuyển động của bạn.') : (en ? 'A quiet movement from contours to a name.' : 'Một chuyển động nhẹ, từ đường nét đến tên gọi.')}
        </p>
      </div>
      <div className="brand-signature__copy">
        <h2 id={`${id}-heading`}>{en ? 'Character, from the first glance.' : 'Nét riêng, từ cái nhìn đầu tiên.'}</h2>
        <p>{en ? 'A line of hair frames the face, leaving space between the letters. Each element has its place in the AZ FACE identity.' : 'Đường tóc ôm lấy gương mặt, để lại một khoảng thoáng giữa những nét chữ. Trong dấu ấn AZ FACE, mỗi phần có chỗ của mình.'}</p>
        <p>{en ? 'Our approach starts with what matters to you: your skin, brows and lips, and the questions that help you decide what comes next.' : 'Đó cũng là tinh thần của AZ FACE: bắt đầu từ điều bạn quan tâm, tìm hiểu nhu cầu chăm sóc da, dáng mày và sắc môi, rồi cùng trao đổi bước tiếp theo.'}</p>
        <button type="button" className="brand-signature__video-toggle" aria-expanded={videoOpen}
          aria-controls={`${id}-video`} onClick={() => { setVideoOpen(!videoOpen); setVideoError(false) }}>
          {videoOpen ? (en ? 'Close brand film' : 'Đóng video nhận diện') : (en ? 'Watch brand film' : 'Xem video nhận diện')}
        </button>
        <div id={`${id}-video`} hidden={!videoOpen} className="brand-signature__video">
          {videoOpen && <>
            <video controls playsInline preload="none" poster="/brand/az-face-poster.png"
              src="/brand/az-face-intro.mp4" aria-label={en ? 'AZ FACE animated logo film' : 'Video chuyển động logo AZ FACE'}
              onError={() => setVideoError(true)}>
              {en ? 'Your browser does not support video. The still logo is shown alongside it.' : 'Trình duyệt của bạn không hỗ trợ video. Logo tĩnh được hiển thị bên cạnh.'}
            </video>
            <p className="brand-signature__note" role={videoError ? 'status' : undefined}>
              {videoError ? (en ? 'The video could not load. You can view the logo or close and reopen the video to try again.' : 'Chưa tải được video. Bạn vẫn có thể xem logo hoặc đóng và mở lại video để thử lại.') : (en ? 'AZ FACE in motion. Press play to watch.' : 'Chuyển động nhận diện AZ FACE. Nhấn phát để xem.')}
            </p>
          </>}
        </div>
      </div>
    </section>
  )
}
