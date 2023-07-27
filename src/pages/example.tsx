import { Example2 } from '@/examples/Example2'

export default function Example() {
  return (
    <main>
      <h1>Example</h1>
      {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
      <Example2 onMoney={() => {}} />
    </main>
  )
}
