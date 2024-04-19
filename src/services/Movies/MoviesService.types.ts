export interface IMovies {
  id: number
  year: number
  title: string
  studios: string[]
  producers: string[]
  winner: boolean
}

export interface IMoviesPagination {
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

export interface IMoviesResponse extends IMoviesPagination {
  content: IMovies[]
}

export interface IMoviesRequest {
  page: number
  size: number
  winner: boolean
  year: number
}
