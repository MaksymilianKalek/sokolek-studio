import { useEffect } from 'react'
import Lenis from 'lenis'

export function useSmoothScroll() {
  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-container') as HTMLElement
    const lenis = new Lenis({
      wrapper: scrollContainer || window,
      content: scrollContainer ? (scrollContainer.firstElementChild as HTMLElement) : undefined,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])
}
