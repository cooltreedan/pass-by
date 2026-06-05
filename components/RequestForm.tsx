'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

type FormData = {
  direction: 'us_ca' | 'ca_us' | ''
  serviceType: 'buy' | 'carry' | ''
  itemName: string
  itemLink: string
  usPrice: string
  caPrice: string
  packageSize: 'small' | 'medium' | 'large' | ''
  contact: string
  notes: string
}

const initial: FormData = {
  direction: '',
  serviceType: '',
  itemName: '',
  itemLink: '',
  usPrice: '',
  caPrice: '',
  packageSize: '',
  contact: '',
  notes: '',
}

export function RequestForm() {
  const t = useTranslations('form')
  const [form, setForm] = useState<FormData>(initial)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const isLarge = form.packageSize === 'large'
  const usPriceRequired = form.serviceType === 'buy'
  const canSubmit =
    !isLarge &&
    form.direction !== '' &&
    form.serviceType !== '' &&
    form.itemName.trim() !== '' &&
    form.packageSize !== '' &&
    form.contact.trim() !== '' &&
    (!usPriceRequired || form.usPrice.trim() !== '')

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setStatus('submitting')
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setForm(initial)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section id="form" className="py-16 px-4 bg-brand-50">
        <div className="max-w-xl mx-auto text-center">
          <CheckCircle2 className="w-12 h-12 text-brand-500 mx-auto mb-4" />
          <p className="text-gray-700 text-lg">{t('success')}</p>
        </div>
      </section>
    )
  }

  const directionLabels = {
    us_ca: t('direction_us_ca'),
    ca_us: t('direction_ca_us'),
  } as const

  const serviceLabels = {
    buy: t('service_buy'),
    carry: t('service_carry'),
  } as const

  const sizeLabels = {
    small: t('size_small'),
    medium: t('size_medium'),
    large: t('size_large'),
  } as const

  return (
    <section id="form" className="py-16 px-4 bg-brand-50">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t('title')}</h2>
        <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-2xl p-6 shadow-sm border border-brand-100">

          {/* Direction */}
          <fieldset>
            <legend className="text-sm font-medium text-gray-700 mb-2">{t('direction_label')} *</legend>
            <div className="grid grid-cols-2 gap-2">
              {(['us_ca', 'ca_us'] as const).map(val => (
                <label key={val} className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border cursor-pointer text-sm transition-colors ${form.direction === val ? 'border-brand-500 bg-brand-50 text-brand-700 font-medium' : 'border-gray-200 hover:border-brand-300'}`}>
                  <input type="radio" name="direction" value={val} checked={form.direction === val} onChange={() => set('direction', val)} className="sr-only" />
                  {directionLabels[val]}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Service type */}
          <fieldset>
            <legend className="text-sm font-medium text-gray-700 mb-2">{t('service_label')} *</legend>
            <div className="grid grid-cols-2 gap-2">
              {(['buy', 'carry'] as const).map(val => (
                <label key={val} className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border cursor-pointer text-sm transition-colors text-center leading-snug ${form.serviceType === val ? 'border-brand-500 bg-brand-50 text-brand-700 font-medium' : 'border-gray-200 hover:border-brand-300'}`}>
                  <input type="radio" name="serviceType" value={val} checked={form.serviceType === val} onChange={() => set('serviceType', val)} className="sr-only" />
                  {serviceLabels[val]}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Item name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('item_name_label')} *</label>
            <input
              type="text"
              value={form.itemName}
              onChange={e => set('itemName', e.target.value)}
              placeholder={t('item_name_placeholder')}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>

          {/* Item link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('item_link_label')}</label>
            <input
              type="url"
              value={form.itemLink}
              onChange={e => set('itemLink', e.target.value)}
              placeholder={t('item_link_placeholder')}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>

          {/* Prices */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('us_price_label')} {usPriceRequired && '*'}
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.usPrice}
                onChange={e => set('usPrice', e.target.value)}
                placeholder={t('us_price_placeholder')}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('ca_price_label')}</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.caPrice}
                onChange={e => set('caPrice', e.target.value)}
                placeholder={t('ca_price_placeholder')}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>
          </div>

          {/* Package size */}
          <fieldset>
            <legend className="text-sm font-medium text-gray-700 mb-2">{t('size_label')} *</legend>
            <div className="space-y-2">
              {(['small', 'medium', 'large'] as const).map(val => (
                <label key={val} className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer text-sm transition-colors ${form.packageSize === val ? (val === 'large' ? 'border-red-400 bg-red-50' : 'border-brand-500 bg-brand-50 text-brand-700 font-medium') : 'border-gray-200 hover:border-brand-300'}`}>
                  <input type="radio" name="packageSize" value={val} checked={form.packageSize === val} onChange={() => set('packageSize', val)} className="accent-brand-500" />
                  {sizeLabels[val]}
                </label>
              ))}
            </div>
            {isLarge && (
              <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {t('size_large_error')}
              </div>
            )}
          </fieldset>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact_label')} *</label>
            <input
              type="text"
              value={form.contact}
              onChange={e => set('contact', e.target.value)}
              placeholder={t('contact_placeholder')}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('notes_label')}</label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              placeholder={t('notes_placeholder')}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
            />
          </div>

          {status === 'error' && (
            <p className="text-sm text-red-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> {t('error')}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit || status === 'submitting'}
            className="w-full bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {status === 'submitting' ? t('submitting') : t('submit')}
          </button>
        </form>
      </div>
    </section>
  )
}
