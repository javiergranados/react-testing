import { SWRConfig } from '@/common/swr/SWRConfig'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig>
      <Component {...pageProps} />
    </SWRConfig>
  )
}
