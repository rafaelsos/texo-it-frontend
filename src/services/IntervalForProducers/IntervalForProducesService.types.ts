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
