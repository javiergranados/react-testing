import { fireEvent, render, screen } from '@testing-library/react'
import { Counter } from '.'

describe('Counter', () => {
  describe('initialized with defaultCount=0 and description="My Counter"', () => {
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
      beforeEach(() => {
        fireEvent.click(screen.getByRole('button', { name: 'Increment counter' }))
      })

      it('renders "Current Count: 1"', () => {
        expect(screen.getByText('Current Count: 1')).toBeInTheDocument()
      })
    })

    describe('when - is clicked', () => {
      beforeEach(() => {
        fireEvent.click(screen.getByRole('button', { name: 'Decrement counter' }))
      })

      it('renders "Current Count: -1"', () => {
        expect(screen.getByText('Current Count: -1')).toBeInTheDocument()
      })
    })
  })
})
