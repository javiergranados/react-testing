// import { Counter } from '@/components/Counter'
import { CounterAsync } from '@/components/CounterAsync'

export default function Home() {
  return (
    <main>
      <h1>React Testing</h1>
      <CounterAsync description="My Counter" defaultCount={0} />
    </main>
  )
}
