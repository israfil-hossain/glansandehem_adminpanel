import { useQuery } from '@tanstack/react-query'
import { API } from '../config/axiosConfig'


const useGET = (apiEndpoint, queryParams, condition) => {
  // Define a unique query key based on the endpoint and query parameters
  const queryKey = [apiEndpoint, queryParams]
  const params = queryParams

  // Define your API fetching function
  const fetchApiData = async () => {
    try {
      const response = await API.get(apiEndpoint, {
        params,
      });
      return response.data
    } catch (error) {
      throw new Error('Error fetching data from API')
    }
  }

  // Use the useQuery hook from React Query to handle the API call and caching
  const { data, isLoading, isError, error, isSuccess, refetch } = useQuery(
    queryKey,
    fetchApiData,
    {
      enabled: condition ?? true,
    }
  )

  return {
    data,
    isSuccess,
    isLoading,
    isError,
    error,
    refetch,
  }
}

export default useGET
