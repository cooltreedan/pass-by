'use client'

import { useTranslations } from 'next-intl'
import { ArrowDown } from 'lucide-react'

export function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="bg-gradient-to-br from-brand-50 to-orange-50 py-24 px-4 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
          {t('headline')}
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          {t('subtext')}
        </p>
        <a
          href="#form"
          className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-md"
        >
          {t('cta')}
          <ArrowDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}
