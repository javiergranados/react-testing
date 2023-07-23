import { Counter } from '@/components/Counter'

export default function Home() {
  return (
    <main>
      <h1>React Testing</h1>
      <Counter description="My Counter" defaultCount={0} />
    </main>
  )
}
