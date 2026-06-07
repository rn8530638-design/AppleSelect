import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// A single carousel slide — split text + photo, faithful to the original .slide.
// Reveal animations (name clip-path, specs slide-in, price count-up, photo
// parallax) trigger when the slide is the active, in-view one.
const specsContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
}
const specRow = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function ProductCard({ product, index, total, isActive }) {
  const reduce = useReducedMotion()
  const nameWords = product.name.split(' ')
  const priceTarget = parseInt(product.price.replace(/\D/g, ''), 10) || 0

  // Price count-up (requestAnimationFrame, ease-out cubic).
  const [displayPrice, setDisplayPrice] = useState(0)
  useEffect(() => {
    if (!isActive) {
      setDisplayPrice(0)
      return
    }
    if (reduce) {
      setDisplayPrice(priceTarget)
      return
    }
    let raf
    const start = performance.now()
    const duration = 1000
    const update = (time) => {
      const progress = Math.min((time - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayPrice(Math.floor(eased * priceTarget))
      if (progress < 1) raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [isActive, priceTarget, reduce])

  // Photo parallax on mouse move (±15px).
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const handleMouseMove = (e) => {
    if (reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    setMousePos({ x: x * 15, y: y * 15 })
  }
  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 })

  return (
    <div className="slide" data-screen-label={`product-${index + 1}`}>
      <div className="slide__text">
        {/* Product counter (01 — 03) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: 12,
            color: '#606060',
            letterSpacing: '0.15em',
          }}
        >
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span style={{ width: 40, height: 1, background: '#404040' }} />
          <span>{String(total).padStart(2, '0')}</span>
        </div>

        {/* Product name — clip-path word reveal */}
        <h3
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginTop: 24,
            marginBottom: 32,
          }}
        >
          {nameWords.map((w, i) => (
            <motion.span
              key={`${product.name}-${i}`}
              initial={{ clipPath: reduce ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
              animate={
                isActive || reduce
                  ? { clipPath: 'inset(0 0% 0 0)' }
                  : { clipPath: 'inset(0 100% 0 0)' }
              }
              transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'inline-block', marginRight: '0.28em', willChange: 'clip-path' }}
            >
              {w}
            </motion.span>
          ))}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
            fontSize: 15,
            color: '#606060',
            lineHeight: 1.7,
            marginTop: 24,
            maxWidth: 460,
          }}
        >
          {product.desc}
        </p>

        {/* Specs list — slide in from left, staggered */}
        <motion.dl
          style={{ maxWidth: 480, margin: '24px 0' }}
          variants={specsContainer}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
        >
          {product.specs.map(([k, v]) => (
            <motion.div
              key={k}
              variants={specRow}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '14px 0',
                borderBottom: '1px solid #2a2a2a',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: 15,
                color: '#a0a0a0',
                willChange: 'transform, opacity',
              }}
            >
              <dt>{k}</dt>
              <dd>{v}</dd>
            </motion.div>
          ))}
        </motion.dl>

        <div className="slide__price">
          <span className="val">от {displayPrice.toLocaleString('ru-RU')} ₽</span>
          <span className="from">в наличии</span>
        </div>
      </div>
      <div
        className="slide__photo"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ border: 'none', outline: 'none', boxShadow: 'none', overflow: 'hidden' }}
      >
        {/* Real product photo (slightly overscanned so parallax has no edge gaps).
            WebP source with JPG fallback inside <picture> for older browsers. */}
        <picture>
          <source srcSet={product.image.replace(/\.jpe?g$/i, '.webp')} type="image/webp" />
          <img
            src={product.image}
            alt={`${product.name} — оригинал, ${product.price}`}
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            decoding="async"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              verticalAlign: 'bottom',
              border: 'none',
              outline: 'none',
              transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(1.06)`,
              transition: 'transform 0.3s ease-out',
              willChange: 'transform',
            }}
          />
        </picture>
        {/* Soft fade — left edge blends into the dark background */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(to right, #0a0a0a 0%, #0a0a0a 0%, rgba(10,10,10,0.99) 5%, rgba(10,10,10,0.9) 15%, rgba(10,10,10,0.5) 35%, transparent 65%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
        {/* Top + bottom fade into the dark background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, #0a0a0a 0%, transparent 15%, transparent 85%, #0a0a0a 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  )
}
