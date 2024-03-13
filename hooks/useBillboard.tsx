import fetcher from '@/libs/fetcher';
import useSWR from 'swr';

const useBillboard = () => {
  const { data, isLoading, error } = useSWR('/api/random', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });
  return {
    data,
    isLoading,
    error,
  }
}

export default useBillboard