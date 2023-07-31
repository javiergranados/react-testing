import { SWRConfig as SWRConfigLib, Cache } from 'swr'
import { Fetcher, PublicConfiguration } from 'swr/_internal'

type Provider = { provider?: (cache: Readonly<Cache<unknown>>) => Cache<unknown> }

const customFetcher = async (url: string) => {
  const res = await fetch(url)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const json = (await res.json()) as { message: string }
    throw new Error(json.message)
  }

  return res.json()
}

type SWRConfigProps = {
  children?: React.ReactNode
  swrConfig?: Partial<PublicConfiguration<unknown, unknown, Fetcher<unknown>>> & Provider
}

const SWRConfig = ({ children, swrConfig }: SWRConfigProps) => {
  return <SWRConfigLib value={{ fetcher: customFetcher, ...swrConfig }}>{children}</SWRConfigLib>
}

export { SWRConfig }
