import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function HeroIntro() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 140])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const letterSpacing = useTransform(scrollYProgress, [0, 1], ['0em', '0.08em'])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end px-6 pb-20 md:px-12 md:pb-32"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <motion.div style={{ y, opacity }} className="grid grid-cols-12 gap-6 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 md:col-span-2"
          >
            <div className="font-label text-stonewarm-500 mb-3">INTRO / 00</div>
            <div className="font-label text-stonewarm-500">2026 / 09</div>
          </motion.div>

          <motion.div
            style={{ letterSpacing }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="col-span-12 md:col-span-8"
          >
            <h1 className="font-display text-[12vw] md:text-[8.5vw] leading-[0.95] text-ink-900 tracking-tight">
              MY <span className="font-editorial">Little</span>
              <br />
              UNIVERSE.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            className="col-span-12 md:col-span-2 md:text-right"
          >
            <p className="font-sans text-stonewarm-500 text-sm leading-relaxed max-w-[260px] md:ml-auto">
              最近让我觉得有意思的东西。
              <br />
              建筑，物体，光影，和一些
              <br />
              什么都没发生的瞬间。
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          className="mt-24 md:mt-32 h-px w-full origin-left bg-stonewarm-500/40"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-8 flex items-end justify-between"
        >
          <div className="font-label text-stonewarm-500">SCROLL ↓</div>
          <div className="font-label text-stonewarm-500">A CURATED COLLECTION — VOL.I</div>
        </motion.div>
      </div>
    </section>
  )
}
