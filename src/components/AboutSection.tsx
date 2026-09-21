import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { COLLECTIONS } from '@/data/collections'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import ImageReveal from './ImageReveal'
import MagneticButton from './MagneticButton'

export default function AboutSection() {
  const { ref, image, text } = useMouseParallax(1)

  const scrollToArchive = () => {
    const el = document.getElementById('archive')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="about"
      ref={ref}
      className="relative px-6 md:px-12 py-24 md:py-40"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6 md:gap-8 items-start">
        <motion.div
          style={image}
          className="col-span-12 md:col-span-5 order-2 md:order-1"
        >
          <ImageReveal
            src={
              'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=minimal%20desk%20with%20books%20notebook%20coffee%20soft%20morning%20light%20wooden%20table%20editorial%20photography&image_size=portrait_4_3'
            }
            alt="desk"
            className="aspect-[4/5] w-full bg-ivory-200"
            delay={0.1}
          />
        </motion.div>

        <div className="col-span-12 md:col-span-6 md:col-start-7 order-1 md:order-2 md:pt-12">
          <motion.div
            style={text}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="font-label text-stonewarm-500 mb-6">ABOUT / 03</div>
            <h2 className="font-display text-5xl md:text-7xl leading-[1] text-ink-900 tracking-tight mb-10 md:mb-16">
              关于这个
              <br />
              <span className="font-editorial"> 私人宇宙。</span>
            </h2>
            <div className="space-y-6 font-sans text-base md:text-lg leading-[1.9] text-ink-800 max-w-[520px]">
              <p>
                不是为了展示，只是为了记得。
                那些让我停下脚步的画面，那些让我愿意再看一眼的设计，
                那些什么都没发生但很安静的瞬间。
              </p>
              <p className="text-stonewarm-500">
                如果你看到了什么，那你也一定懂。
                不必点赞，不必收藏，只是看一眼就好。
              </p>
            </div>

            <div className="mt-12 md:mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-[440px]">
              <Stat number={String(COLLECTIONS.length).padStart(2, '0')} label="COLLECTIONS" />
              <Stat number="08" label="CATEGORIES" />
              <Stat number="01" label="VOLUME" />
            </div>

            <div className="mt-14 md:mt-20 flex items-center gap-8 flex-wrap">
              <MagneticButton onClick={scrollToArchive} className="font-label text-ink-900">
                VIEW ARCHIVE →
              </MagneticButton>
              <Link
                to={`/item/${COLLECTIONS[0].id}`}
                className="font-label text-stonewarm-500 hover:text-ink-900 transition-colors duration-500"
                data-cursor="link"
              >
                RANDOM PICK
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mt-32 md:mt-56 pt-10 md:pt-16 border-t border-stonewarm-500/20"
      >
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 text-stonewarm-500">
          <div>
            <div className="font-display text-2xl md:text-3xl text-ink-900 mb-3 tracking-tight">
              MY <span className="font-editorial">Little</span> UNIVERSE
            </div>
            <div className="font-label text-stonewarm-500/80 max-w-xs leading-relaxed">
              A CURATED COLLECTION OF THINGS THAT MADE ME STOP.
            </div>
          </div>
          <div className="font-label text-stonewarm-500/80 space-y-2 md:text-right">
            <div>2026 · VOLUME I</div>
            <div>MADE QUIETLY, WITH CARE.</div>
          </div>
        </div>
      </motion.footer>
    </section>
  )
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl md:text-5xl text-ink-900 leading-none tracking-tight">
        {number}
      </div>
      <div className="font-label text-stonewarm-500 mt-2">{label}</div>
    </div>
  )
}
