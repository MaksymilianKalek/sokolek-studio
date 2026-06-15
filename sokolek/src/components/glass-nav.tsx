import { useState, useRef, useLayoutEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { useScrollSpy } from '../hooks/use-scroll-spy'

const LIQUID_SPRING = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 22,
  mass: 0.7,
}

interface BubbleRect {
  x: number
  width: number
  height: number
}

function LiquidBubble({ rect }: { rect: BubbleRect }) {
  return (
    <motion.div
      style={{ position: 'absolute', top: '50%', left: 0, zIndex: 0 }}
      initial={{
        opacity: 0,
        scale: 0.8,
        y: '-50%',
        x: rect.x,
        width: rect.width,
        height: rect.height,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: '-50%',
        x: rect.x,
        width: rect.width,
        height: rect.height,
      }}
      exit={{ opacity: 0, scale: 0.85, y: '-50%' }}
      transition={LIQUID_SPRING}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--color-ink)',
          borderRadius: 0,
        }}
      />
    </motion.div>
  )
}

interface NavItem {
  id: string
  href: string
  label: string
  isBrand?: boolean
}

export function GlassNav() {
  const { t, i18n } = useTranslation()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const navRef = useRef<HTMLElement | null>(null)
  const [bubble, setBubble] = useState<BubbleRect | null>(null)

  const activeSectionId = useScrollSpy(['disciplines', 'philosophy', 'inquiry'])

  const currentId = useMemo(() => {
    if (hoveredId) return hoveredId
    if (activeSectionId === 'disciplines') return 'work'
    if (activeSectionId === 'philosophy') return 'philosophy'
    if (activeSectionId === 'inquiry') return 'contact'
    return 'brand'
  }, [hoveredId, activeSectionId])

  useLayoutEffect(() => {
    if (!navRef.current) return
    const el = itemRefs.current.get(currentId)
    if (!el) {
      setBubble(null)
      return
    }
    const navRect = navRef.current.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    setBubble({
      x: elRect.left - navRect.left,
      width: elRect.width,
      height: elRect.height,
    })
  }, [currentId])

  const items: NavItem[] = [
    { id: 'brand', href: '#', label: 'Sokołek', isBrand: true },
    { id: 'work', href: '#disciplines', label: t('nav.work') },
    { id: 'philosophy', href: '#philosophy', label: t('nav.philosophy') },
    { id: 'contact', href: '#inquiry', label: t('nav.contact') },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href === '#' ? 'body' : href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
      <motion.nav
        ref={navRef}
        className="relative flex items-center gap-0.5 rounded-none p-1.5 text-xs tracking-normal text-ink"
        style={{
          background: 'var(--color-canvas)',
          border: '1px solid var(--color-ink)',
        }}
        onMouseLeave={() => setHoveredId(null)}
      >
        <AnimatePresence>
          {bubble && <LiquidBubble key="bubble" rect={bubble} />}
        </AnimatePresence>

        {items.map((item) => {
          const isActive = currentId === item.id
          return (
            <div
              key={item.id}
              ref={(el) => {
                if (el) itemRefs.current.set(item.id, el)
              }}
              onMouseEnter={() => setHoveredId(item.id)}
            >
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative z-10 block whitespace-nowrap px-5 py-2.5 transition-colors duration-300 ${
                  item.isBrand
                    ? 'font-satoshi text-sm font-bold tracking-[-0.02em] normal-case'
                    : ''
                } ${
                  isActive
                    ? 'text-canvas font-medium'
                    : 'text-ink opacity-60 hover:opacity-100'
                }`}
              >
                {item.label}
              </a>
            </div>
          )
        })}

        <div className="flex items-center ml-1 pr-1.5">
          <div
            ref={(el) => {
              if (el) itemRefs.current.set('lang-en', el)
            }}
            onMouseEnter={() => setHoveredId('lang-en')}
          >
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`relative z-10 px-3 py-2.5 cursor-pointer transition-colors duration-300 ${
                currentId === 'lang-en'
                  ? 'text-canvas font-semibold'
                  : i18n.language.startsWith('en')
                  ? 'text-ink font-semibold'
                  : 'text-ink-faint opacity-60 hover:opacity-100'
              }`}
            >
              EN
            </button>
          </div>
          <span className="text-ink-faint/25 select-none">/</span>
          <div
            ref={(el) => {
              if (el) itemRefs.current.set('lang-pl', el)
            }}
            onMouseEnter={() => setHoveredId('lang-pl')}
          >
            <button
              onClick={() => i18n.changeLanguage('pl')}
              className={`relative z-10 px-3 py-2.5 cursor-pointer transition-colors duration-300 ${
                currentId === 'lang-pl'
                  ? 'text-canvas font-semibold'
                  : i18n.language.startsWith('pl')
                  ? 'text-ink font-semibold'
                  : 'text-ink-faint opacity-60 hover:opacity-100'
              }`}
            >
              PL
            </button>
          </div>
        </div>
      </motion.nav>
    </header>
  )
}
