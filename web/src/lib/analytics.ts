const GOOGLE_ANALYTICS_ID = 'G-MPG014CEK2'
const GOOGLE_ANALYTICS_SCRIPT_ID = 'google-analytics-script'

type GtagArguments = [command: string, ...parameters: unknown[]]

declare global {
  interface Window {
    dataLayer?: GtagArguments[]
    gtag?: (...args: GtagArguments) => void
  }
}

export function enableAnalytics() {
  if (document.getElementById(GOOGLE_ANALYTICS_SCRIPT_ID)) {
    return
  }

  window.dataLayer = window.dataLayer ?? []
  window.gtag = (...args: GtagArguments) => {
    window.dataLayer?.push(args)
  }

  window.gtag('js', new Date())
  window.gtag('config', GOOGLE_ANALYTICS_ID, { anonymize_ip: true })

  const script = document.createElement('script')
  script.id = GOOGLE_ANALYTICS_SCRIPT_ID
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`
  script.onerror = () => {
    console.error('Failed to load Google Analytics.')
  }
  document.head.append(script)
}
