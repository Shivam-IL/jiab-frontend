'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

export function useQueryParams() {
  const searchParams = useSearchParams()

  // Use useMemo so it doesn't cause rerenders
  return useMemo(() => {
    return {
      refresh: searchParams.get('refresh'),
      lang: searchParams.get('lang'),
      // add more if needed
    }
  }, [searchParams])
}
