import { CustomApiError, Photo } from '@/common/types'
import { rest } from 'msw'

const defaultHandlers = [
  rest.get('/api/photos', (req, res, ctx) => {
    const name = req.url.searchParams.get('name') || 'Unknown'
    return res(
      ctx.delay(100),
      ctx.json<Photo[]>([
        {
          id: 1,
          thumbnailUrl: '/photo1.png',
          title: name + ': Hello World',
          favourite: false,
        },
      ])
    )
  }),

  rest.post('/api/favourite', async (req, res, ctx) => {
    const photo: Photo = await req.json()
    return res(ctx.json<Photo>({ ...photo, favourite: !photo.favourite }))
  }),
]

const errorHandler = rest.get('/api/photos', (req, res, ctx) => {
  return res(ctx.status(500), ctx.json<{ message: string }>({ message: 'Sorry Something happened!' }))
})

const swrHandlers = [
  rest.get('/api/cars/france', (_req, res, ctx) => {
    return res(ctx.delay(100), ctx.json<string[]>(['Mocked France Brand 1', 'Mocked France Brand 2']))
  }),
  rest.get('/api/cars/germany', (_req, res, ctx) => {
    return res(ctx.delay(100), ctx.json<string[]>(['Mocked Germany Brand 1', 'Mocked Germany Brand 2']))
  }),
  rest.get('/api/cars/italy', (_req, res, ctx) => {
    return res(ctx.delay(100), ctx.status(500), ctx.json<CustomApiError>({ message: 'Mocked error message' }))
  }),
]

const swrEmptyResponseHandler = rest.get('/api/cars/france', (req, res, ctx) => {
  return res(ctx.delay(100), ctx.status(200), ctx.json<string[]>([]))
})

export { defaultHandlers, errorHandler, swrHandlers, swrEmptyResponseHandler }
