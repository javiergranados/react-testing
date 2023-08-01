import { FormControl, InputLabel } from '@mui/material'
import { Field, useField } from 'formik'
import { Select } from 'formik-mui'

export function Dropdown({ name }: { name: string }) {
  const [field, props] = useField(name)

  return (
    <FormControl fullWidth error={!!props.error}>
      <InputLabel htmlFor="job" />
      <Field
        component={Select}
        native
        name="job"
        inputProps={{
          id: 'job',
          'aria-label': 'job situation',
        }}
        value={field.value as string}
      >
        {field.value !== 'EMPTY' ? null : <option value="EMPTY">Select your job situation</option>}
        <option value="FULL">Full-Time</option>
        <option value="PART">Part-Time</option>
        <option value="UNEMPLOYED">Unemployed</option>
      </Field>
    </FormControl>
  )
}
