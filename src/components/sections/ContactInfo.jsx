import { motion } from 'framer-motion'
import { cta } from '../../data/content'
import useIsMobile from '../../hooks/useIsMobile'

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }

export default function ContactInfo() {
  const isMobile = useIsMobile()
  return (
    <section className="cta" id="cta" data-screen-label="cta">
      <div className="cta__glow" aria-hidden="true" />
      {/* Slowly drifting dark gradient spots for atmosphere */}
      <div className="cta__spot cta__spot1" aria-hidden="true" />
      <div className="cta__spot cta__spot2" aria-hidden="true" />
      <motion.div
        className="cta__inner"
        initial={isMobile ? false : 'hidden'}
        animate={isMobile ? 'visible' : undefined}
        whileInView={isMobile ? undefined : 'visible'}
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
      >
        <motion.span className="cta__brand" variants={fadeInUp}>
          <svg viewBox="0 0 14 17" width="14" height="17" style={{ overflow: 'visible' }}>
            <path d="M11.4 9c0-2 1.6-3 1.7-3.1-.9-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7C3.3 4.3 2 5.1 1.3 6.4-.1 8.9.9 12.6 2.3 14.6c.7 1 1.4 2.1 2.4 2 1-.1 1.3-.6 2.5-.6s1.5.6 2.6.6c1.1 0 1.7-1 2.4-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2-.8-2-3.3zM9.5 3.1C10 2.4 10.4 1.5 10.3.5c-.8 0-1.8.6-2.4 1.3-.5.6-1 1.5-.9 2.4.9.1 1.9-.5 2.5-1.1z" />
          </svg>
          {cta.brand}
        </motion.span>
        <motion.h2 variants={fadeInUp}>
          {cta.title[0]}
          <br />
          {cta.title[1]}
        </motion.h2>
        <motion.p variants={fadeInUp}>{cta.text}</motion.p>
        <motion.a
          className="btn btn--blue"
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeInUp}
          whileHover={isMobile ? undefined : { scale: 1.02 }}
          whileTap={isMobile ? undefined : { scale: 0.98 }}
          style={{ willChange: 'transform' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
            <path d="M21.95 4.4l-3.3 15.6c-.25 1.1-.9 1.37-1.83.85l-5.05-3.72-2.43 2.35c-.27.27-.5.5-1 .5l.36-5.13L18 5.6c.4-.36-.1-.56-.62-.2L6.7 12.3l-4.97-1.55c-1.08-.34-1.1-1.08.23-1.6l19.42-7.48c.9-.33 1.69.2 1.4 1.73z" />
          </svg>
          {cta.button}
        </motion.a>
        <motion.div
          className="cta__links"
          variants={fadeInUp}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            gap: isMobile ? '12px' : '32px',
            justifyContent: 'center',
            flexWrap: 'nowrap',
          }}
        >
          <a href="https://t.me/sowil69" style={isMobile ? { fontSize: 14, textAlign: 'center' } : undefined}>@sowil69</a>
          {!isMobile && <span style={{ color: '#404040' }}>·</span>}
          <a href="mailto:sergei.sowil.393@gmail.com" style={isMobile ? { fontSize: 14, textAlign: 'center' } : undefined}>sergei.sowil.393@gmail.com</a>
          {!isMobile && <span style={{ color: '#404040' }}>·</span>}
          <a href="tel:+79056000038" style={isMobile ? { fontSize: 14, textAlign: 'center' } : undefined}>+7 (905) 600-00-38</a>
        </motion.div>
      </motion.div>
    </section>
  )
}
