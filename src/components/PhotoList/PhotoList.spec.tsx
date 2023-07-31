import { screen, render, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { server } from '../../mocks/server'
import { errorHandler } from '../../mocks/handlers'
import { PhotoList } from '.'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

const waitingUntilLoadingIsRemoved = async () => {
  const loading = screen.getByText('Loading...')
  await waitForElementToBeRemoved(loading)
  expect(loading).not.toBeInTheDocument()
}

describe('PhotoList', () => {
  const user = userEvent.setup()
  beforeEach(async () => {
    render(<PhotoList />)
    await waitingUntilLoadingIsRemoved()
  })

  describe('after application fully loads', () => {
    it('renders the photo list', () => {
      expect(screen.getByText('Unknown: Hello World')).toBeInTheDocument()
    })

    describe('when input is filled', () => {
      it('renders the new data', async () => {
        const input = screen.getByLabelText(/Your Name/)
        await userEvent.click(input)
        await user.type(input, 'Test', {
          skipClick: true,
        })
        await waitingUntilLoadingIsRemoved()

        expect(screen.getByText('Test: Hello World')).toBeInTheDocument()
      })
    })

    describe('when server returns an error', () => {
      it('renders the error', async () => {
        server.use(errorHandler)
        const button = screen.getByRole('button', { name: 'refresh' })
        await userEvent.click(button)

        expect(screen.getByText('Sorry Something happened!')).toBeInTheDocument()
      })
    })

    describe('when clicking in "Add to Favourites" changes the button text', () => {
      beforeEach(async () => {
        const button = screen.getByRole('button', { name: 'favourites' })
        await user.click(button)
      })

      it('renders "Remove from Favourites"', () => {
        expect(screen.queryByText('Add To Favourites', { selector: 'button' })).not.toBeInTheDocument()
        expect(screen.getByText('Remove from Favourites', { selector: 'button' })).toBeInTheDocument()
      })
    })
  })
})
