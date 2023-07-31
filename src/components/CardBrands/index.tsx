import { CustomApiError } from '@/common/types'
import useSWR from 'swr'

type CarBrandsProps = {
  country: 'Germany' | 'France' | 'Italy'
}
export const CarBrands: React.FC<CarBrandsProps> = ({ country }) => {
  const { isValidating, error, data } = useSWR<string[], CustomApiError>(`/api/cars/${country}`)

  return (
    <>
      <h5>Car Brands from {country}</h5>
      {isValidating && !error ? <div>Loading...</div> : null}
      {error ? <div>{error.message}</div> : null}
      {!data?.length && !isValidating && !error ? (
        <div>No Data to Show</div>
      ) : (
        <ul>{data?.map((item) => <li key={item}>{item}</li>)}</ul>
      )}
    </>
  )
}
