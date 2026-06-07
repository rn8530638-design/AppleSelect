import { motion } from 'framer-motion'
import StatCard from '../ui/StatCard'
import { stats } from '../../data/content'

const textStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const lineFade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}
const titleStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const wordUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const statsStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

export default function AboutUs() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  return (
    <section className="section about" id="about" data-screen-label="about">
      <div className="about__grid">
        <motion.div
          className="about__text"
          initial={isMobile ? false : 'hidden'}
          animate={isMobile ? 'visible' : undefined}
          whileInView={isMobile ? undefined : 'visible'}
          viewport={{ once: true, margin: '-100px' }}
          variants={textStagger}
        >
          <motion.p className="eyebrow" variants={lineFade}>
            О нас
          </motion.p>
          <motion.h2 className="h2" style={{ marginBottom: 28 }} variants={titleStagger}>
            {['Кто', 'мы'].map((w, i) => (
              <motion.span
                key={i}
                variants={wordUp}
                style={{ display: 'inline-block', marginRight: '0.28em', willChange: 'transform, opacity' }}
              >
                {w}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p variants={lineFade} style={{ willChange: 'transform, opacity' }}>
            <strong>Apple Select</strong> — Telegram-канал, который уже более трёх лет продаёт только
            оригинальную технику Apple напрямую от официальных поставщиков.
          </motion.p>
          <motion.p variants={lineFade} style={{ willChange: 'transform, opacity' }}>
            Мы проверяем каждое устройство перед отправкой, даём гарантию и сопровождаем покупателя на
            всех этапах — от выбора модели до доставки в руки.
          </motion.p>
        </motion.div>

        <motion.div
          className="stats"
          initial={isMobile ? false : 'hidden'}
          animate={isMobile ? 'visible' : undefined}
          whileInView={isMobile ? undefined : 'visible'}
          viewport={{ once: true, margin: '-100px' }}
          variants={statsStagger}
        >
          {stats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
