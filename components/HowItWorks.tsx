'use client'

import { useTranslations } from 'next-intl'
import { FileText, MessageSquare, Gift } from 'lucide-react'

export function HowItWorks() {
  const t = useTranslations('how')

  const steps = [
    { icon: FileText,      title: t('step1_title'), desc: t('step1_desc') },
    { icon: MessageSquare, title: t('step2_title'), desc: t('step2_desc') },
    { icon: Gift,          title: t('step3_title'), desc: t('step3_desc') },
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">{t('title')}</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-6 h-6 text-brand-600" />
              </div>
              <div className="text-xs font-bold text-brand-500 mb-1">0{i + 1}</div>
              <p className="font-semibold text-gray-900 mb-1">{title}</p>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
