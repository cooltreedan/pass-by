'use client'

import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="py-8 px-4 bg-gray-900 text-center">
      <p className="text-gray-400 text-sm">{t('text')}</p>
      <p className="text-gray-600 text-xs mt-1">{t('note')}</p>
    </footer>
  )
}
