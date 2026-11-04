'use client'

import { useEffect } from 'react'
import './brand-atmosphere.css'

type AtmosphereScene = {
  host: HTMLElement
  layer: HTMLDivElement
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  width: number
  height: number
  dark: boolean
  direction: number
  visible: boolean
  champagne: string
}

const sceneSelectors = [
  { selector: '.cinema-hero__cover', dark: false, direction: 1 },
  { selector: '.journey-cinema', dark: true, direction: -1 },
  { selector: '.im-editorial-gallery', dark: false, direction: -1 },
  { selector: '.az-footer-invitation', dark: false, direction: 1 },
]

// One continuous folded ribbon echoes the flowing profile in the AZ FACE mark.
function drawRibbon(scene: AtmosphereScene, time: number, scroll: number, reduced: boolean) {
  const { context: ctx, width: w, height: h, dark, direction, champagne } = scene
  const phase = reduced ? 0 : time * .00032 + scroll * .00065
  const bend = Math.sin(phase) * h * .075
  const turn = Math.cos(phase * .77) * w * .045
  const strands = w < 600 ? 13 : 22
  ctx.clearRect(0, 0, w, h)
  ctx.save()
  if (direction < 0) { ctx.translate(w, 0); ctx.scale(-1, 1) }
  const hue = dark ? '180,227,229' : '38,134,146'
  const sweep = ctx.createLinearGradient(0, h, w, 0)
  sweep.addColorStop(0, `rgba(${hue},0)`)
  sweep.addColorStop(.2, `rgba(${hue},${dark ? .16 : .24})`)
  sweep.addColorStop(.55, `rgba(${hue},${dark ? .29 : .36})`)
  sweep.addColorStop(.85, `rgba(${hue},${dark ? .13 : .2})`)
  sweep.addColorStop(1, `rgba(${hue},0)`)
  ctx.strokeStyle = sweep
  ctx.lineWidth = dark ? 1.1 : .9
  for (let i = 0; i < strands; i++) {
    const position = i / (strands - 1)
    const fold = Math.sin(position * Math.PI)
    const spread = (position - .5) * h * .24
    ctx.strokeStyle = i === 3 || i === strands - 4 ? `rgba(${champagne},${dark ? .36 : .4})` : sweep
    ctx.beginPath()
    ctx.moveTo(-w * .12, h * .65 + spread)
    ctx.bezierCurveTo(
      w * .12 + turn, -h * .23 + bend + spread * .4,
      w * .28 - turn, h * 1.28 - bend + spread * 1.5,
      w * .58, h * .63 + spread * .3,
    )
    ctx.bezierCurveTo(
      w * .78 + turn, -h * .12 + bend - fold * h * .12,
      w * .9 - turn, h * .08 - bend + spread,
      w * 1.14, h * .4 + spread * 1.6,
    )
    ctx.stroke()
  }
  // A narrow satin fold catches champagne light without turning the surface gold.
  const satin = ctx.createLinearGradient(w * .1, h, w * .95, 0)
  satin.addColorStop(0, `rgba(${champagne},0)`)
  satin.addColorStop(.3, `rgba(${champagne},${dark ? .08 : .06})`)
  satin.addColorStop(.62, `rgba(${champagne},${dark ? .23 : .15})`)
  satin.addColorStop(1, `rgba(${champagne},0)`)
  ctx.fillStyle = satin
  ctx.beginPath()
  ctx.moveTo(-w * .08, h * .93)
  ctx.bezierCurveTo(w * .28, h * .39 + bend, w * .8 + turn, h * 1.1, w * 1.08, -h * .12)
  ctx.lineTo(w * 1.08, -h * .07)
  ctx.bezierCurveTo(w * .8 + turn, h * 1.02, w * .28, h * .46 + bend, -w * .08, h * .97)
  ctx.closePath()
  ctx.fill()
  ctx.strokeStyle = `rgba(${champagne},${dark ? .5 : .55})`
  ctx.lineWidth = w < 600 ? 1 : 1.4
  ctx.beginPath()
  ctx.moveTo(-w * .08, h * .93)
  ctx.bezierCurveTo(w * .28, h * .39 + bend, w * .8 + turn, h * 1.1, w * 1.08, -h * .12)
  ctx.stroke()
  ctx.restore()
}

export function BrandAtmosphere() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const scenes: AtmosphereScene[] = []
    let animationFrame = 0
    let lastFrame = 0
    let elapsed = 0
    let scrollPosition = window.scrollY

    for (const { selector, dark, direction } of sceneSelectors) {
      const host = document.querySelector<HTMLElement>(selector)
      if (!host) continue
      const layer = document.createElement('div')
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d', { alpha: true })
      if (!context) continue
      layer.className = 'brand-atmosphere'
      layer.setAttribute('aria-hidden', 'true')
      canvas.className = 'brand-atmosphere__canvas'
      layer.appendChild(canvas)
      host.appendChild(layer)
      const champagneHex = getComputedStyle(host).getPropertyValue('--az-champagne').trim() || '#b99a64'
      const champagne = /^#[\da-f]{6}$/i.test(champagneHex)
        ? [1, 3, 5].map(index => parseInt(champagneHex.slice(index, index + 2), 16)).join(',')
        : '185,154,100'
      scenes.push({ host, layer, canvas, context, width: 0, height: 0, dark, direction, visible: false, champagne })
    }

    function renderStill() {
      for (const scene of scenes) drawRibbon(scene, elapsed, scrollPosition, reducedMotion.matches)
    }

    function resize() {
      for (const scene of scenes) {
        scene.width = scene.host.clientWidth
        scene.height = Math.min(scene.host.clientHeight, window.innerHeight)
        // Bound the backing store on large monitors without changing the composition.
        const resolution = Math.min(window.devicePixelRatio || 1, 1.5, 1920 / Math.max(scene.width, 1))
        scene.canvas.width = Math.max(1, Math.round(scene.width * resolution))
        scene.canvas.height = Math.max(1, Math.round(scene.height * resolution))
        scene.canvas.style.height = `${scene.height}px`
        scene.context.setTransform(resolution, 0, 0, resolution, 0, 0)
      }
      renderStill()
    }

    function tick(now: number) {
      animationFrame = 0
      if (document.hidden || reducedMotion.matches || !scenes.some(scene => scene.visible)) return
      if (now - lastFrame >= 1000 / 30) {
        elapsed += Math.min(now - lastFrame, 70)
        lastFrame = now
        for (const scene of scenes) if (scene.visible) drawRibbon(scene, elapsed, scrollPosition, false)
      }
      animationFrame = window.requestAnimationFrame(tick)
    }

    function updatePlayback() {
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      animationFrame = 0
      lastFrame = performance.now()
      for (const scene of scenes) {
        scene.layer.dataset.motion = reducedMotion.matches ? 'static' : document.hidden || !scene.visible ? 'paused' : 'running'
      }
      if (!document.hidden && !reducedMotion.matches && scenes.some(scene => scene.visible)) {
        animationFrame = window.requestAnimationFrame(tick)
      } else if (reducedMotion.matches) renderStill()
    }

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const scene = scenes.find(candidate => candidate.host === entry.target)
        if (scene) scene.visible = entry.isIntersecting
      }
      updatePlayback()
    })
    const resizeObserver = new ResizeObserver(resize)
    for (const scene of scenes) { observer.observe(scene.host); resizeObserver.observe(scene.host) }
    const onScroll = () => { scrollPosition = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', updatePlayback)
    reducedMotion.addEventListener('change', updatePlayback)
    resize()

    return () => {
      window.cancelAnimationFrame(animationFrame)
      observer.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', updatePlayback)
      reducedMotion.removeEventListener('change', updatePlayback)
      for (const scene of scenes) scene.layer.remove()
    }
  }, [])

  return null
}
