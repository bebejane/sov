import { executeQuery as _executeQuery } from '@datocms/cda-client'
import { useState, useEffect } from 'react'

export const DATOCMS_API_TOKEN = '105634a3c32a70215441bd31ad5ead'

export async function executeQuery<T>(query: any, options?: any): Promise<T> {
  return _executeQuery(query, {
    ...options,
    token: DATOCMS_API_TOKEN,
    timeout: 5000,
  });
}

export function useQuery<T>(query: any, options?: any): [data: T, error: Error | null, loading: boolean, retry: () => void] {

  const [data, updateData] = useState<any | null>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const execute = () => {
    setError(null)
    setLoading(true)

    executeQuery(query, options)
      .then((res) => {
        updateData(res)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    execute()
  }, [query])

  return [
    data,
    error,
    loading,
    execute
  ]
}