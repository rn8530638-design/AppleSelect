import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useMediaQuery } from '../../hooks/useIsMobile'

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

  // The split panels stack vertically (photo on top, text below) on phones and
  // portrait tablets; landscape tablets + desktop keep the split row. The actual
  // layout (widths / heights / order) is CSS-driven via the .product-section,
  // .product-left and .product-right classes in index.css using relative units,
  // so the image scales continuously with the viewport. This flag only mirrors
  // those CSS breakpoints exactly so the JS-rendered fade overlay and the image
  // focal point match the CSS-chosen orientation.
  const stacked = useMediaQuery(
    '(max-width: 1024px) and (orientation: portrait), (max-width: 767px)',
  )

  return (
    <div
      className="slide product-section"
      data-screen-label={`product-${index + 1}`}
      style={{
        // display:flex stays inline to robustly win over the base .slide `display:grid`;
        // flex-direction / sizing / order are CSS-driven (see .product-* in index.css).
        display: 'flex',
        overflow: 'hidden',
        gap: 0,
        padding: 0,
        margin: 0,
        background: '#0a0a0a',
        position: 'relative',
      }}
    >
      <div
        className="slide__text product-left"
        style={{
          // width / padding / order are CSS-driven (.product-left); keep only visuals.
          background: '#0a0a0a',
          borderRight: 'none',
          outline: 'none',
          boxShadow: 'none',
        }}
      >
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
          className="product-title"
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            // font-size is CSS-driven (.product-title) so it scales per breakpoint.
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
        className="slide__photo product-right"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          // width / height / order / flex are CSS-driven (.product-right); the
          // image inside always fills this box via position:absolute + cover, so
          // the box's relative-unit height is what makes the photo responsive.
          position: 'relative',
          overflow: 'hidden',
          background: '#0a0a0a',
          border: 'none',
          borderLeft: 'none',
          outline: 'none',
          boxShadow: 'none',
        }}
      >
        {/* Product image — zIndex 1, below the gradient overlays.
            Slightly overscanned so parallax has no edge gaps; WebP source with
            JPG fallback inside <picture> for older browsers. */}
        <picture
          style={{
            position: 'absolute',
            inset: 0,
            display: 'block',
            overflow: 'hidden',
            zIndex: 1,
            // Mask the image's own edges to transparent so the panel's #0a0a0a
            // shows through. A transparent edge cannot leak a bright pixel under
            // sub-pixel rasterization during the swipe transform — this is what
            // kills the 1px seam at the panel/slide boundaries. The mask lives in
            // panel space (the <picture> is not transformed), so the inner image's
            // parallax does not move the faded edges.
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0, #000 7px, #000 calc(100% - 7px), transparent 100%)',
            maskImage:
              'linear-gradient(to right, transparent 0, #000 7px, #000 calc(100% - 7px), transparent 100%)',
          }}
        >
          <source srcSet={product.image.replace(/\.jpe?g$/i, '.webp')} type="image/webp" />
          <img
            src={product.image}
            alt={`${product.name} — оригинал, ${product.price}`}
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            decoding="async"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              // `cover` makes the photo fill the whole panel edge-to-edge (full
              // bleed, no empty bars). The slight scale-overscan keeps the edges
              // covered while the parallax translate nudges the image, and avoids
              // a 1px seam at the panel boundary during a carousel swipe.
              objectFit: 'cover',
              // Frame the vertical middle of the photo on every layout (not the
              // top) so the device sits centred in the visible crop.
              objectPosition: 'center center',
              display: 'block',
              border: 'none',
              outline: 'none',
              transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(1.06)`,
              transition: 'transform 0.3s ease-out',
            }}
          />
        </picture>

        {/* Desktop only — horizontal fades. The text sits to the LEFT of the photo,
            so the image dissolves leftward into the text panel and its right edge
            fades to dark for a seamless swipe. On mobile the text is BELOW the photo,
            so these are skipped in favour of the vertical fade below. */}
        {!stacked && (
          <>
            {/* Left fade — dissolves the image into the left text panel (zIndex 2) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background:
                  'linear-gradient(to right, #0a0a0a 0%, #0a0a0a 5%, rgba(10,10,10,0.98) 10%, rgba(10,10,10,0.92) 18%, rgba(10,10,10,0.6) 32%, rgba(10,10,10,0.2) 52%, transparent 75%)',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />
            {/* Right-edge fade — outgoing photo meets the next dark panel seamlessly */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background:
                  'linear-gradient(to right, transparent 0%, transparent 82%, rgba(10,10,10,0.55) 92%, #0a0a0a 100%)',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />
          </>
        )}

        {/* Top + bottom fade (zIndex 3). Desktop: trims the photo's top/bottom edges.
            Mobile (photo above the text): darkens under the fixed navbar and dissolves
            the bottom of the photo into the text panel below. */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: stacked
              ? 'linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, transparent 18%, transparent 60%, rgba(10,10,10,0.85) 88%, #0a0a0a 100%)'
              : 'linear-gradient(to bottom, #0a0a0a 0%, transparent 12%, transparent 88%, #0a0a0a 100%)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  )
}
