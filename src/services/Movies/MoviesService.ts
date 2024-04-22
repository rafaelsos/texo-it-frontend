import { HttpClientConfig } from '@/infra/http/httpClientConfig'
import {
  IMoviesRequest,
  IMoviesResponse,
} from '@/services/Movies/MoviesService.types'

export const MoviesService = async (params?: IMoviesRequest) => {
  const response = await HttpClientConfig.get<IMoviesResponse>('', {
    params,
  })

  return response.data
}
