'use client'

import { createContext, useContext, useState } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import zhMessages from '@/messages/zh.json'
import enMessages from '@/messages/en.json'

type Locale = 'zh' | 'en'
type LangCtx = { locale: Locale; toggle: () => void }

const LangContext = createContext<LangCtx>({ locale: 'zh', toggle: () => {} })

export function useLang() {
  return useContext(LangContext)
}

const messages: Record<Locale, typeof zhMessages> = { zh: zhMessages, en: enMessages }

export function Providers({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('zh')

  return (
    <LangContext.Provider value={{ locale, toggle: () => setLocale(l => l === 'zh' ? 'en' : 'zh') }}>
      <NextIntlClientProvider locale={locale} messages={messages[locale]} timeZone="America/Vancouver">
        {children}
      </NextIntlClientProvider>
    </LangContext.Provider>
  )
}
