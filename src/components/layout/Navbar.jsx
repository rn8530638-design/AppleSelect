import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { navLinks } from '../../data/content'

// Fixed nav. Adds glassmorphism (.scrolled) once scrollY > 40 — faithful
// to the original onScroll handler. Logo + links animate in on mount.
export default function Navbar() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goToProduct = (index) => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('setProductIndex', { detail: index }))
    }, 700)
  }

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav" data-screen-label="nav">
      <motion.a
        className="nav__logo"
        href="#top"
        initial={isMobile ? false : { opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: 'transform, opacity' }}
      >
        <span className="mark">
          <svg viewBox="0 0 14 17">
            <path d="M11.4 9c0-2 1.6-3 1.7-3.1-.9-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7C3.3 4.3 2 5.1 1.3 6.4-.1 8.9.9 12.6 2.3 14.6c.7 1 1.4 2.1 2.4 2 1-.1 1.3-.6 2.5-.6s1.5.6 2.6.6c1.1 0 1.7-1 2.4-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2-.8-2-3.3zM9.5 3.1C10 2.4 10.4 1.5 10.3.5c-.8 0-1.8.6-2.4 1.3-.5.6-1 1.5-.9 2.4.9.1 1.9-.5 2.5-1.1z" />
          </svg>
        </span>
        Apple Select
      </motion.a>
      <div className="nav__links">
        {navLinks.map((link, i) => (
          <motion.a
            key={i}
            onClick={() => goToProduct(i)}
            initial={isMobile ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: 'transform, opacity', cursor: 'pointer' }}
          >
            {link.label}
          </motion.a>
        ))}
        <motion.a
          href="#cta"
          className="nav__cta"
          style={{ color: '#fff', fontWeight: 600, willChange: 'transform, opacity' }}
          initial={isMobile ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + navLinks.length * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          Telegram →
        </motion.a>
      </div>
    </nav>
  )
}
