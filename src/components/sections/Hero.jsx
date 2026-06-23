import { motion, useReducedMotion } from 'framer-motion'
import Button from '../ui/Button'
import { hero } from '../../data/content'
import useIsMobile from '../../hooks/useIsMobile'

// Eyebrow reveals letter by letter; headline words slide up; subtitle and
// button follow. The laptop-zoom + black fade run before this, so the Hero
// animates in cleanly once the site is revealed.
const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
}

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const isMobile = useIsMobile()
  const reduce = useReducedMotion()
  const eyebrowLetters = [...hero.eyebrow]
  return (
    <header className="hero" id="top" data-screen-label="hero">
      <div className="smoke" aria-hidden="true">
        <span className="s1" />
        <span className="s2" />
        <span className="s3" />
        <span className="s4" />
      </div>
      <div className="hero__vignette" aria-hidden="true" />
      <div className="hero__inner">
        <p className="hero__eyebrow" aria-label={hero.eyebrow}>
          {eyebrowLetters.map((ch, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial={isMobile ? false : 'hidden'}
              animate="visible"
              aria-hidden="true"
              style={{ display: 'inline-block', whiteSpace: 'pre', willChange: 'transform, opacity' }}
            >
              {ch}
            </motion.span>
          ))}
        </p>
        <h1>
          <motion.span
            custom={0}
            variants={wordVariants}
            initial={isMobile ? false : 'hidden'}
            animate="visible"
            style={{ display: 'inline-block', willChange: 'transform, opacity' }}
          >
            {hero.titleTop}
          </motion.span>
          <br />
          <motion.span
            className="dim"
            custom={1}
            variants={wordVariants}
            initial={isMobile ? false : 'hidden'}
            animate="visible"
            style={{ willChange: 'transform, opacity' }}
          >
            {hero.titleDim}
          </motion.span>
        </h1>
        <motion.p
          className="hero__sub"
          initial={isMobile ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'transform, opacity' }}
        >
          {hero.sub}
        </motion.p>
        <motion.div
          initial={isMobile ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 260, damping: 18 }}
          style={{ willChange: 'transform, opacity' }}
        >
          <Button
            variant="white"
            href="https://t.me/appleselect69"
            target="_blank"
            rel="noopener noreferrer"
          >
            {hero.cta}
          </Button>
        </motion.div>
      </div>
      <motion.div
        className="hero__scroll"
        aria-hidden="true"
        animate={reduce ? { opacity: 0.6 } : { opacity: [0.4, 1, 0.4] }}
        transition={reduce ? { duration: 0 } : { repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <span className="ln" />
        Scroll
      </motion.div>
    </header>
  )
}
