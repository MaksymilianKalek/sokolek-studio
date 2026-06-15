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
        x: rect.x - 2,
        width: rect.width + 4,
        height: rect.height + 4,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: '-50%',
        x: rect.x - 2,
        width: rect.width + 4,
        height: rect.height + 4,
      }}
      exit={{ opacity: 0, scale: 0.85, y: '-50%' }}
      transition={LIQUID_SPRING}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: '-14px',
          borderRadius: '9999px',
          background:
            'radial-gradient(ellipse at 50% 35%, rgba(255,255,255,0.22), transparent 70%)',
          filter: 'blur(12px)',
        }}
        animate={{
          scale: [0.94, 1.18],
          opacity: [0.45, 0.9],
        }}
        transition={{ duration: 2.6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />

      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          background:
            'linear-gradient(145deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.2) 100%)',
          backdropFilter: 'blur(14px) saturate(145%)',
          WebkitBackdropFilter: 'blur(14px) saturate(145%)',
          boxShadow:
            'inset 0 1.5px 2px rgba(255,255,255,0.6), ' +
            'inset 0 -1px 1px rgba(255,255,255,0.12), ' +
            '0 4px 24px rgba(0,0,0,0.06)',
        }}
        animate={{
          borderRadius: [
            '22px 28px 18px 24px / 28px 22px 26px 20px',
            '26px 18px 28px 22px / 20px 28px 22px 26px',
          ],
          scaleX: [0.98, 1.02],
          scaleY: [1.02, 0.98],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      />

      <motion.div
        style={{
          position: 'absolute',
          top: '1px',
          left: '10px',
          right: '10px',
          height: '44%',
          borderRadius: '100px',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.0) 100%)',
        }}
        animate={{
          opacity: [0.55, 1],
          scaleX: [0.88, 1.05],
        }}
        transition={{ duration: 2.8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
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

  const dimmed = (id: string) =>
    currentId !== id ? 'opacity-60' : 'opacity-100'

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
        className="relative flex items-center gap-0.5 rounded-full p-1.5 text-xs tracking-normal text-ink"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 100%)',
          backdropFilter: 'blur(28px) saturate(160%)',
          WebkitBackdropFilter: 'blur(28px) saturate(160%)',
          boxShadow:
            'inset 0 1px 1px rgba(255,255,255,0.45), ' +
            'inset 0 -0.5px 1px rgba(255,255,255,0.1), ' +
            '0 8px 32px rgba(0,0,0,0.06), ' +
            '0 2px 8px rgba(0,0,0,0.03)',
        }}
        onMouseLeave={() => setHoveredId(null)}
      >
        <AnimatePresence>
          {bubble && <LiquidBubble key="bubble" rect={bubble} />}
        </AnimatePresence>

        {items.map((item) => (
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
              className={`relative z-10 block whitespace-nowrap px-5 py-2.5 transition-opacity duration-300 ${
                item.isBrand
                  ? 'font-satoshi text-sm font-bold tracking-[-0.02em] text-ink normal-case'
                  : ''
              } ${dimmed(item.id)}`}
            >
              {item.label}
            </a>
          </div>
        ))}

        <div className="flex items-center ml-1 pr-1.5">
          <div
            ref={(el) => {
              if (el) itemRefs.current.set('lang-en', el)
            }}
            onMouseEnter={() => setHoveredId('lang-en')}
          >
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`relative z-10 px-3 py-2.5 cursor-pointer transition-opacity duration-300 ${dimmed('lang-en')} ${
                i18n.language.startsWith('en')
                  ? 'text-ink font-semibold'
                  : 'text-ink-faint'
              }`}
            >
              EN
            </button>
          </div>
          <span
            className={`text-ink-faint/25 select-none transition-opacity duration-300 ${
              hoveredId ? 'opacity-35' : ''
            }`}
          >
            /
          </span>
          <div
            ref={(el) => {
              if (el) itemRefs.current.set('lang-pl', el)
            }}
            onMouseEnter={() => setHoveredId('lang-pl')}
          >
            <button
              onClick={() => i18n.changeLanguage('pl')}
              className={`relative z-10 px-3 py-2.5 cursor-pointer transition-opacity duration-300 ${dimmed('lang-pl')} ${
                i18n.language.startsWith('pl')
                  ? 'text-ink font-semibold'
                  : 'text-ink-faint'
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
