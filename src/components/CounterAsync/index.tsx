import { useState } from 'react'

type CounterAsyncProps = Readonly<{
  defaultCount?: number
}>

export const CounterAsync: React.FC<CounterAsyncProps> = ({ defaultCount = 0 }) => {
  const [count, setCount] = useState(defaultCount)
  const [incrementor, setIncrementor] = useState(1)

  const handleDecrement = () => {
    setCount(count - incrementor)
  }
  const handleIncrement = () => {
    setTimeout(() => {
      setCount(count + incrementor)
    }, 200)
  }

  return (
    <div>
      <h2>{`Default Count: ${defaultCount}`}</h2>
      <label>
        Incrementor:
        <input
          type="number"
          value={incrementor}
          onChange={(evt) => {
            setIncrementor(parseInt(evt.target.value) || 1)
          }}
        />
      </label>
      <button aria-label="decrement" onClick={handleDecrement}>
        -
      </button>
      Current Count: {count}
      <button aria-label="increment" onClick={handleIncrement}>
        +
      </button>
    </div>
  )
}
