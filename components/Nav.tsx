'use client'

import { useTranslations } from 'next-intl'
import { useLang } from './Providers'

export function Nav() {
  const t = useTranslations('nav')
  const { toggle } = useLang()

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <span className="font-bold text-lg text-brand-600">
          {t('logo')}
          {process.env.NEXT_PUBLIC_IS_ALPHA === 'true' && (
            <span className="ml-2 text-xs font-normal bg-brand-100 text-brand-600 px-1.5 py-0.5 rounded">alpha</span>
          )}
        </span>
        <button
          onClick={toggle}
          className="text-sm font-medium px-3 py-1.5 rounded-full border border-brand-300 text-brand-600 hover:bg-brand-50 transition-colors"
        >
          {t('langToggle')}
        </button>
      </div>
    </nav>
  )
}
