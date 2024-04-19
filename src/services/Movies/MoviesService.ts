import { HttpClientConfig } from '@/infra/http/httpClientConfig'
import { IMovies } from '@/presentation/screens/Dashboard/DashboardScreen.types'

export interface IPagination {
  pageable: {
    sort: {
      sorted: boolean
      unsorted: boolean
    }
    pageSize: number
    pageNumber: number
    offset: number
    paged: boolean
    unpaged: boolean
  }
  totalElements: number
  last: boolean
  totalPages: number
  first: boolean
  sort: {
    sorted: boolean
    unsorted: boolean
  }
  number: number
  numberOfElements: number
  size: number
}

interface IMoviesResponse extends IPagination {
  content: IMovies[]
}

export interface IRequest {
  page: number
  size: number
  winner: boolean
  year: number
}

export const MoviesService = async (request?: IRequest) => {
  const response = await HttpClientConfig.get<IMoviesResponse>(
    `?page=${request?.page}&size=${request?.size}&winner=${request?.winner}&year=${request?.year}`
  )

  return response.data
}
