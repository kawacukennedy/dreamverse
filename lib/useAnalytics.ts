import { useEffect } from 'react'

export const useAnalytics = () => {
  const trackEvent = (event: string, data?: any) => {
    if (process.env.NODE_ENV === 'production') {
      // Send to analytics service
      console.log('Analytics event:', event, data)
    }
  }

  const trackPageView = (page: string) => {
    trackEvent('page_view', { page })
  }

  return { trackEvent, trackPageView }
}

export const usePageAnalytics = (pageName: string) => {
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    trackPageView(pageName)
  }, [pageName, trackPageView])
}