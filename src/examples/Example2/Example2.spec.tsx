import { fireEvent, render, screen } from '@testing-library/react'
import { COLUMNS, Example2, ROWS } from '.'
import { DataGrid } from '@mui/x-data-grid'

jest.mock('@mui/x-data-grid', () => ({
  DataGrid: jest.fn(() => <div>Table</div>),
}))

const mockedDataGrid = jest.mocked(DataGrid)

describe('Example2', () => {
  it('renders material-ui grid with columnDefs and rowData', () => {
    mockedDataGrid.mockClear()
    const onMoney = jest.fn()
    render(<Example2 onMoney={onMoney} />)

    fireEvent.click(screen.getByRole('button', { name: 'give me 33' }))
    expect(onMoney).toHaveBeenCalledTimes(1)
    expect(onMoney).toHaveBeenCalledWith(33)
  })

  it('renders table passing the expected props', () => {
    mockedDataGrid.mockClear()
    render(<Example2 onMoney={jest.fn()} />)

    expect(mockedDataGrid).toHaveBeenCalledTimes(1)
    expect(mockedDataGrid).toHaveBeenLastCalledWith(
      {
        rows: ROWS,
        columns: COLUMNS,
        checkboxSelection: true,
      },
      {}
    )
  })
})
