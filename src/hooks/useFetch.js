import { useCallback, useEffect, useState } from 'react'

// Hook umum buat ambil data: return { data, loading, error, refetch }
export default function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const load = useCallback(fetcher, deps)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await load()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [load])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { data, loading, error, refetch }
}