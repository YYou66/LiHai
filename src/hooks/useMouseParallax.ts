import { useEffect, useRef } from 'react'
import { MotionValue, useMotionValue, useSpring, useTransform } from 'framer-motion'

export interface ParallaxValues {
  ref: React.MutableRefObject<HTMLElement | null>
  sx: MotionValue<number>
  sy: MotionValue<number>
  image: { x: MotionValue<number>; y: MotionValue<number> }
  text: { x: MotionValue<number>; y: MotionValue<number> }
  bg: { x: MotionValue<number>; y: MotionValue<number> }
}

export function useMouseParallax(
  strength = 1,
  damping = 40,
  stiffness = 180,
): ParallaxValues {
  const ref = useRef<HTMLElement | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { damping, stiffness, mass: 0.5 })
  const sy = useSpring(my, { damping, stiffness, mass: 0.5 })

  const isFine =
    typeof window !== 'undefined'
      ? window.matchMedia('(hover: hover) and (pointer: fine)').matches
      : false

  useEffect(() => {
    if (!isFine) return
    const el = ref.current
    const handleMove = (e: MouseEvent) => {
      let w = window.innerWidth
      let h = window.innerHeight
      let ox = 0
      let oy = 0
      if (el && el !== document.body) {
        const rect = el.getBoundingClientRect()
        w = rect.width
        h = rect.height
        ox = rect.left
        oy = rect.top
      }
      const x = ((e.clientX - ox) / w - 0.5) * 2
      const y = ((e.clientY - oy) / h - 0.5) * 2
      mx.set(x)
      my.set(y)
    }
    const reset = () => {
      mx.set(0)
      my.set(0)
    }
    const target = el === document.body || !el ? window : (el as any)
    target.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', reset)
    return () => {
      target.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', reset)
    }
  }, [mx, my, isFine])

  const factor = isFine ? strength : 0
  const image = {
    x: useTransform(sx, (v) => v * 6 * factor),
    y: useTransform(sy, (v) => v * 6 * factor),
  }
  const text = {
    x: useTransform(sx, (v) => v * 10 * factor),
    y: useTransform(sy, (v) => v * 10 * factor),
  }
  const bg = {
    x: useTransform(sx, (v) => v * 2 * factor),
    y: useTransform(sy, (v) => v * 2 * factor),
  }

  return { ref, sx, sy, image, text, bg }
}
