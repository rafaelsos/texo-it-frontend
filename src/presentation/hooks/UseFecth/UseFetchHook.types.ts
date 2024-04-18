import React from 'react'

export enum EActionStatus {
  Initial = 'initial',
  Waiting = 'waiting',
  Success = 'success',
  Failure = 'failure',
}

export type TActionStatus = 'initial' | 'waiting' | 'success' | 'failure'

export interface IActionStatus<TMessage = string> {
  type: TActionStatus | EActionStatus
  message?: TMessage | null
}

export interface IActionRequest<TData, TMessage = string, TError = unknown> {
  status: IActionStatus<TMessage>
  data?: TData
  error?: TError
}

export interface IUseFetch<TResponse, TRequest, TErrorResponse> {
  data: TResponse | null
  state: IActionRequest<TResponse, TErrorResponse> | null
  isInitial?: boolean
  isSuccess?: boolean
  isWaiting?: boolean
  isFailure?: boolean
  setState: React.Dispatch<
    React.SetStateAction<IActionRequest<TResponse, TErrorResponse> | null>
  >
  handleResetState: () => void
  handleFetch: (request: TRequest) => Promise<TResponse>
}
