import { HttpClientConfig } from '@/infra/http/httpClientConfig'
import { IMoviesStudiosResponse } from '@/services/Studios/StudioService.types'

export const StudiosService = async () => {
  const response = await HttpClientConfig.get<IMoviesStudiosResponse>(
    '?projection=studios-with-win-count'
  )

  return response.data
}
