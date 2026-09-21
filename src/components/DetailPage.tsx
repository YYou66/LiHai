import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
import { COLLECTIONS } from '@/data/collections'
import ImageReveal from './ImageReveal'
import InspirationItem from './InspirationItem'
import MagneticButton from './MagneticButton'

export default function DetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [id])

  const idx = COLLECTIONS.findIndex((c) => c.id === id)
  const item = COLLECTIONS[idx]
  const prev = idx > 0 ? COLLECTIONS[idx - 1] : COLLECTIONS[COLLECTIONS.length - 1]
  const next = idx < COLLECTIONS.length - 1 ? COLLECTIONS[idx + 1] : COLLECTIONS[0]

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="font-editorial text-2xl text-stonewarm-500 mb-6">
            找不到这个收藏。
          </div>
          <Link
            to="/"
            data-cursor="link"
            className="font-label text-ink-900 underline underline-offset-4"
          >
            ← BACK TO INDEX
          </Link>
        </div>
      </div>
    )
  }

  const related = (item.relatedIds || [])
    .map((rid) => COLLECTIONS.find((c) => c.id === rid))
    .filter(Boolean)
    .slice(0, 3) as typeof COLLECTIONS

  return (
    <article className="relative">
      <motion.div
        className="fixed left-0 top-0 z-[60] h-[2px] bg-ink-900 origin-left"
        style={{ scaleX: scrollYProgress, width: '100vw' }}
      />

      <section className="relative px-6 md:px-12 pt-32 md:pt-44 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-12 gap-6 md:gap-8 mb-10 md:mb-20"
          >
            <div className="col-span-12 md:col-span-2">
              <div className="font-label text-stonewarm-500">
                N° {item.number}
              </div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                <div className="font-label text-stonewarm-500 mb-4">
                  {item.category} · {item.location} · {item.date}
                </div>
                <h1 className="font-display text-[11vw] md:text-[6.5vw] leading-[0.95] text-ink-900 tracking-tight">
                  {item.title}
                </h1>
                {item.titleEn && (
                  <div className="mt-4 font-editorial text-lg md:text-2xl text-stonewarm-500 tracking-wide">
                    {item.titleEn}
                  </div>
                )}
              </motion.div>
            </div>
            <div className="col-span-12 md:col-span-2 md:text-right">
              <button
                onClick={() => navigate(-1)}
                className="font-label text-stonewarm-500 hover:text-ink-900 transition-colors duration-500"
                data-cursor="link"
              >
                ← BACK
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 1.04, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="aspect-[16/9] md:aspect-[21/9] bg-ivory-200 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 md:col-span-3"
          >
            <div className="font-label text-stonewarm-500 mb-3">NOTES</div>
            <div className="h-px w-8 bg-stonewarm-500/40 mb-6" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="col-span-12 md:col-span-7 md:col-start-5"
          >
            <p className="font-display text-2xl md:text-3xl leading-[1.45] text-ink-900 tracking-tight">
              {item.description}
            </p>
            <div className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
              <Meta label="CATEGORY" value={item.category} />
              <Meta label="DATE" value={item.date} />
              <Meta label="LOCATION" value={item.location} />
            </div>
          </motion.div>
        </div>
      </section>

      {item.images && item.images.length > 0 && (
        <section className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto space-y-8 md:space-y-12">
            {item.images.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                className={i % 2 === 0 ? 'md:pr-[10%]' : 'md:pl-[10%]'}
              >
                <ImageReveal
                  src={src}
                  alt={`${item.title} - ${i + 1}`}
                  className={`w-full bg-ivory-200 ${
                    i === 0 ? 'aspect-[16/9]' : 'aspect-[3/4] md:aspect-[4/5]'
                  }`}
                  delay={0.1}
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="px-6 md:px-12 py-20 md:py-32 border-t border-stonewarm-500/20">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-12 md:mb-20 grid grid-cols-12 gap-6 items-end">
              <div className="col-span-12 md:col-span-8">
                <div className="font-label text-stonewarm-500 mb-4">RELATED</div>
                <h2 className="font-display text-4xl md:text-6xl leading-[1] text-ink-900 tracking-tight">
                  也许你也会
                  <span className="font-editorial"> 喜欢。</span>
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6 md:gap-8">
              {related.map((r, i) => (
                <div key={r.id} className="col-span-6 md:col-span-4">
                  <InspirationItem item={r} index={i} size="md" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 md:px-12 py-16 md:py-28 border-t border-stonewarm-500/20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 gap-6 items-center">
          <Link to={`/item/${prev.id}`} data-cursor="image">
            <motion.div
              whileHover={{ x: -12 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              className="group"
            >
              <MagneticButton
                as="div"
                strength={10}
                className="font-label text-stonewarm-500 group-hover:text-ink-900 transition-colors duration-500 mb-4"
              >
                ← PREVIOUS
              </MagneticButton>
              <div className="font-display text-2xl md:text-4xl leading-tight text-ink-900 tracking-tight">
                {prev.title}
              </div>
              <div className="mt-2 font-label text-stonewarm-500">
                N° {prev.number} · {prev.category}
              </div>
            </motion.div>
          </Link>

          <Link to={`/item/${next.id}`} data-cursor="image" className="text-right">
            <motion.div
              whileHover={{ x: 12 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              className="group"
            >
              <MagneticButton
                as="div"
                strength={10}
                className="font-label text-stonewarm-500 group-hover:text-ink-900 transition-colors duration-500 mb-4 ml-auto"
              >
                NEXT →
              </MagneticButton>
              <div className="font-display text-2xl md:text-4xl leading-tight text-ink-900 tracking-tight">
                {next.title}
              </div>
              <div className="mt-2 font-label text-stonewarm-500">
                N° {next.number} · {next.category}
              </div>
            </motion.div>
          </Link>
        </div>
      </section>
    </article>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-label text-stonewarm-500 mb-2">{label}</div>
      <div className="font-sans text-sm md:text-base text-ink-900">{value}</div>
    </div>
  )
}
