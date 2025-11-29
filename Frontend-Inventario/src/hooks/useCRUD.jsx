import { useState, useEffect, useCallback } from 'react'

export function useCRUD(apiConfig) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiConfig.getAll()
      setData(result)
    } catch (err) {
      setError(err?.message || `Error al cargar ${apiConfig.entityName}`)
    } finally {
      setLoading(false)
    }
  }, [apiConfig])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const create = useCallback(async (item) => {
    try {
      await apiConfig.create(item)
      await fetchData()
    } catch (err) {
      throw new Error(err?.message || `Error al crear ${apiConfig.entityName}`)
    }
  }, [apiConfig, fetchData])

  const update = useCallback(async (id, item) => {
    try {
      await apiConfig.update(id, item)
      await fetchData()
    } catch (err) {
      throw new Error(err?.message || `Error al actualizar ${apiConfig.entityName}`)
    }
  }, [apiConfig, fetchData])

  const remove = useCallback(async (id) => {
    try {
      await apiConfig.remove(id)
      await fetchData()
    } catch (err) {
      throw new Error(err?.message || `Error al eliminar ${apiConfig.entityName}`)
    }
  }, [apiConfig, fetchData])

  return {
    data,
    loading,
    error,
    onRefresh: fetchData,
    create,
    update,
    remove
  }
}