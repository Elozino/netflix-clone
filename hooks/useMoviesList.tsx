import fetcher from '@/libs/fetcher'
import React from 'react'
import useSWR from 'swr'

const useMoviesList = () => {
  const { data, error, isLoading } = useSWR('/api/movies', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  })
  return {
    data,
    error,
    isLoading,
  }
}

export default useMoviesList