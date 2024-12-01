import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

export function useSupabaseQuery<T>(
  table: string,
  options: {
    select?: string
    eq?: Record<string, any>
    order?: { column: string; ascending?: boolean }
    limit?: number
  } = {}
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let query = supabase.from(table).select(options.select || '*')

        if (options.eq) {
          Object.entries(options.eq).forEach(([column, value]) => {
            query = query.eq(column, value)
          })
        }

        if (options.order) {
          query = query.order(options.order.column, {
            ascending: options.order.ascending ?? true,
          })
        }

        if (options.limit) {
          query = query.limit(options.limit)
        }

        const { data: result, error } = await query

        if (error) throw error
        setData(result as T[])
      } catch (error) {
        setError(error as Error)
        toast.error('Error fetching data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [table, JSON.stringify(options)])

  return { data, loading, error }
}

export function useSupabaseMutation<T>(table: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const insert = async (data: Partial<T>) => {
    setLoading(true)
    try {
      const { error } = await supabase.from(table).insert(data)
      if (error) throw error
      toast.success('Data inserted successfully')
    } catch (error) {
      setError(error as Error)
      toast.error('Error inserting data')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: string | number, data: Partial<T>) => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
      if (error) throw error
      toast.success('Data updated successfully')
    } catch (error) {
      setError(error as Error)
      toast.error('Error updating data')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id: string | number) => {
    setLoading(true)
    try {
      const { error } = await supabase.from(table).delete().eq('id', id)
      if (error) throw error
      toast.success('Data deleted successfully')
    } catch (error) {
      setError(error as Error)
      toast.error('Error deleting data')
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    insert,
    update,
    remove,
    loading,
    error,
  }
} 