import { HttpClientConfig } from '@/infra/http/httpClientConfig'
import { IMoviesIntervalForProducers } from '@/services/IntervalForProducers/IntervalForProducesService.types'

export const IntervalForProducersService = async () => {
  const response = await HttpClientConfig.get<IMoviesIntervalForProducers>(
    '?projection=max-min-win-interval-for-producers'
  )

  return response.data
}
