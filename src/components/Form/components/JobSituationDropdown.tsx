import { FormControl, FormHelperText, InputLabel } from '@mui/material'
import { ErrorMessage, Field, useField } from 'formik'
import { Select } from 'formik-mui'

export function JobSituationDropdown() {
  const [field, props] = useField('job')

  return (
    <FormControl fullWidth error={!!props.error}>
      <InputLabel id="job" />
      <Field
        component={Select}
        native
        name="job"
        inputProps={{
          id: 'job',
          'aria-label': 'job situation',
          'aria-errormessage': props.error ? 'job-error' : null,
        }}
        value={field.value as string}
      >
        {field.value !== 'EMPTY' ? null : <option value="EMPTY">Select your job situation</option>}
        <option value="FULL">Full-Time</option>
        <option value="PART">Part-Time</option>
        <option value="UNEMPLOYED">Unemployed</option>
      </Field>
      <ErrorMessage name="job">
        {(message: string) => (
          <FormHelperText id="job-error" sx={{ display: 'none' }}>
            {message}
          </FormHelperText>
        )}
      </ErrorMessage>
    </FormControl>
  )
}
