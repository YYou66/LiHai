import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const cursor = useRef<HTMLDivElement>(null)
  const [isHoveringImage, setIsHoveringImage] = useState(false)
  const [isHoveringLink, setIsHoveringLink] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  const springConfig = { damping: 60, stiffness: 600, mass: 0.5 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  const size = isHoveringImage ? 80 : isHoveringLink ? 40 : 8
  const sizeSpring = useSpring(8, { stiffness: 200, damping: 25, mass: 0.4 })
  useEffect(() => {
    sizeSpring.set(size)
  }, [size, sizeSpring])

  const sizeW = useTransform(sizeSpring, (s) => s)
  const sizeH = useTransform(sizeSpring, (s) => s)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isFine) return
    setIsEnabled(true)
    document.body.classList.add('has-custom-cursor')

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const img = target.closest('[data-cursor="image"]')
      const link = target.closest('a, button, [data-cursor="link"]')
      setIsHoveringImage(!!img)
      setIsHoveringLink(!!link && !img)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', handleOver)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', handleOver)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [cursorX, cursorY])

  if (!isEnabled) return null

  return (
    <div
      ref={cursor}
      className="pointer-events-none fixed z-[100] mix-blend-difference hidden md:block"
      style={{ top: 0, left: 0 }}
    >
      <motion.div
        className="rounded-full bg-ivory-50"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          width: sizeW,
          height: sizeH,
        }}
      >
        <AnimatePresence>
          {isHoveringImage && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 flex items-center justify-center font-label"
              style={{ color: '#111' }}
            >
              VIEW
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
