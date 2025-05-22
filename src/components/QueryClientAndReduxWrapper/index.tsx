'use client'

import { IQueryClientAndReduxWrapper } from '@/interfaces'
import { queryClient } from '@/lib/queryClient'
import { store } from '@/store'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { Provider } from 'react-redux'

const QueryClientAndReduxWrapper: React.FC<IQueryClientAndReduxWrapper> = ({
  children
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  )
}

export default QueryClientAndReduxWrapper
