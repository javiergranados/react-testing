import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Counter } from '.'

describe('Counter', () => {
  describe('initialized with defaultCount=0 and description="My Counter"', () => {
    const user = userEvent.setup()
    beforeEach(() => {
      render(<Counter defaultCount={0} description="My Counter" />)
    })

    it('renders title as "My Counter"', () => {
      expect(screen.getByText(/my counter/i)).toBeInTheDocument()
    })

    it('renders "Current Count: 0"', () => {
      expect(screen.getByText('Current Count: 0')).toBeInTheDocument()
    })

    describe('when + is clicked', () => {
      beforeEach(async () => {
        const button = screen.getByRole('button', { name: 'Increment counter' })
        await user.click(button)
      })

      it('renders "Current Count: 1"', () => {
        expect(screen.getByText('Current Count: 1')).toBeInTheDocument()
      })
    })

    describe('when - is clicked', () => {
      beforeEach(async () => {
        const button = screen.getByRole('button', { name: 'Decrement counter' })
        await user.click(button)
      })

      it('renders "Current Count: -1"', () => {
        expect(screen.getByText('Current Count: -1')).toBeInTheDocument()
      })
    })
  })

  describe('initialized with defaultCount=10 and description="WWW"', () => {
    const user = userEvent.setup()
    beforeEach(() => {
      render(<Counter defaultCount={10} description="WWW" />)
    })

    it('renders "Current Count: 10"', () => {
      expect(screen.getByText('Current Count: 10')).toBeInTheDocument()
    })

    it('renders title as "WWW"', () => {
      expect(screen.getByText(/WWW/i)).toBeInTheDocument()
    })

    describe('when the incrementor changes to 5 and + is clicked', () => {
      beforeEach(async () => {
        const input = screen.getByLabelText(/Incrementor/)
        const button = screen.getByRole('button', { name: 'Increment counter' })

        await userEvent.tripleClick(input)
        await user.type(input, '5', {
          skipClick: true,
        })
        await user.click(button)
      })

      it('renders "Current Count: 15"', () => {
        expect(screen.getByText('Current Count: 15')).toBeInTheDocument()
      })

      describe('when the incrementor changes to empty string and + is clicked', () => {
        beforeEach(async () => {
          const input = screen.getByLabelText(/Incrementor/)
          const button = screen.getByRole('button', { name: 'Increment counter' })

          await user.clear(input)
          await user.click(button)
        })

        it('renders "Current Count: 16"', () => {
          expect(screen.getByText('Current Count: 16')).toBeInTheDocument()
        })
      })
    })

    describe('when the incrementor changes to 25 and - is clicked', () => {
      beforeEach(async () => {
        const input = screen.getByLabelText(/Incrementor/)
        const button = screen.getByRole('button', { name: 'Decrement counter' })

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
