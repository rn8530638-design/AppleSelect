import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ReviewCard from '../ui/ReviewCard'
import { reviews } from '../../data/content'
import useIsMobile from '../../hooks/useIsMobile'

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function Reviews() {
  const isMobile = useIsMobile()
  const outerRef = useRef(null)
  const innerRef = useRef(null)
  const posRef = useRef(0)
  const [isPaused, setIsPaused] = useState(false)
  const animationRef = useRef(null)

  // Auto-scroll via rAF + transform on inner div
  useEffect(() => {
    const inner = innerRef.current
    if (!inner) return

    const scroll = () => {
      if (!isPaused) {
        posRef.current -= 0.4
        if (-posRef.current >= inner.scrollWidth / 2) {
          posRef.current = 0
        }
        inner.style.transform = `translateX(${posRef.current}px)`
      }
      animationRef.current = requestAnimationFrame(scroll)
    }

    animationRef.current = requestAnimationFrame(scroll)
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current) }
  }, [isPaused])

  // Mouse drag
  const isDragging = useRef(false)
  const startX = useRef(0)
  const dragStart = useRef(0)

  const handleMouseDown = (e) => {
    isDragging.current = true
    startX.current = e.clientX
    dragStart.current = posRef.current
    if (outerRef.current) outerRef.current.style.cursor = 'grabbing'
    setIsPaused(true)
  }

  const handleMouseMove = (e) => {
    if (!isDragging.current) return
    posRef.current = dragStart.current + (e.clientX - startX.current)
    if (innerRef.current) innerRef.current.style.transform = `translateX(${posRef.current}px)`
  }

  const handleMouseUp = () => {
    isDragging.current = false
    if (outerRef.current) outerRef.current.style.cursor = 'grab'
    setIsPaused(false)
  }

  // Trackpad horizontal scroll
  const wheelTimer = useRef(null)
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return
    e.preventDefault()
    setIsPaused(true)
    posRef.current -= e.deltaX
    if (innerRef.current) innerRef.current.style.transform = `translateX(${posRef.current}px)`
    clearTimeout(wheelTimer.current)
    wheelTimer.current = setTimeout(() => setIsPaused(false), 1000)
  }

  // Touch swipe
  const touchStartX = useRef(null)
  const touchDragStart = useRef(0)
  const touchTimer = useRef(null)

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchDragStart.current = posRef.current
    setIsPaused(true)
  }

  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return
    posRef.current = touchDragStart.current + (e.touches[0].clientX - touchStartX.current)
    if (innerRef.current) innerRef.current.style.transform = `translateX(${posRef.current}px)`
  }

  const handleTouchEnd = () => {
    touchStartX.current = null
    clearTimeout(touchTimer.current)
    touchTimer.current = setTimeout(() => setIsPaused(false), 1500)
  }

  return (
    <section className="reviews" id="reviews" data-screen-label="reviews">
      <motion.div
        className="reviews__head"
        initial={isMobile ? false : 'hidden'}
        animate={isMobile ? 'visible' : undefined}
        whileInView={isMobile ? undefined : 'visible'}
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
      >
        <h2 className="h2">Отзывы покупателей</h2>
      </motion.div>
      <div
        ref={outerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          overflow: 'hidden',
          padding: '16px 0',
          cursor: 'grab',
          userSelect: 'none',
          touchAction: 'pan-y',
        }}
      >
        <div
          ref={innerRef}
          style={{ display: 'flex', gap: '16px', width: 'max-content' }}
        >
          {[...reviews, ...reviews].map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))}
        </div>
      </div>
    </section>
  )
}
