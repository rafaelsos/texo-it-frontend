import { HttpClientConfig } from '@/infra/http/httpClientConfig'
import { IMovies } from '@/services/Movies/MoviesService.types'
import { IMoviesPerYearRequest } from '@/services/MoviesPerYear/MoviesPerYearService.types'

export const MoviesPerYearService = async (request?: IMoviesPerYearRequest) => {
  const response = await HttpClientConfig.get<IMovies[]>(
    `?winner=true&year=${request?.filter}`
  )

  return response.data
}
