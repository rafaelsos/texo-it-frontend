import { HttpClientConfig } from '@/infra/http/httpClientConfig'
import { IMoviesYearsWinnersResponse } from '@/services/YearsWinners/YearsWinnersService.types'

export const YearsWinnersService = async () => {
  const response = await HttpClientConfig.get<IMoviesYearsWinnersResponse>(
    '?projection=years-with-multiple-winners'
  )

  return response.data
}
