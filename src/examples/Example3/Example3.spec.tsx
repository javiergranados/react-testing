import { render, screen } from '@testing-library/react'
import React from 'react'
import { Example3 } from './'
import { SwipeableDrawer } from '@material-ui/core'

import userEvent from '@testing-library/user-event'

jest.mock('@material-ui/core', () => ({
  ...jest.requireActual<typeof import('@material-ui/core')>('@material-ui/core'),
  SwipeableDrawer: jest.fn(() => <div>Mocked Component</div>),
}))

const mockedSwipeableDrawer = jest.mocked(SwipeableDrawer)

describe('Example3', () => {
  it('renders with SwipeableDrawer component mocked"', async () => {
    const user = userEvent.setup()
    mockedSwipeableDrawer.mockClear()
    render(<Example3 />)

    await user.click(screen.getByRole('button', { name: 'open' })) // not necessary, but with this we check the button is rendered correctly
    expect(screen.getByText(/Mocked Component/)).toBeInTheDocument()
  })
})
