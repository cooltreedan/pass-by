'use client'

import { useTranslations } from 'next-intl'
import { ArrowRight, CreditCard, Package } from 'lucide-react'

export function Services() {
  const t = useTranslations('services')

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">{t('title')}</h2>

        {/* Direction cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {[
            { dir: t('us_ca_direction'), desc: t('us_ca_desc') },
            { dir: t('ca_us_direction'), desc: t('ca_us_desc') },
          ].map(({ dir, desc }) => (
            <div key={dir} className="border border-brand-200 rounded-xl p-5 bg-brand-50 flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">{dir}</p>
                <p className="text-sm text-gray-600 mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mode cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-xl p-5 flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">{t('buy_title')}</p>
              <p className="text-sm text-gray-600 mt-1">{t('buy_desc')}</p>
            </div>
          </div>
          <div className="border border-gray-200 rounded-xl p-5 flex items-start gap-3">
            <Package className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">{t('carry_title')}</p>
              <p className="text-sm text-gray-600 mt-1">{t('carry_desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
