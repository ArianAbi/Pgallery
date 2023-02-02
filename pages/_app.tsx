import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { Header } from '@/components/Header'

export default function App({ Component, pageProps }: AppProps) {

  const dbUrl: any = process.env.dbUrl;
  const dbSecret: any = process.env.dbSecret;
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Header />
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}
