import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children: React.ReactNode
  className?: string
  strength?: number
  as?: 'button' | 'link' | 'div'
  to?: string
  onClick?: () => void
}

export default function MagneticButton({
  children,
  className = '',
  strength = 18,
  as = 'button',
  to,
  onClick,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })
  const [hovering, setHovering] = useState(false)

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    x.set(dx * strength)
    y.set(dy * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
    setHovering(false)
  }

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-flex items-center ${className}`}
    >
      <span className="relative inline-flex items-center">
        {children}
        <motion.span
          className="absolute -bottom-1 left-0 h-px bg-ink-900"
          initial={{ width: 0 }}
          animate={{ width: hovering ? '100%' : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>
    </motion.div>
  )

  if (as === 'link' && to) {
    return (
      <Link to={to} onClick={onClick} data-cursor="link">
        {inner}
      </Link>
    )
  }
  if (as === 'div') {
    return <div onClick={onClick} data-cursor="link">{inner}</div>
  }
  return (
    <button type="button" onClick={onClick} data-cursor="link" className="p-0 bg-transparent border-0">
      {inner}
    </button>
  )
}
