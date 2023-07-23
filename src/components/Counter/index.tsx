import { useState } from 'react'

type CounterProps = Readonly<{
  description: string
  defaultCount: number
}>

export const Counter: React.FC<CounterProps> = ({ description, defaultCount }) => {
  const [count, setCount] = useState(defaultCount)
  const [incrementor, setIncrementor] = useState(1)

  return (
    <div>
      <h2>
        DESC: {description} - DC: {defaultCount}
      </h2>
      <label>
        Incrementor:
        <input
          value={incrementor}
          onChange={(evt) => {
            setIncrementor(parseInt(evt.target.value) || 1)
          }}
          type="number"
        />
      </label>
      <button aria-label="Subtract from Counter" onClick={() => setCount(count - incrementor)}>
        -
      </button>
      Current Count: {count}
      <button aria-label="Add to Counter" onClick={() => setCount(count + incrementor)}>
        +
      </button>
    </div>
  )
}
