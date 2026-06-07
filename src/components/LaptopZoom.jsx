import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/*
  Plays the pre-rendered laptop-zoom video, then reveals the site.
  Phase sequence: idle → playing → fadeout → black → site
  - Video does NOT autoplay; it starts on Space or scroll, at 2x speed.
  - The video fades out over its last 0.8s. 0.1s before the end a solid
    black layer takes over and holds for 0.4s; then the site fades in.
    Background is #000 throughout, so there are zero white frames.
*/
export default function LaptopZoom({ children }) {
  const isMobile = window.innerWidth <= 768
  const [phase, setPhase] = useState(isMobile ? 'site' : 'idle')
  const [videoOpacity, setVideoOpacity] = useState(1)
  const videoRef = useRef(null)
  // Mirror of `phase` for reading the latest value inside event/animation callbacks.
  const phaseRef = useRef('idle')
  phaseRef.current = phase

  // Lift the prerender flash guard (see index.html). Runs after React has
  // committed, so on desktop #root is revealed showing the intro — never the
  // baked mobile content. On mobile the guard is inactive, so this is a no-op.
  useEffect(() => {
    document.documentElement.classList.add('js-ready')
  }, [])

  // Keep the backdrop black for the whole intro.
  useEffect(() => {
    if (isMobile) return
    const prevBody = document.body.style.background
    const prevHtml = document.documentElement.style.background
    document.body.style.background = '#000'
    document.documentElement.style.background = '#000'
    return () => {
      document.body.style.background = prevBody
      document.documentElement.style.background = prevHtml
    }
  }, [])

  // Lock scrolling until the website is shown.
  useEffect(() => {
    document.body.style.overflow = phase === 'site' ? '' : 'hidden'
  }, [phase])

  // Start the video on Space or scroll. (wheel/touchmove included so a scroll
  // gesture registers even though there is no scrollable content yet.)
  useEffect(() => {
    const start = () => setPhase((p) => (p === 'idle' ? 'playing' : p))
    const onKey = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        start()
      }
    }
    const onScroll = () => start()

    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { once: true })
    window.addEventListener('wheel', onScroll, { once: true, passive: true })
    window.addEventListener('touchmove', onScroll, { once: true, passive: true })

    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onScroll)
      window.removeEventListener('touchmove', onScroll)
    }
  }, [])

  // When playing — play the video.
  useEffect(() => {
    if (phase === 'playing' && videoRef.current) {
      const p = videoRef.current.play()
      if (p && typeof p.catch === 'function') p.catch(() => setPhase('black'))
    }
  }, [phase])

  // Drive the fade-out, then hand off to the black layer near the end.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const timeLeft = video.duration - video.currentTime
      if (!isFinite(timeLeft)) return

      if (timeLeft <= 0.8) {
        const progress = timeLeft / 0.8
        setVideoOpacity(Math.max(0, progress)) // 1 -> 0 smoothly
        if (phaseRef.current === 'playing') setPhase('fadeout')
      }
      // Fixed-timestamp trigger: fade to black at 2.0s into the video,
      // not relative to the end.
      if (video.currentTime >= 2.0 && phaseRef.current === 'playing') {
        setPhase('black')
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    return () => video.removeEventListener('timeupdate', handleTimeUpdate)
  }, [phase])

  // Keep the video mounted through the 'black' phase so the black layer can
  // visibly fade over it; it unmounts only once the site is revealed.
  const showVideo = phase !== 'site'

  if (isMobile) {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {children}
      </div>
    )
  }

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      {/* WEBSITE — normal flow (scrollable). Mounts only after the black hold,
          then fades in over 0.5s. */}
      {phase === 'site' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      )}

      {/* VIDEO — fullscreen, plays as recorded (2x). Opacity is driven by
          timeupdate for a frame-synced fade; unmounts once the black layer
          takes over. */}
      {showVideo && (
        <video
          ref={videoRef}
          src="/laptop-animation.mp4"
          muted
          playsInline
          preload="auto"
          onLoadedData={() => {
            videoRef.current.playbackRate = 2.0
          }}
          onEnded={() => {
            setVideoOpacity(0)
            setPhase((p) => (p === 'playing' || p === 'fadeout' ? 'black' : p))
          }}
          onError={() => setPhase('black')}
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            background: '#000',
            zIndex: 100,
            opacity: videoOpacity,
            // Compensate for objectFit:cover showing the recording at ~0.83x:
            // scale 1.167x so the final frame renders the site at true 1:1,
            // matching the Hero text size/position for a seamless handoff.
            transform: 'scale(1.167)',
            transformOrigin: 'center center',
            transition: 'none',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* BLACK FADE — solid black layer that fades IN over the video at the 2s
          mark (zIndex above the video so the dissolve is visible). After it is
          fully opaque it holds 0.3s, then unmounts as the site is revealed. */}
      {phase === 'black' && (
        <motion.div
          style={{
            position: 'fixed',
            inset: 0,
            background: '#000000',
            zIndex: 110,
            pointerEvents: 'none',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          onAnimationComplete={() => {
            setTimeout(() => setPhase('site'), 300)
          }}
        />
      )}

      {/* HINT — pulsing, shown until the video is triggered. */}
      {phase === 'idle' && (
        <motion.p
          style={{
            position: 'fixed',
            bottom: '2rem',
            width: '100%',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '11px',
            letterSpacing: '0.25em',
            fontFamily: '-apple-system, sans-serif',
            zIndex: 200,
            margin: 0,
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          PRESS SPACE OR SCROLL
        </motion.p>
      )}
    </div>
  )
}
