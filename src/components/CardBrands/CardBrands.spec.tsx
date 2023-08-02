import { render, RenderOptions, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { CarBrands } from '.'
import { server } from '../../mocks/swrServer'
import React from 'react'
import { SWRConfig } from '../../common/swr/SWRConfig'
import { swrEmptyResponseHandler } from '../..//mocks/handlers'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

type AppProviderProps = {
  children: React.ReactNode
}

const AppProvider: React.FC<AppProviderProps> = ({ children }: AppProviderProps) => {
  return <SWRConfig swrConfig={{ dedupingInterval: 0, provider: () => new Map() }}>{children}</SWRConfig>
}

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AppProvider, ...options })

const waitingUntilLoadingIsRemoved = async () => {
  const loading = screen.getByText('Loading...')
  await waitForElementToBeRemoved(loading)
  expect(loading).not.toBeInTheDocument()
}

describe('CarBrands', () => {
  describe('when "France" is selected', () => {
    beforeEach(async () => {
      customRender(<CarBrands country="France" />)
      await waitingUntilLoadingIsRemoved()
    })

    it('renders "Car Brands from France"', () => {
      const element = screen.getByText('Car Brands from France')
      expect(element).toBeInTheDocument()
    })

    it('renders the expected brands', () => {
      expect(screen.getByText('Mocked France Brand 1')).toBeInTheDocument()
      expect(screen.getByText('Mocked France Brand 2')).toBeInTheDocument()
    })
  })

  describe('when "Germany" is selected', () => {
    beforeEach(async () => {
      customRender(<CarBrands country="Germany" />)
      await waitingUntilLoadingIsRemoved()
    })

    it('renders "Car Brands from Germany"', () => {
      const element = screen.getByText('Car Brands from Germany')
      expect(element).toBeInTheDocument()
    })

    it('renders the expected brands', () => {
      expect(screen.getByText('Mocked Germany Brand 1')).toBeInTheDocument()
      expect(screen.getByText('Mocked Germany Brand 2')).toBeInTheDocument()
    })
  })

  describe('when "Italy" is selected', () => {
    beforeEach(async () => {
      customRender(<CarBrands country="Italy" />)
      await waitingUntilLoadingIsRemoved()
    })

    it('renders "Car Brands from Italy"', () => {
      const element = screen.getByText('Car Brands from Italy')
      expect(element).toBeInTheDocument()
    })

    it('renders api error message', () => {
      expect(screen.getByText('Mocked error message')).toBeInTheDocument()
    })
  })

  describe('when no results returned', () => {
    beforeEach(async () => {
      server.use(swrEmptyResponseHandler)
      customRender(<CarBrands country="France" />)
      await waitingUntilLoadingIsRemoved()
    })

    it('show expected no data message', () => {
      expect(screen.getByText('No Data to Show')).toBeInTheDocument()
    })
  })
})
