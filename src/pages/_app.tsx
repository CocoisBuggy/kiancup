import '@/styles/globals.css'
import type { AppProps } from 'next/app'

// i DON'T wuv comments
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
