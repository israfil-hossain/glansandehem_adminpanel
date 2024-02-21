import { useMutation } from "@tanstack/react-query";
import adminAPI from "../api/adminAPI";

const useDelete = ({
  endpoint = "",
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
}) => {
  const mutation = useMutation(
    (deleteId) => adminAPI.delete(`${endpoint}/${deleteId}`),
    {
      pending: "Deleting entry...",
    },
    {
      onSuccess,
      onError,
      onSettled,
    }
  );

  return mutation;
};

export default useDelete;
