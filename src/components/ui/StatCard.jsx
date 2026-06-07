import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// Stat card — faithful to .stat. The unit is either the blue accent "+"
// or a small-weight word (года / год). The number counts up on first view.
export default function StatCard({ stat }) {
  const { num, unit, accent, label } = stat
  const target = parseInt(num, 10) || 0
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(target)
      return
    }
    let raf
    const start = performance.now()
    const duration = 1200
    const update = (time) => {
      const progress = Math.min((time - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(eased * target))
      if (progress < 1) raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, reduce])

  return (
    <motion.div
      ref={ref}
      className="stat"
      variants={cardVariants}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{ willChange: 'transform' }}
    >
      <div className="stat__num">
        {display}
        {accent ? (
          <span className="u">{unit}</span>
        ) : (
          <span style={{ fontSize: '.5em', fontWeight: 700 }}> {unit}</span>
        )}
      </div>
      <div className="stat__label">{label}</div>
    </motion.div>
  )
}
