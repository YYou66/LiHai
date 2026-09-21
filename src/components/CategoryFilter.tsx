import { motion, AnimatePresence } from 'framer-motion'
import type { Collection, Category } from '@/data/collections'
import { CATEGORIES } from '@/data/collections'

interface Props {
  active: Category
  onChange: (c: Category) => void
}

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className="mb-12 md:mb-20 overflow-x-auto no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-8 md:gap-12 whitespace-nowrap"
      >
        <span className="font-label text-stonewarm-500 shrink-0">FILTER —</span>
        {CATEGORIES.map((c) => {
          const isActive = active === c
          return (
            <button
              key={c}
              onClick={() => onChange(c)}
              data-cursor="link"
              className="relative py-2 shrink-0"
            >
              <motion.span
                className={`font-label tracking-editorial transition-colors duration-500 ${
                  isActive ? 'text-ink-900' : 'text-stonewarm-500 hover:text-ink-900'
                }`}
                whileHover={{ y: -1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                {c}
              </motion.span>
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    layoutId="category-underline"
                    className="absolute left-0 -bottom-0.5 h-px w-full bg-ink-900 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </AnimatePresence>
            </button>
          )
        })}
      </motion.div>
    </div>
  )
}
