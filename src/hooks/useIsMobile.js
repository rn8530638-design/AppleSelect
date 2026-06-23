import { useEffect, useState } from 'react'

// Resize-aware media-query hook. Replaces the one-shot `window.innerWidth`
// reads scattered across the components, so layout/animation decisions react
// to orientation changes and viewport resizes (e.g. devtools, foldables).
// SSR-safe: defaults to false until mounted on the client.
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

// Phones / small viewports — drives the burger nav and stacked layouts.
export default function useIsMobile(breakpoint = 768) {
  return useMediaQuery(`(max-width: ${breakpoint}px)`)
}

// iPad / tablet range (769–1024px). Sits just above the mobile breakpoint so a
// viewport is never both mobile and tablet. Used to give the carousel a
// stacked, height-bounded layout that the desktop split-panel can't honour on
// the shorter landscape-tablet viewport.
export function useIsTablet() {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
}
