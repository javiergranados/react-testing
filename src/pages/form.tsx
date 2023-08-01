import { FormLayout } from '@/layouts/FormLayout'
import ThemeRegistry from '@/layouts/ThemeRegistry'
// import { Form as FormComponent } from '@/components/Form'

export default function Form() {
  return (
    <FormLayout>
      {/* <FormComponent
        onSubmit={(values) => {
          console.log('Form Submitted', values)
        }}
      /> */}
      <h1>Form Page</h1>
    </FormLayout>
  )
}

Form.getLayout = function getLayout(page: JSX.Element) {
  return <ThemeRegistry options={{ key: 'mui' }}>{page}</ThemeRegistry>
}
