import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import type { Collection } from '@/data/collections'
import ImageReveal from './ImageReveal'

export type ItemSize = 'sm' | 'md' | 'lg' | 'xl' | 'tall' | 'wide'

interface Props {
  item: Collection
  index: number
  size?: ItemSize
  offsetX?: number
  offsetY?: number
  alignText?: 'left' | 'right'
}

const sizeClass: Record<ItemSize, string> = {
  sm: 'aspect-[4/5]',
  md: 'aspect-[3/4]',
  lg: 'aspect-[4/5] md:aspect-square',
  xl: 'aspect-[16/10]',
  tall: 'aspect-[2/3]',
  wide: 'aspect-[16/9]',
}

export default function InspirationItem({
  item,
  index,
  size = 'md',
  offsetX = 0,
  offsetY = 0,
  alignText = 'left',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smoothX = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.6 })
  const smoothY = useSpring(my, { stiffness: 120, damping: 18, mass: 0.6 })
  const imgX = useTransform(smoothX, [-0.5, 0.5], [-10, 10])
  const imgY = useTransform(smoothY, [-0.5, 0.5], [-10, 10])
  const titleX = useTransform(smoothX, [-0.5, 0.5], [-6, 6])
  const titleY = useTransform(smoothY, [-0.5, 0.5], [-4, 4])
  const scale = useSpring(1, { stiffness: 220, damping: 20, mass: 0.4 })

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const reset = () => {
    mx.set(0)
    my.set(0)
    scale.set(1)
  }

  const enter = () => scale.set(1.025)
  const leave = () => scale.set(1)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
          delay: Math.min(index * 0.04, 0.32),
        },
      }}
      viewport={{ once: true, margin: '-8%' }}
      onMouseMove={handleMove}
      onMouseEnter={() => {
        enter()
      }}
      onMouseLeave={() => {
        leave()
        reset()
      }}
      style={{ x: offsetX, y: offsetY }}
      className="group"
    >
      <Link to={`/item/${item.id}`} className="block">
        <motion.div
          style={{
            scale,
          }}
          className={`relative overflow-hidden ${sizeClass[size]} bg-ivory-200`}
        >
          <motion.div
            style={{ x: imgX, y: imgY }}
            className="absolute inset-0 scale-[1.08]"
          >
            <ImageReveal
              src={item.image}
              alt={item.title}
              delay={0.08}
              className="h-full w-full"
            />
          </motion.div>
        </motion.div>

        <motion.div
          style={{ x: titleX, y: titleY }}
          className={`mt-5 md:mt-6 ${alignText === 'right' ? 'text-right' : 'text-left'}`}
        >
          <div className={`flex items-center gap-4 mb-2 ${alignText === 'right' ? 'justify-end' : 'justify-start'}`}>
            <span className="font-label text-stonewarm-500">{item.number}</span>
            <span className="h-px w-8 bg-stonewarm-500/40" />
            <span className="font-label text-stonewarm-500">{item.category}</span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl leading-tight text-ink-900 tracking-tight">
            {item.title}
          </h3>
          <div className="mt-2 font-sans text-xs text-stonewarm-500 tracking-wide">
            {item.location} <span className="mx-1.5 opacity-40">·</span> {item.date}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
