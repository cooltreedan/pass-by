'use client'

import { useTranslations } from 'next-intl'
import { CheckCircle } from 'lucide-react'

export function Pricing() {
  const t = useTranslations('pricing')

  const rules = [
    t('rule1'),
    t('rule2'),
    t('rule3'),
    t('rule4'),
    t('rule5'),
    t('rule6'),
    t('rule7'),
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">{t('title')}</h2>
        <ul className="space-y-3">
          {rules.map((rule, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" />
              <span className="text-gray-700">{rule}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
