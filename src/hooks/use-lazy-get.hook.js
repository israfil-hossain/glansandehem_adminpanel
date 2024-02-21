import { useQuery } from "@tanstack/react-query";
import { API } from "../config/axiosConfig";

const useLazyGet = (apiEndpoint,id) => {
  // Define a unique query key based on the endpoint and ID
  const queryKey = [apiEndpoint, id];

  // Define your API fetching function
  const fetchApiData = async () => {
    try {
      const response = await API.get(apiEndpoint);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching data from API");
    }
  };

  // Use the useQuery hook from React Query
  const { data, isLoading, isError, error, refetch } = useQuery(queryKey, fetchApiData, {
    enabled: !!id, // Only enable the query if an ID is provided
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useLazyGet;
