import { render, screen } from '@testing-library/react'
import { Example4 } from './'
import { Example3 } from '../Example3'

jest.mock('../Example3', () => ({
  Example3: jest.fn(() => <div>Mocked Drawer</div>),
}))

const mockedExample3 = jest.mocked(Example3)

describe('Example4', () => {
  it('renders Example3', () => {
    mockedExample3.mockClear()
    render(<Example4 />)

    expect(screen.queryByText('Example3')).not.toBeInTheDocument()
    expect(screen.getByText('Mocked Drawer')).toBeInTheDocument()
  })
})
