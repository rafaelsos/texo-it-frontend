import { HttpClientConfig } from '@/infra/http/httpClientConfig'
import { IMoviesStudios } from '@/presentation/screens/Dashboard/DashboardScreen.types'

export const StudiosService = async () => {
  const response = await HttpClientConfig.get<IMoviesStudios>(
    '?projection=studios-with-win-count'
  )

  return response.data
}
