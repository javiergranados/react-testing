import React from 'react'
import { Button, CircularProgress, Grid, Step, StepLabel, Stepper } from '@mui/material'
import { Form as FormLib, Formik, FormikConfig, FormikValues } from 'formik'

interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>
}

export function FormikStepper<MyFormValues extends FormikValues>({ children, ...props }: FormikConfig<MyFormValues>) {
  const childrenArray = React.Children.toArray(children as React.ReactNode[]) as React.ReactElement<FormikStepProps>[]
  const [step, setStep] = React.useState(0)
  const currentChild = childrenArray[step]
  const [completed, setCompleted] = React.useState(false)

  function isLastStep() {
    return step === childrenArray.length - 1
  }

  return (
    <Formik<MyFormValues>
      {...props}
      validationSchema={currentChild.props.validationSchema as unknown}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers)
          setCompleted(true)
        } else {
          setStep((s) => s + 1)
          helpers.setTouched({})
        }
      }}
    >
      {({ isSubmitting }) => (
        <FormLib autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step key={child.props.label} completed={step > index || completed}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {currentChild}
          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </FormLib>
      )}
    </Formik>
  )
}
