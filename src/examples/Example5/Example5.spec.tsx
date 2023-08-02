import { render, screen } from '@testing-library/react'
import { Example5 } from './'

jest.mock('@/common/deepFolder/deeperFolder/VeryComplex')

describe('Example5', () => {
  it('renders VeryComplex component', () => {
    render(<Example5 />)
    expect(screen.getByText('SIMPLE VERSION')).toBeInTheDocument()
  })
})
