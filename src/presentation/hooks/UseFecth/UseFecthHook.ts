import { useState } from 'react'

import { HttpClientConfig } from '@/infra/http/httpClientConfig'
import { IActionRequest } from '@/presentation/hooks/UseFecth/UseFetchHook.types'

export function useFetch<TResponse>(service: string) {
  const [state, setState] = useState<IActionRequest<TResponse, Error> | null>(
    null
  )

  const isInitial = state?.status?.type === 'initial'
  const isSuccess = state?.status?.type === 'success'
  const isWaiting = state?.status?.type === 'waiting'
  const isFailure = state?.status?.type === 'failure'

  const handleFetch = async () => {
    setState({ status: { type: 'waiting' } })

    try {
      const response = await HttpClientConfig.get<TResponse>(service)

      setState({
        status: { type: 'success' },
        data: response.data,
      })

      return response
    } catch (error) {
      setState({
        status: {
          type: 'failure',
        },
        error: error as Error,
      })

      throw error
    }
  }

  const handleResetState = () => {
    setState(null)
  }

  return {
    isWaiting,
    isFailure,
    isInitial,
    isSuccess,
    data: state?.data ?? null,
    state,
    setState,
    handleFetch,
    handleResetState,
  }
}
