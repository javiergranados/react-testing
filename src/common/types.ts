export interface Photo {
  id: number
  title: string
  thumbnailUrl: string
  favourite: boolean
}

export interface CustomApiError {
  message: string
}
