import { motion, useScroll, useTransform } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import MagneticButton from './MagneticButton'

export default function FloatingNav() {
  const { scrollY } = useScroll()
  const location = useLocation()
  const isHome = location.pathname === '/'

  const bgOpacity = useTransform(scrollY, [0, 400], [0, 0.85])
  const borderOpacity = useTransform(scrollY, [0, 400], [0, 0.5])
  const paddingY = useTransform(scrollY, [0, 400], [28, 14])

  const navLinks = [
    { label: 'INDEX', to: '/' },
    { label: 'ARCHIVE', to: '/#archive' },
    { label: 'ABOUT', to: '/#about' },
  ]

  return (
    <motion.header
      style={{ paddingTop: paddingY, paddingBottom: paddingY }}
      className="fixed left-0 right-0 top-0 z-50 px-6 md:px-12"
    >
      <motion.div
        className="absolute inset-0 -z-10 backdrop-blur-sm"
        style={{
          backgroundColor: 'rgba(243, 240, 232, 1)',
          opacity: bgOpacity,
        }}
      />
      <motion.div
        className="absolute inset-x-6 md:inset-x-12 bottom-0 h-px"
        style={{
          backgroundColor: '#77736C',
          opacity: borderOpacity,
        }}
      />
      <div className="flex items-center justify-between text-ink-900">
        <MagneticButton as="link" to="/" strength={12} className="font-display text-xl md:text-2xl">
          {isHome ? (
            <>
              <span className="tracking-tight">MY&nbsp;</span>
              <span className="font-editorial tracking-tight">UNIVERSE</span>
            </>
          ) : (
            <>
              <span className="tracking-tight">←&nbsp;BACK</span>
            </>
          )}
        </MagneticButton>
        <nav className="flex items-center gap-6 md:gap-10">
          {navLinks.map((l) => (
            <MagneticButton
              key={l.label}
              as="link"
              to={l.to}
              strength={8}
              className="font-label text-stonewarm-500 hover:text-ink-900 transition-colors duration-500"
            >
              {l.label}
            </MagneticButton>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
