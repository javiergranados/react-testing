import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

export const ROWS = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]

export const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
]

type Example2Props = Readonly<{
  onMoney: (n: number) => void
}>

export const Example2: React.FC<Example2Props> = ({ onMoney }) => {
  return (
    <div>
      <Button aria-label="give me 33" onClick={() => onMoney(33)}>
        Give me 33 dollars
      </Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={ROWS} columns={COLUMNS} checkboxSelection />
      </div>
    </div>
  )
}
