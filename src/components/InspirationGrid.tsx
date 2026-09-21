import { motion, AnimatePresence } from 'framer-motion'
import { useMemo, useRef } from 'react'
import type { Collection, Category } from '@/data/collections'
import InspirationItem from './InspirationItem'
import CategoryFilter from './CategoryFilter'

interface Props {
  items: Collection[]
  activeCategory: Category
  onCategoryChange: (c: Category) => void
}

export default function InspirationGrid({
  items,
  activeCategory,
  onCategoryChange,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  const displayItems = useMemo(() => {
    if (activeCategory === 'ALL') return items
    return items.filter((i) => i.category === activeCategory)
  }, [items, activeCategory])

  return (
    <section
      id="archive"
      ref={containerRef}
      className="relative px-6 md:px-12 py-24 md:py-40"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10 md:mb-16 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="font-label text-stonewarm-500 mb-4">INDEX / 01</div>
              <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-ink-900 tracking-tight">
                收藏的
                <span className="font-editorial"> 碎片 </span>
                <br />
                与一些瞬间。
              </h2>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="col-span-12 md:col-span-4 md:text-right"
          >
            <p className="font-sans text-sm text-stonewarm-500 leading-relaxed max-w-[320px] md:ml-auto">
              {displayItems.length} 件收藏
              <br />
              来自生活的不同角落，
              <br />
              用图像安静地留着。
            </p>
          </motion.div>
        </div>

        <CategoryFilter active={activeCategory} onChange={onCategoryChange} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              initial: { opacity: 0 },
              animate: {
                opacity: 1,
                transition: { staggerChildren: 0.04, delayChildren: 0.15 },
              },
              exit: {
                opacity: 0,
                transition: { staggerChildren: 0.02, staggerDirection: -1 },
              },
            }}
            className="grid grid-cols-6 md:grid-cols-12 gap-x-6 md:gap-x-8 gap-y-20 md:gap-y-36"
          >
            {displayItems.length === 0 ? (
              <motion.div
                variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}
                className="col-span-12 py-24 text-center font-editorial text-stonewarm-500 text-xl md:text-2xl"
              >
                这个分类还空空的，留着以后慢慢装。
              </motion.div>
            ) : null}

            {displayItems.map((item, i) => {
              const idx = i
              const layout = layoutForIndex(idx)
              return (
                <motion.div
                  key={item.id}
                  variants={{
                    initial: { opacity: 0, y: 50 },
                    animate: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                    exit: {
                      opacity: 0,
                      y: -30,
                      transition: { duration: 0.5, ease: [0.77, 0, 0.175, 1] },
                    },
                  }}
                  className={layout.colSpan}
                  style={layout.extra}
                >
                  <InspirationItem
                    item={item}
                    index={idx}
                    size={layout.size}
                    offsetX={layout.offsetX}
                    offsetY={layout.offsetY}
                    alignText={layout.alignText}
                  />
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        <div className="mt-32 md:mt-48 h-px w-full bg-stonewarm-500/30" />
      </div>
    </section>
  )
}

type LayoutReturn = {
  colSpan: string
  size: 'sm' | 'md' | 'lg' | 'xl' | 'tall' | 'wide'
  offsetX: number
  offsetY: number
  alignText: 'left' | 'right'
  extra?: React.CSSProperties
}

function layoutForIndex(i: number): LayoutReturn {
  const pattern: LayoutReturn[] = [
    {
      colSpan: 'col-span-6 md:col-span-7',
      size: 'xl',
      offsetX: 0,
      offsetY: 0,
      alignText: 'left',
    },
    {
      colSpan: 'col-span-6 md:col-span-4 md:col-start-9',
      size: 'md',
      offsetX: 0,
      offsetY: 80,
      alignText: 'left',
    },
    {
      colSpan: 'col-span-6 md:col-span-5 md:col-start-2',
      size: 'tall',
      offsetX: 0,
      offsetY: 40,
      alignText: 'right',
      extra: { marginTop: 0 },
    },
    {
      colSpan: 'col-span-6 md:col-span-5',
      size: 'md',
      offsetX: 0,
      offsetY: 0,
      alignText: 'left',
    },
    {
      colSpan: 'col-span-6 md:col-span-4 md:col-start-7',
      size: 'lg',
      offsetX: 0,
      offsetY: 60,
      alignText: 'right',
    },
    {
      colSpan: 'col-span-6 md:col-span-6 md:col-start-1',
      size: 'wide',
      offsetX: 0,
      offsetY: 0,
      alignText: 'left',
    },
    {
      colSpan: 'col-span-6 md:col-span-5 md:col-start-8',
      size: 'md',
      offsetX: 0,
      offsetY: -20,
      alignText: 'left',
    },
    {
      colSpan: 'col-span-6 md:col-span-4',
      size: 'tall',
      offsetX: 0,
      offsetY: 40,
      alignText: 'right',
    },
    {
      colSpan: 'col-span-6 md:col-span-6 md:col-start-5',
      size: 'xl',
      offsetX: 0,
      offsetY: 0,
      alignText: 'left',
    },
    {
      colSpan: 'col-span-6 md:col-span-4 md:col-start-2',
      size: 'md',
      offsetX: 0,
      offsetY: 60,
      alignText: 'left',
    },
    {
      colSpan: 'col-span-6 md:col-span-5 md:col-start-8',
      size: 'lg',
      offsetX: 0,
      offsetY: 0,
      alignText: 'right',
    },
    {
      colSpan: 'col-span-6 md:col-span-12 md:col-start-1',
      size: 'wide',
      offsetX: 0,
      offsetY: 0,
      alignText: 'left',
    },
  ]
  return pattern[i % pattern.length]
}
