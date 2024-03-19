import { useMutation, useQueryClient } from "@tanstack/react-query";
import adminAPI from "../api/adminAPI";

const useDelete = ({
  endpoint = "",
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
}) => {
  const queryClient = useQueryClient(); // Access QueryClient for advanced features

  const mutation = useMutation(
    (deleteId) => {
      // Ensure endpoint starts with a slash for consistency
      const fullEndpoint = endpoint.startsWith("/")
        ? endpoint
        : `/${endpoint}`;
      return adminAPI.delete(`${fullEndpoint}/${deleteId}`);
    },
    {
      pending: "Deleting entry...",
      onSuccess: () => {
        // Optionally refresh related queries after successful deletion
        queryClient.invalidateQueries(['posts']); // Replace with relevant query keys
        onSuccess();
      },
      onError,
      onSettled,
    }
  );

  return mutation;
};

export default useDelete;
