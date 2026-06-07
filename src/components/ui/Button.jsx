import { motion } from 'framer-motion'

// Pill button — faithful to .btn / .btn--white / .btn--blue.
// Renders <a> when href is supplied, otherwise <button>.
// Micro-interaction: subtle scale on hover / tap (spring).
export default function Button({ children, variant = 'white', href, className = '', ...rest }) {
  const cls = `btn btn--${variant} ${className}`.trim()
  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 25 },
    style: { willChange: 'transform' },
  }
  if (href !== undefined) {
    return (
      <motion.a href={href} className={cls} {...motionProps} {...rest}>
        {children}
      </motion.a>
    )
  }
  return (
    <motion.button className={cls} {...motionProps} {...rest}>
      {children}
    </motion.button>
  )
}
