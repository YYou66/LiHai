import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

export default function PageTransition({ children }: Props) {
  const location = useLocation()
  const isDetail = location.pathname.startsWith('/item/')

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 1 },
        }}
      >
        <motion.div
          variants={{
            initial: isDetail
              ? { clipPath: 'inset(50% 20% 50% 20% round 4px)', opacity: 0 }
              : { opacity: 0, y: 10 },
            animate: {
              clipPath: 'inset(0% 0% 0% 0% round 0px)',
              opacity: 1,
              y: 0,
              transition: {
                duration: isDetail ? 1.1 : 0.9,
                ease: [0.77, 0, 0.175, 1],
                staggerChildren: 0.03,
              },
            },
            exit: {
              opacity: 0,
              y: -10,
              transition: {
                duration: 0.5,
                ease: [0.77, 0, 0.175, 1],
              },
            },
          }}
        >
          {children}
        </motion.div>

        <motion.div
          className="fixed inset-0 z-[80] pointer-events-none bg-ink-900 origin-left"
          variants={{
            initial: { scaleX: 0 },
            animate: {
              scaleX: 0,
              transition: { duration: 0 },
            },
            exit: {
              scaleX: [0, 1, 0],
              transformOrigin: isDetail ? 'left center' : 'right center',
              transition: {
                duration: 1,
                ease: [0.77, 0, 0.175, 1],
                times: [0, 0.5, 1],
              },
            },
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
