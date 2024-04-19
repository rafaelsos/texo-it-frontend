import { HttpClientConfig } from '@/infra/http/httpClientConfig'
import { IMoviesYearsWinners } from '@/presentation/screens/Dashboard/DashboardScreen.types'

export const YearsWinnersService = async () => {
  const response = await HttpClientConfig.get<IMoviesYearsWinners>(
    '?projection=years-with-multiple-winners'
  )

  return response.data
}
