import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import ProductCard from '../ui/ProductCard'
import { products } from '../../data/content'
import useIsMobile from '../../hooks/useIsMobile'

// Sliding-track carousel (faithful to the original translateX track):
// useState drives the index, Framer Motion animates the track x with the
// same easing. Dots, prev/next (disabled at ends) and touch-swipe preserved.
// The active + in-view slide drives its card's reveal animations.
export default function ProductShowcase() {
  const isMobile = useIsMobile()
  const [cur, setCur] = useState(0)
  const total = products.length
  const startX = useRef(0)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { margin: '-20%' })

  const go = (n) => setCur(Math.max(0, Math.min(total - 1, n)))

  // Nav links dispatch a 'setProductIndex' event to jump to a specific slide.
  useEffect(() => {
    const handler = (e) => setCur(Math.max(0, Math.min(total - 1, e.detail)))
    window.addEventListener('setProductIndex', handler)
    return () => window.removeEventListener('setProductIndex', handler)
  }, [total])

  const lastWheel = useRef(0)
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return
    const now = Date.now()
    if (now - lastWheel.current < 400) return
    lastWheel.current = now
    e.preventDefault()
    if (e.deltaX > 30) go(cur + 1)
    else if (e.deltaX < -30) go(cur - 1)
  }

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startX.current
    if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1))
  }

  return (
    <section
      className="showcase"
      id="products"
      data-screen-label="showcase"
      ref={sectionRef}
      onWheel={handleWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ touchAction: 'pan-y' }}
    >
      <div className="showcase__viewport">
        <motion.div
          className="showcase__track"
          animate={{ x: `-${cur * 100}%` }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.1, 1] }}
        >
          {products.map((p, i) => (
            <ProductCard
              key={p.name}
              product={p}
              index={i}
              total={total}
              isActive={inView && i === cur}
            />
          ))}
        </motion.div>
      </div>

      <div className="showcase__bar">
        <div className="dots" id="dots">
          {products.map((p, i) => (
            <button
              key={p.name}
              className={`dot${i === cur ? ' active' : ''}`}
              aria-label={`Слайд ${i + 1}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <span className="swipe-hint">прокрути →</span>
          <div className="ctrls">
            <motion.button
              className="arrow"
              style={{ '--ax': '-3px' }}
              aria-label="Назад"
              disabled={cur === 0}
              onClick={() => go(cur - 1)}
              whileHover={isMobile || cur === 0 ? undefined : { scale: 1.1, borderColor: '#ffffff' }}
              whileTap={isMobile || cur === 0 ? undefined : { scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <svg viewBox="0 0 24 24">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </motion.button>
            <motion.button
              className="arrow"
              style={{ '--ax': '3px' }}
              aria-label="Вперёд"
              disabled={cur === total - 1}
              onClick={() => go(cur + 1)}
              whileHover={isMobile || cur === total - 1 ? undefined : { scale: 1.1, borderColor: '#ffffff' }}
              whileTap={isMobile || cur === total - 1 ? undefined : { scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <svg viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
