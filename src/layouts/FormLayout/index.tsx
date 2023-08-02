import { Fragment } from 'react'
import Head from 'next/head'
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'

type FormLayoutProps = Readonly<{
  children: React.ReactNode
}>

export const FormLayout: React.FC<FormLayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <Head>
        <title>Multi-Step Form</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Typography variant="h6">Multi-Step Form</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box marginTop={10}>{children}</Box>
      </Container>
    </Fragment>
  )
}
