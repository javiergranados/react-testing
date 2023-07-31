import { Photo } from '@/common/types'
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

export { defaultHandlers, errorHandler }
