import { QueryClient } from "@tanstack/react-query";
import adminAPI from "./adminAPI";

const ON_PRODUCTION = import.meta?.env?.PROD ?? false;

const defaultQueryFn = async ({ queryKey, signal }) => {
  const { data } = await adminAPI(`${queryKey[0]}`, { signal });
  return data;
};

const adminQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: true,
      refetchOnWindowFocus: ON_PRODUCTION,
      refetchOnReconnect: ON_PRODUCTION,
      queryFn: defaultQueryFn,
    },
  },
});

export default adminQueryClient;
