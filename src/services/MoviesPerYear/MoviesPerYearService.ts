import { HttpClientConfig } from '@/infra/http/httpClientConfig'
import { IMovies } from '@/presentation/screens/Dashboard/DashboardScreen.types'

export interface IRequest {
  filter: number
}

export const MoviesPerYearService = async (params?: IRequest) => {
  const response = await HttpClientConfig.get<IMovies[]>(
    `?winner=true&year=${params?.filter}`
  )

  return response.data
}
