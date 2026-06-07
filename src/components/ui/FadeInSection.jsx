import { motion } from 'framer-motion'

// Reusable scroll-reveal wrapper. Respects prefers-reduced-motion via the
// app-level <MotionConfig reducedMotion="user"> (transforms are disabled there).
export default function FadeInSection({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  )
}
