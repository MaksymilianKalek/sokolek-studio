import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds: string[], offset = 100) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      let currentId: string | null = null
      
      // Check from bottom to top so the lowest visible section wins
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          // If the top of the section is above the middle of the viewport (plus offset)
          if (rect.top <= window.innerHeight / 2 + offset) {
            currentId = id
            break
          }
        }
      }

      setActiveId(currentId)
    }

    // Run once on mount
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeId
}
