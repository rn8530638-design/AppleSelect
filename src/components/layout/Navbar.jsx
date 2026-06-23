import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '../../data/content'
import useIsMobile from '../../hooks/useIsMobile'

// Fixed nav. Adds glassmorphism (.scrolled) once scrollY > 40 — faithful
// to the original onScroll handler. Logo + links animate in on mount.
// On mobile (≤720px) the inline links are replaced by a burger that opens a
// full-screen overlay menu.
export default function Navbar() {
  const isMobile = useIsMobile()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // The desktop nav can resize down to mobile (rotation / devtools) — make sure
  // an open menu doesn't linger once we're back on a wide viewport.
  useEffect(() => {
    if (!isMobile) setOpen(false)
  }, [isMobile])

  const goToProduct = (index) => {
    setOpen(false)
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('setProductIndex', { detail: index }))
    }, 700)
  }

  return (
    <>
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
            href="https://t.me/appleselect69"
            target="_blank"
            rel="noopener noreferrer"
            className="nav__cta"
            style={{ color: '#fff', fontWeight: 600, willChange: 'transform, opacity' }}
            initial={isMobile ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + navLinks.length * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Telegram →
          </motion.a>
        </div>

        {/* Burger — only shown ≤720px via CSS */}
        <button
          className={`nav__burger${open ? ' open' : ''}`}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="mobile-menu__links">
              {navLinks.map((link, i) => (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => goToProduct(i)}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            <motion.a
              className="mobile-menu__cta"
              href="https://t.me/appleselect69"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + navLinks.length * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
                <path d="M21.95 4.4l-3.3 15.6c-.25 1.1-.9 1.37-1.83.85l-5.05-3.72-2.43 2.35c-.27.27-.5.5-1 .5l.36-5.13L18 5.6c.4-.36-.1-.56-.62-.2L6.7 12.3l-4.97-1.55c-1.08-.34-1.1-1.08.23-1.6l19.42-7.48c.9-.33 1.69.2 1.4 1.73z" />
              </svg>
              Перейти в Telegram
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
