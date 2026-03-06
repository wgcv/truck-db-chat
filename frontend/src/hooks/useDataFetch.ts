import { useCallback, useEffect, useState } from 'react'

const BASE_URL = '/api'

export type FetchStatus = 'idle' | 'loading' | 'success' | 'error'

export function useDataFetch<T>(path: string, autoFetch = true) {
  const [data, setData] = useState<T[]>([])
  const [status, setStatus] = useState<FetchStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const fetch_ = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const res = await fetch(`${BASE_URL}${path}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = (await res.json()) as { status: string; data: T[] }
      setData(json.data)
      setStatus('success')
    } catch (err) {
      setError((err as Error).message)
      setStatus('error')
    }
  }, [path])

  useEffect(() => {
    if (autoFetch) {
      fetch_()
    }
  }, [autoFetch, fetch_])

  return { data, status, error, refetch: fetch_ }
}
