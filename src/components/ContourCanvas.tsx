'use client'

import { useEffect, useRef } from 'react'

type ContourCanvasProps = { className?: string }

export function ContourCanvas({ className }: ContourCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    const context = canvas?.getContext('2d', { alpha: true })
    if (!canvas || !parent || !context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    let width = 0
    let height = 0
    let frame = 0
    let visible = false
    let previousTime = 0
    let phase = 0
    let pointerX = 0
    let pointerY = 0
    let easedX = 0
    let easedY = 0
    let disposed = false

    const draw = () => {
      if (!width || !height) return
      context.clearRect(0, 0, width, height)
      const portrait = width < 700
      const centerX = width * (portrait ? 0.5 : 0.57)
      const centerY = height * 0.5
      const radiusX = Math.min(width * (portrait ? 0.24 : 0.17), height * 0.34)
      const radiusY = height * 0.32
      const driftX = reducedMotion.matches ? 0 : easedX * 9
      const driftY = reducedMotion.matches ? 0 : easedY * 6

      context.save()
      // Keep the portrait's oval breathing space clear even when the rings drift.
      context.beginPath()
      context.rect(0, 0, width, height)
      context.ellipse(centerX, centerY, radiusX * 0.95, radiusY * 0.96, 0, 0, Math.PI * 2)
      context.clip('evenodd')

      for (let ring = 0; ring < 23; ring += 1) {
        const depth = ring / 22
        const breath = Math.sin(phase * 0.34 + depth * 2.5) * 0.008
        const spread = 1 + depth * (portrait ? 2.2 : 3.3)
        const rx = radiusX * (spread + breath)
        const ry = radiusY * (1 + depth * 1.8 + breath)
        const tilt = Math.sin(phase * 0.16 + depth * 1.4) * 0.055
        context.beginPath()
        context.ellipse(
          centerX + driftX * (0.3 + depth) + Math.sin(depth * Math.PI) * width * 0.025,
          centerY + driftY * (0.3 + depth),
          rx, ry, tilt, 0, Math.PI * 2,
        )
        context.strokeStyle = ring % 4 === 0
          ? `rgba(168, 137, 88, ${0.24 - depth * 0.1})`
          : `rgba(38, 134, 146, ${0.2 - depth * 0.12})`
        context.lineWidth = ring % 4 === 0 ? 0.85 : 0.65
        context.stroke()
      }
      context.restore()
    }

    const tick = (time: number) => {
      frame = 0
      if (disposed || !visible || document.hidden || reducedMotion.matches || phase >= 4.5) return
      const elapsed = time - previousTime
      if (elapsed >= 1000 / 30) {
        phase += Math.min(elapsed, 80) / 1000
        previousTime = time
        easedX += (pointerX - easedX) * 0.065
        easedY += (pointerY - easedY) * 0.065
        draw()
      }
      frame = window.requestAnimationFrame(tick)
    }

    const syncPlayback = () => {
      window.cancelAnimationFrame(frame)
      frame = 0
      previousTime = performance.now()
      if (disposed || !visible || document.hidden) return
      if (reducedMotion.matches || phase >= 4.5) {
        if (reducedMotion.matches) phase = 0
        draw()
      } else {
        frame = window.requestAnimationFrame(tick)
      }
    }

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      width = bounds.width
      height = bounds.height
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!document.hidden) draw()
    }

    const resetPointer = () => { pointerX = 0; pointerY = 0 }
    const movePointer = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches || !visible || phase >= 4.5 || event.pointerType === 'touch') return
      const bounds = parent.getBoundingClientRect()
      if (!bounds.width || !bounds.height) return
      pointerX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2))
      pointerY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2))
    }

    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      syncPlayback()
    }, { threshold: 0 })
    resizeObserver.observe(canvas)
    intersectionObserver.observe(canvas)
    parent.addEventListener('pointermove', movePointer, { passive: true })
    parent.addEventListener('pointerleave', resetPointer)
    document.addEventListener('visibilitychange', syncPlayback)
    reducedMotion.addEventListener('change', syncPlayback)
    finePointer.addEventListener('change', resetPointer)
    window.addEventListener('resize', resize, { passive: true })
    resize()

    return () => {
      disposed = true
      window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      parent.removeEventListener('pointermove', movePointer)
      parent.removeEventListener('pointerleave', resetPointer)
      document.removeEventListener('visibilitychange', syncPlayback)
      reducedMotion.removeEventListener('change', syncPlayback)
      finePointer.removeEventListener('change', resetPointer)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" style={{ pointerEvents: 'none' }} />
}
