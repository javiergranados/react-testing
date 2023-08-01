import { TextField, TextFieldProps } from 'formik-mui'

export function TextFieldWithErrorMessage(props: TextFieldProps) {
  const hasError = !!props.form.errors[props.field.name]

  return (
    <TextField
      {...props}
      inputProps={{
        ...props.inputProps,
        'aria-errormessage': hasError ? `${props.field.name}-helper-text` : undefined,
      }}
    />
  )
}
