import userEvent from '@testing-library/user-event'
import { render, screen, waitFor, within } from '@testing-library/react'
import { Form } from './'

// auxiliar functions
const user = userEvent.setup()

function getFirstName() {
  return screen.getByRole('textbox', { name: /first name/i })
}

function getSelectJobSituation() {
  return screen.getByRole('combobox', { name: /job situation/i })
}

async function selectJobSituation(jobSituation: string) {
  const dropdown = getSelectJobSituation()
  await user.selectOptions(dropdown, within(dropdown).getByRole('option', { name: jobSituation }))
}

function getCity() {
  return screen.getByRole('textbox', { name: /city/i })
}

function getMillionaireCheckbox() {
  return screen.getByRole('checkbox', { name: /I am a millionaire/i })
}

function findMoney() {
  return screen.findByRole('spinbutton', { name: /all the money I have/i })
}

function findDescription() {
  return screen.findByRole('textbox', { name: /description/i })
}

async function clickNextButton() {
  await user.click(screen.getByRole('button', { name: /next/i }))
}

async function clickSubmitButton() {
  await user.click(screen.getByRole('button', { name: /submit/i }))
}

describe('Form', () => {
  const onSubmit = jest.fn()

  beforeEach(() => {
    onSubmit.mockClear()
    render(<Form onSubmit={onSubmit} />)
  })

  it('onSubmit is called when all fields pass validation', async () => {
    // 1st step
    await user.click(getFirstName())
    await user.type(getFirstName(), 'name!', { skipClick: true })
    await selectJobSituation('Full-Time')
    await user.click(getCity())
    await user.type(getCity(), 'my city!', { skipClick: true })
    await user.click(getMillionaireCheckbox())
    await clickNextButton()

    // 2nd step
    const money = await findMoney()
    await user.click(money)
    await user.type(money, '1000000', { skipClick: true })
    await clickNextButton()

    // 3rd step
    const description = await findDescription()
    await user.click(description)
    await user.type(description, 'my description', { skipClick: true })
    await clickSubmitButton()

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        firstName: 'name!',
        job: 'FULL',
        city: 'my city!',
        millionaire: true,
        money: 1000000,
        description: 'my description',
      })
    })

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})
