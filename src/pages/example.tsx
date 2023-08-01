import { Example2 } from '@/examples/Example2'
// import { Example3 } from '@/examples/Example3'

export default function Example() {
  return (
    <main>
      <h1>Example</h1>
      {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
      <Example2 onMoney={() => {}} />
      {/* <Example3 /> */}
    </main>
  )
}
