import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

interface Props {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  delay?: number
  parallaxY?: number
}

export default function ImageReveal({
  src,
  alt,
  className = '',
  imgClassName = '',
  delay = 0,
  parallaxY = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ y: parallaxY }}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 1 },
        visible: { opacity: 1, transition: { staggerChildren: 0, delayChildren: delay } },
      }}
      data-cursor="image"
    >
      <motion.div
        className="absolute inset-0 z-20 bg-ivory-100 origin-bottom"
        variants={{
          hidden: { scaleY: 1 },
          visible: {
            scaleY: 0,
            transition: {
              duration: 1.1,
              ease: [0.77, 0, 0.175, 1],
            },
          },
        }}
      />
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
        variants={{
          hidden: { scale: 1.12, opacity: 0 },
          visible: {
            scale: 1,
            opacity: loaded ? 1 : 0,
            transition: {
              scale: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.6, ease: 'linear' },
            },
          },
        }}
      />
    </motion.div>
  )
}
