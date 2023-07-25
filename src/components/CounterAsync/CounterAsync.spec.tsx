import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CounterAsync } from '.'

describe('CounterAsync', () => {
  describe('initialized with defaultCount=0', () => {
    const user = userEvent.setup()
    beforeEach(() => {
      render(<CounterAsync />)
    })

    it('renders "Current Count: 0"', () => {
      expect(screen.getByText('Current Count: 0')).toBeInTheDocument()
    })

    describe('when + is clicked', () => {
      beforeEach(async () => {
        const button = screen.getByRole('button', { name: 'increment' })
        await user.click(button)
      })

      it('renders "Current Count: 1"', async () => {
        const label = await screen.findByText('Current Count: 1')
        expect(label).toBeInTheDocument()
      })
    })

    describe('when - is clicked', () => {
      beforeEach(async () => {
        const button = screen.getByRole('button', { name: 'decrement' })
        await user.click(button)
      })

      it('renders "Current Count: -1"', () => {
        expect(screen.getByText('Current Count: -1')).toBeInTheDocument()
      })
    })
  })

  describe('initialized with defaultCount=10"', () => {
    const user = userEvent.setup()
    beforeEach(() => {
      render(<CounterAsync defaultCount={10} />)
    })

    it('renders "Current Count: 10"', () => {
      expect(screen.getByText('Current Count: 10')).toBeInTheDocument()
    })

    describe('when the incrementor changes to 5 and + is clicked', () => {
      beforeEach(async () => {
        const input = screen.getByLabelText(/Incrementor/)
        const button = screen.getByRole('button', { name: 'increment' })

        await userEvent.tripleClick(input)
        await user.type(input, '5', {
          skipClick: true,
        })
        await user.click(button)
        await screen.findByText('Current Count: 15')
      })

      it('renders "Current Count: 15"', () => {
        expect(screen.getByText('Current Count: 15')).toBeInTheDocument()
      })

      it('quote dissapears after 300ms', async () => {
        const quote = screen.getByText('Shown until current count >= 15')
        await waitForElementToBeRemoved(quote)
        expect(quote).not.toBeInTheDocument()
      })

      describe('when the incrementor changes to empty string and + is clicked', () => {
        beforeEach(async () => {
          const input = screen.getByLabelText(/Incrementor/)
          const button = screen.getByRole('button', { name: 'increment' })

          await user.clear(input)
          await user.click(button)
          await screen.findByText('Current Count: 16')
        })

        it('renders "Current Count: 16"', () => {
          expect(screen.getByText('Current Count: 16')).toBeInTheDocument()
        })
      })
    })

    describe('when the incrementor changes to 25 and - is clicked', () => {
      beforeEach(async () => {
        const input = screen.getByLabelText(/Incrementor/)
        const button = screen.getByRole('button', { name: 'decrement' })

        await userEvent.tripleClick(input)
        await user.type(input, '25', {
          skipClick: true,
        })
        await user.click(button)
      })

      it('renders "Current Count: -15"', () => {
        expect(screen.getByText('Current Count: -15')).toBeInTheDocument()
      })
    })
  })
})
