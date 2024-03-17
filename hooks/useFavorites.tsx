import fetcher from '@/libs/fetcher'
import React from 'react'
import useSWR from 'swr'

const useFavorites = () => {
  const { data, isLoading, error, mutate } = useSWR('/api/favorites', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: false,
  })
  return {
    data,
    isLoading,
    error,
    mutate,
  }
}

export default useFavorites