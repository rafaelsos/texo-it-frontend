import { IMovies } from '@/presentation/screens/Dashboard/DashboardScreen.types'

export interface IMoviesDraft extends Omit<IMovies, 'winner'> {
  winner: string
}
