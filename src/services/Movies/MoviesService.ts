import { HttpClientConfig } from '@/infra/http/httpClientConfig'
import {
  IMoviesRequest,
  IMoviesResponse,
} from '@/services/Movies/MoviesService.types'

export const MoviesService = async (request?: IMoviesRequest) => {
  const response = await HttpClientConfig.get<IMoviesResponse>(
    `?page=${request?.page}&size=${request?.size}&winner=${request?.winner}&year=${request?.year}`
  )

  return response.data
}
