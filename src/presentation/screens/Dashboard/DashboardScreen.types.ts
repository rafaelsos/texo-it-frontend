export interface IMoviesProducer {
  producer: string
  interval: number
  previousWin: number
  followingWin: number
}

export interface IMoviesIntervalForProducers {
  min: IMoviesProducer[]
  max: IMoviesProducer[]
}

export interface IYearsWinners {
  year: number
  winnerCount: number
}

export interface IMoviesYearsWinners {
  years: IYearsWinners[]
}

export interface IStudios {
  name: string
  winCount: number
}

export interface IMoviesStudios {
  studios: IStudios[]
}

export interface IMoviesPerYear {
  id: number
  year: number
  title: string
  studios: string[]
  producers: string[]
  winner: boolean
}
