import { ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { motionTransition } from '../lib/motion'

type CookieConsentBannerProps = {
  onAccept: () => void
  onReject: () => void
}

export function CookieConsentBanner({ onAccept, onReject }: CookieConsentBannerProps) {
  const { t } = useTranslation()

  return (
    <motion.section
      aria-label={t('cookieConsent.label')}
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:inset-x-auto sm:right-6 sm:max-w-md sm:px-0 sm:pb-6"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={motionTransition.panel}
    >
      <div className="surface-dark flex flex-col gap-5 border border-ink bg-paper p-5 text-ink sm:p-6">
        <div className="max-w-2xl">
          <div className="meta-text mb-3 flex items-center gap-2 text-ink-muted">
            <ShieldCheck className="size-4" aria-hidden="true" />
            <span>{t('cookieConsent.label')}</span>
          </div>
          <h2 className="body-copy !font-satoshi !font-semibold !text-ink">
            {t('cookieConsent.heading')}
          </h2>
          <p className="body-copy mt-3 !leading-[1.25]">
            {t('cookieConsent.description')}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onReject}
            className="action-text focus-ring cursor-pointer border border-ink px-4 py-3 text-ink transition-colors hover:text-accent"
          >
            {t('cookieConsent.reject')}
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="surface-light action-text focus-ring cursor-pointer border border-ink px-4 py-3 transition-colors hover:bg-accent"
          >
            {t('cookieConsent.accept')}
          </button>
        </div>
      </div>
    </motion.section>
  )
}
