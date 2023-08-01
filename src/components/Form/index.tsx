import React from 'react'
import { Box, Card, CardContent } from '@mui/material'
import { Field } from 'formik'
import { CheckboxWithLabel, TextField } from 'formik-mui'
import { number, object, string } from 'yup'
import { JobSituationDropdown } from './components/JobSituationDropdown'
import { TextFieldWithErrorMessage } from './components/TextFieldWithErrorMessage'
import { FormikStepper, FormikStep } from './components/FormikStepper'

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time))

interface FormValues {
  firstName: string
  job: string
  millionaire: boolean
  money: number
  description: string
  city: string
}

interface FormProps {
  onSubmit: (formValue: FormValues) => void
}

export const Form: React.FC<FormProps> = ({ onSubmit }) => {
  return (
    <Card>
      <CardContent>
        <FormikStepper<FormValues>
          initialValues={{
            firstName: '',
            job: 'EMPTY',
            city: '',
            millionaire: false,
            money: 0,
            description: '',
          }}
          onSubmit={async (values) => {
            await sleep(500)
            onSubmit(values)
          }}
        >
          <FormikStep
            label="Personal Data"
            validationSchema={object({
              firstName: string()
                .required('Your First Name is Required')
                .max(5, `Your name can't be longer than 5 chars`),
              city: string().required().min(8).max(11),
              job: string()
                .required('You need to select your job situation')
                .not(['EMPTY'], 'You need to select your job situation'),
            })}
          >
            <Box paddingBottom={2}>
              <Field
                id="firstName"
                fullWidth
                name="firstName"
                component={TextFieldWithErrorMessage}
                label="First Name"
              />
            </Box>
            <Box paddingBottom={2}>
              <JobSituationDropdown />
            </Box>
            <Box paddingBottom={2}>
              <Field id="city" fullWidth name="city" component={TextFieldWithErrorMessage} label="City" />
            </Box>
            <Box paddingBottom={2}>
              <Field
                name="millionaire"
                id="millionaire"
                type="checkbox"
                component={CheckboxWithLabel}
                Label={{ label: 'I am a millionaire' }}
              />
            </Box>
          </FormikStep>
          <FormikStep
            label="Bank Accounts"
            validationSchema={object({
              money: number()
                .required()
                .when('millionaire', {
                  is: true,
                  then: (schema) =>
                    schema.min(1_000_000, 'Because you said you are a millionaire you need to have 1 million'),
                  otherwise: (schema) => schema.min(1),
                }),
            })}
          >
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="money"
                id="money"
                type="number"
                component={TextFieldWithErrorMessage}
                label="All the money I have"
              />
            </Box>
          </FormikStep>
          <FormikStep label="More Info">
            <Box paddingBottom={2}>
              <Field fullWidth id="description" name="description" component={TextField} label="Description" />
            </Box>
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  )
}
