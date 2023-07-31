import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import css from './PhotoList.module.css'
import { Photo } from '@/common/types'
import Image from 'next/image'

interface Error {
  message: string
  statusCode: number
}

export function PhotoList() {
  const [refresh, setRefresh] = useState(0)
  const [name, setName] = useState('')

  return (
    <div>
      <button aria-label="refresh" onClick={() => setRefresh((cr) => ++cr)}>
        Refresh
      </button>
      <div>
        <label>
          Your Name:
          <input name="Your name" value={name} onChange={(evt) => setName(evt.target.value)} />
        </label>
        <List refresh={refresh} name={name} />
      </div>
    </div>
  )
}

function List({ refresh, name }: { refresh: number; name: string }) {
  const [loading, setLoading] = useState(0)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      setLoading((l) => l + 1)

      try {
        const r = await axios.get<Photo[]>(`/api/photos?name=${name}`)
        setPhotos(r.data)
        setError('')
      } catch (err: unknown) {
        const error = err as AxiosError<Error>
        setError(error.response?.data.message || 'ERROR')
      } finally {
        setLoading((l) => l - 1)
      }
    }

    void load()
  }, [refresh, name])

  return (
    <div>
      <div className={css.absolute}>
        {error ? <div className={css.error}>{error}</div> : null}
        {loading ? <div className={css.loading}>Loading...</div> : null}
      </div>

      {photos.map((photo) => (
        <PhotoDetail photo={photo} key={photo.id} />
      ))}
    </div>
  )
}

function PhotoDetail({ photo }: { photo: Photo }) {
  const [favourite, setFavourite] = useState(false)

  useEffect(() => {
    setFavourite(false)
  }, [photo])

  return (
    <div className={css.listItem}>
      <Image
        width={150}
        height={150}
        className={css.photo}
        src={photo.thumbnailUrl}
        alt={photo.title}
        aria-label={photo.title}
      />
      <div>
        <h2>{photo.title}</h2>
        <h3>PhotoId: {photo.id}</h3>

        <button
          aria-label="favourites"
          onClick={() => {
            void axios.post<Photo>('/api/favourite', { ...photo, favourite }).then((response) => {
              setFavourite(response.data.favourite)
            })
          }}
        >
          {favourite ? 'Remove from Favourites' : 'Add To Favourites'}
        </button>
      </div>
    </div>
  )
}
